cmake_minimum_required(VERSION 3.22 FATAL_ERROR)

project(MathAndPhysics VERSION 0.1.0)

set(CMAKE_CXX_STANDARD 20)

# These must be set before JUCE is configured
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE DEBUG CACHE STRING "Build type" FORCE)
endif()

if(APPLE)
    set(CMAKE_OSX_ARCHITECTURES "arm64;x86_64")
    set(CMAKE_OSX_DEPLOYMENT_TARGET "11.0" CACHE STRING "" FORCE)
endif()

set(ENV{WEBVIEW2_DEFAULT_BACKGROUND_COLOR} "FF000000")

add_subdirectory(Libs/JUCE)
add_subdirectory(App)