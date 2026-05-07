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
    : AudioProcessorEditor (&p),
        processorRef (p),
        myLinkedOrb (std::make_unique<LinkedOrbs>(130)),

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
    .withUserScript(R"(console.log("C++ Backend here");)")
    .withNativeFunction(
       juce::Identifier {"nativeFunction"},
   [this](const juce::Array<juce::var>& args,
   juce::WebBrowserComponent::NativeFunctionCompletion completion)
   {nativeFunction(args, std::move(completion));
})}

{
    addAndMakeVisible(webViewGui);
    juce::String localServer = "http://localhost:5173/";
    webViewGui.onPageLoaded = [this]()
    {
        sent = false;
        browserReady = false;
        juce::Timer::callAfterDelay(250, [this]() {
            browserReady = true;
            startTimer(60); // ← add this
        });
    };
    webViewGui.goToURL(localServer);
    setSize (1000, 600);
    //===========================
    //Add orbs
    //===========================
    myLinkedOrb->append(25);
    myLinkedOrb->append(57);
    myLinkedOrb->append(99);

    mOrbsVec = sendLinkedOrbs();
}

AudioPluginAudioProcessorEditor::~AudioPluginAudioProcessorEditor() = default;

void AudioPluginAudioProcessorEditor::resized()
{
    webViewGui.setBounds(0, 0, 1000, 600);
}

void AudioPluginAudioProcessorEditor::timerCallback()
{

    sendToUi(mOrbsVec);

}

void AudioPluginAudioProcessorEditor::sendToUi(std::vector<int> newValue)
{
    if (!browserReady)
        return;
    if (sent == true) return;
       else
       {
           static const juce::Identifier EVENT_ID("HiErik");

           juce::Array<juce::var> varArray;
           for (int v : newValue)
               varArray.add(juce::var(v));

           webViewGui.emitEventIfBrowserIsVisible(EVENT_ID, juce::var(varArray));
           sent = true;
       }

}

auto AudioPluginAudioProcessorEditor::getResource(const juce::String& url) -> std::optional<Resource>
{

    static const auto resourceFileRoot = juce::File{R"(/Users/ejourgensen/Projects/TDN-01/UI)"};

    const auto resourceToRetrieve =url == "/" ? "index.html" : url.fromFirstOccurrenceOf("/", false, false);

    if (const auto resource = resourceFileRoot.getChildFile(resourceToRetrieve).createInputStream()) {

        const auto extension = resourceToRetrieve.fromLastOccurrenceOf(".", false, false);
        return Resource{streamToVector(*resource), getMimeForExtension(extension)};
    }

    return std::nullopt;
}

std::vector<int> AudioPluginAudioProcessorEditor::sendLinkedOrbs()
{
    std::vector<int> orbsVec = {};

    if (myLinkedOrb->length == 0) return orbsVec;

    const auto* currentNode = myLinkedOrb->head;

    for (int i = 0; i < myLinkedOrb->length; i++)
    {
        if (std::ranges::find(orbsVec, currentNode->value) == orbsVec.end()) {
            orbsVec.push_back(currentNode->value);
        }
        if (!currentNode->next) return orbsVec;
        currentNode = currentNode->next;

    }
        return  orbsVec;
}

void AudioPluginAudioProcessorEditor::nativeFunction(const juce::Array<juce::var>& args,
                              juce::WebBrowserComponent::NativeFunctionCompletion completion)
{
    juce::var params = args[0];
    juce::String command = params[0].toString();

    if (command == "deleteOrb") {

        {
            std::cout << "Called native function" << std::endl;
            myLinkedOrb->deleteLast();
            sent = false;


        }


    }
}
