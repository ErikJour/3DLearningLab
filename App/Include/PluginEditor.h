#pragma once

#include <juce_audio_processors/juce_audio_processors.h>
#include "PluginProcessor.h"
#include "DataStructures/LinkedOrbs.h"
#include "DataStructures/HashTable.h"


struct TrackingWebView : juce::WebBrowserComponent
{
    std::function<void()> onPageLoaded;

    TrackingWebView(juce::WebBrowserComponent::Options options)
        : juce::WebBrowserComponent(options) {}

    void pageFinishedLoading(const juce::String&) override
    {
        if (onPageLoaded) onPageLoaded();
    }
};

//==============================================================================
class AudioPluginAudioProcessorEditor final : public juce::AudioProcessorEditor, public juce::Timer
{
public:
    explicit AudioPluginAudioProcessorEditor (AudioPluginAudioProcessor&);
    ~AudioPluginAudioProcessorEditor() override;
    void initializeLinkedOrbs();
    void initializeHashTable();

    //==============================================================================
    void resized() override;
    void timerCallback() override;
    void sendToUi(std::vector<int> newValue);
    std::vector<int> sendLinkedOrbs() const;
    std::vector<int> mOrbsVec = {};
    bool sent = false;
    void nativeFunction(const juce::Array<juce::var>& args,
                              juce::WebBrowserComponent::NativeFunctionCompletion completion);

private:

    AudioPluginAudioProcessor& processorRef;
    using Resource = juce::WebBrowserComponent::Resource;
    static std::optional<Resource> getResource(const juce::String& url);
    TrackingWebView webViewGui;
    bool browserReady = false;

    std::unique_ptr<LinkedOrbs> myLinkedOrb;
    HashTable myHashTable;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (AudioPluginAudioProcessorEditor)
};
