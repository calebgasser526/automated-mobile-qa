#############################
# 			 Android 	  		  	#
#############################
# Environment variables in order to setup an Android Emulator environment.
# Do not touch these unless you know what you're doing
# Docs on android environment variables https://developer.android.com/studio/command-line/variables

ANDROID_LOCAL_SDK := ./android_local_sdk
ANDROID_TEMPLATE_DIR := ./android_device_templates
# SDK Locations 
export ANDROID_HOME := $(ANDROID_LOCAL_SDK)
export ANDROID_SDK_HOME := $(ANDROID_HOME)
export ANDROID_SDK_ROOT := $(ANDROID_HOME)

# AVD specific
export ANDROID_EMULATOR_HOME := $(ANDROID_HOME)/.android
export ANDROID_AVD_HOME := $(ANDROID_EMULATOR_HOME)/avd

# PATH to find command line tools
export PATH := $(PATH):$(ANDROID_HOME)/cmdline-tools/latest/bin:$(ANDROID_HOME)/platform-tools:$(ANDROID_HOME)/tools:$(ANDROID_AVD_HOME)
