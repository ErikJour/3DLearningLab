#include "PluginProcessor.h"
#include "PluginEditor.h"

namespace {
    auto streamToVector (juce::InputStream& stream) {
        using namespace juce;

        std::vector<std::byte> result ((size_t) stream.getTotalLength());
        stream.setPosition (0);
        [[maybe_unused]] const auto bytesRead = stream.read (result.data(), result.size());
        jassert (bytesRead == (ssize_t) result.size());
        return result;
    }

    const char* getMimeForExtension (const juce::String& extension)
    {
        using namespace juce;
        static const std::unordered_map<String, const char*> mimeMap =
        {
            { { "htm"   },  "text/html"                },
            { { "html"  },  "text/html"                },
            { { "txt"   },  "text/plain"               },
            { { "jpg"   },  "image/jpeg"               },
            { { "jpeg"  },  "image/jpeg"               },
            { { "svg"   },  "image/svg+xml"            },
            { { "ico"   },  "image/vnd.microsoft.icon" },
            { { "json"  },  "application/json"         },
            { { "png"   },  "image/png"                },
            { { "css"   },  "text/css"                 },
            { { "map"   },  "application/json"         },
            { { "js"    },  "text/javascript"          },
            { { "woff2" },  "font/woff2"               }
        };

        if (const auto it = mimeMap.find (extension.toLowerCase()); it != mimeMap.end())
            return it->second;

        jassertfalse;
        return "";
    }
}
//==============================================================================
AudioPluginAudioProcessorEditor::AudioPluginAudioProcessorEditor (AudioPluginAudioProcessor& p)
    : AudioProcessorEditor (&p), processorRef (p),

webViewGui{
    juce::WebBrowserComponent::Options{}
    .withBackend(juce::WebBrowserComponent::Options::Backend::webview2)
     .withWinWebView2Options(juce::WebBrowserComponent::Options::WinWebView2{}
     .withUserDataFolder(juce::File::getSpecialLocation(juce::File::tempDirectory)))
    .withResourceProvider([this](const auto& url){
    return getResource(url);},
    juce::URL{ juce::WebBrowserComponent::getResourceProviderRoot() }
          .getOrigin())
    .withNativeIntegrationEnabled()
    .withUserScript(R"(console.log("C++ Backend here: This is run before any other loading happens.");)")
}

{

    addAndMakeVisible(webViewGui);
    juce::String localServer = "http://localhost:5173/";
    webViewGui.goToURL(localServer);
    setSize (1000, 600);
    juce::Timer::callAfterDelay(250, [this]()
    {
        browserReady = true;
        startTimer(60);
    });

}

AudioPluginAudioProcessorEditor::~AudioPluginAudioProcessorEditor() = default;

void AudioPluginAudioProcessorEditor::resized()
{
    webViewGui.setBounds(0, 0, 1000, 600);
}

void AudioPluginAudioProcessorEditor::timerCallback()
{
    sendtoUi(10.0f);

}

void AudioPluginAudioProcessorEditor::sendtoUi(float newValue)
{
    if (!browserReady)
        return;

    static const juce::Identifier EVENT_ID("HiErik");
    webViewGui.emitEventIfBrowserIsVisible(EVENT_ID, newValue);
}

auto AudioPluginAudioProcessorEditor::getResource(const juce::String& url) -> std::optional<Resource>
{

    static const auto resourceFileRoot = juce::File{R"(/Users/ejourgensen/Projects/TDN-01/UI)"};

    const auto resourceToRetrieve =url == "/" ? "index.html" : url.fromFirstOccurrenceOf("/", false, false);

    const auto resource = resourceFileRoot.getChildFile(resourceToRetrieve).createInputStream();

    if (resource) {

        const auto extension = resourceToRetrieve.fromLastOccurrenceOf(".", false, false);
        return Resource{streamToVector(*resource), getMimeForExtension(extension)};
    }

    return std::nullopt;
}
