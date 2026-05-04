juce_add_plugin(MathAndPhysics
        COMPANY_NAME "Animated Instruments"
        BUNDLE_ID "com.AnimatedInstruments.MathAndPhysics"
        IS_SYNTH FALSE
        NEEDS_MIDI_INPUT TRUE
        PLUGIN_MANUFACTURER_CODE ANIN
        PLUGIN_CODE MAPH
        FORMATS Standalone VST3 AU      # <-- add formats here
        FORMATS STANDALONE
        NEEDS_WEBVIEW2 TRUE
        COPY_PLUGIN_AFTER_BUILD TRUE
)

if(APPLE)
    set_target_properties(MathAndPhysics PROPERTIES
            XCODE_ATTRIBUTE_ENABLE_HARDENED_RUNTIME "YES"
    )
endif()

target_sources(MathAndPhysics
        PRIVATE
        Source/PluginEditor.cpp
        Source/PluginProcessor.cpp
)

target_include_directories(MathAndPhysics
        PRIVATE include Source
)

target_link_libraries(MathAndPhysics
        PRIVATE
        juce::juce_audio_utils
        juce::juce_gui_extra
        PUBLIC
        juce::juce_recommended_config_flags
        juce::juce_recommended_lto_flags
        juce::juce_recommended_warning_flags
)

target_compile_definitions(MathAndPhysics
        PUBLIC
        JUCE_WEB_BROWSER=1
        JUCE_USE_CURL=0
        JUCE_VST3_CAN_REPLACE_VST2=0
        JUCE_USE_WIN_WEBVIEW2_WITH_STATIC_LINKING=1
)

file(COPY "${CMAKE_CURRENT_SOURCE_DIR}/../Libs/JUCE/modules/juce_gui_extra/native/javascript"
        DESTINATION "${CMAKE_CURRENT_SOURCE_DIR}/UI/public/js/juce/"
)