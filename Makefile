MAKE_FILES:=make_files
MAKE_FILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
BASE_DIR := $(dir $(MAKE_FILE_PATH))
NODE_MOD := $(BASE_DIR)node_modules
PYTHON_ENV := $(BASE_DIR).venv

ANDROID_LOCAL_SDK := $(BASE_DIR)android_local_sdk
ANDROID_TEMPLATE_DIR := $(BASE_DIR)android_device_templates
ANDROID_TEMPLATE := $(ANDROID_TEMPLATE_DIR)/build-target.mk
include $(ANDROID_TEMPLATE)

# SDK Locations 
export ANDROID_HOME := $(ANDROID_LOCAL_SDK)
export ANDROID_SDK_HOME := $(ANDROID_HOME)
export ANDROID_SDK_ROOT := $(ANDROID_HOME)

# AVD specific
export ANDROID_EMULATOR_HOME := $(ANDROID_HOME)/.android
export ANDROID_AVD_HOME := $(ANDROID_EMULATOR_HOME)/avd

# PATH to find command line tools
export PATH := $(PATH):$(ANDROID_HOME)/cmdline-tools/latest/bin:$(ANDROID_HOME)/platform-tools:$(ANDROID_HOME)/tools:$(ANDROID_AVD_HOME)

include $(MAKE_FILES)/proxy.mk 
include $(MAKE_FILES)/android.mk

.PHONY: start
start: start-emulator appium

.PHONY: appium
appium:
	appium &

.PHONY: clean
clean:
	rm -fr $(ANDROID_LOCAL_SDK)
	rm -fr ./*.0
	rm -fr ./mochawesome-report 
	rm -fr $(HOME)/.mitmproxy
	rm -fr ./logs
	rm -fr $(PYTHON_ENV) 
	rm -fr $(NODE_MOD) 
