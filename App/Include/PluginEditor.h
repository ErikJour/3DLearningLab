#pragma once

#include <juce_audio_processors/juce_audio_processors.h>
#include "PluginProcessor.h"
#include "DataStructures/LinkedOrbs.h"

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

    //==============================================================================
    void resized() override;
    void timerCallback() override;
    void sendToUi(std::vector<int> newValue);
    std::vector<int> sendLinkedOrbs();
    std::vector<int> mOrbsVec = {};
    bool sent = false;

private:
    // This reference is provided as a quick way for your editor to
    // access the processor object that created it.
    AudioPluginAudioProcessor& processorRef;
    using Resource = juce::WebBrowserComponent::Resource;
    static std::optional<Resource> getResource(const juce::String& url);
    std::unique_ptr<LinkedOrbs> myLinkedOrb;
    TrackingWebView webViewGui;
    bool browserReady = false;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (AudioPluginAudioProcessorEditor)
};
