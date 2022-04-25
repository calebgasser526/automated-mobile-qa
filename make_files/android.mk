ANDROID_CMD_TOOLS = $(ANDROID_LOCAL_SDK)/cmdline-tools/latest/bin
SDK_MANAGER = $(ANDROID_CMD_TOOLS)/sdkmanager
AVD_MANAGER = $(ANDROID_CMD_TOOLS)/avdmanager
ANDROID_EMULATOR = $(ANDROID_LOCAL_SDK)/emulator/emulator 
ANDROID_AVD = $(ANDROID_LOCAL_SDK)/.android/avd/$(NAME).ini
ANDROID_PLATFORM = $(ANDROID_LOCAL_SDK)/platform/$(PLATFORM)
ANDROID_IMAGE = $(ANDROID_LOCAL_SDK)/$(subst ;,/,$(IMAGE)) 
ANDROID_PLATFORM_TOOLS = $(ANDROID_LOCAL_SDK)$(ANDROID_LOCAL_SDK)/platform-tools
ANDROID_BUILD_TOOLS = $(ANDROID_LOCAL_SDK)/build-tools 

.PHONY: run-android 
run-android: | $(ANDROID_AVD) $(ANDROID_EMULATOR) $(ANDROID_IMAGE)
	@clear
	@echo "Starting emulator"
	@echo "Using avd:  $(NAME)"
	@echo "Proxying requests to:  $(PROXY)"
	$(ANDROID_EMULATOR) -avd $(NAME) -writable-system -netdelay none -netspeed full -debug-proxy -http-proxy http://$(PROXY)

$(ANDROID_LOCAL_SDK):
	mkdir $@ 

$(ANDROID_AVD_HOME):
	mkdir -p $@

$(ANDROID_CMD_TOOLS): | $(ANDROID_LOCAL_SDK) $(ANDROID_AVD_HOME)
		cd $(ANDROID_LOCAL_SDK) && \
		wget https://dl.google.com/android/repository/commandlinetools-mac-8092744_latest.zip && \
		unzip commandlinetools-mac-8092744_latest.zip && \
		rm commandlinetools-mac-8092744_latest.zip && \
		mkdir cmdline-tools/latest && \
		mv cmdline-tools/bin cmdline-tools/latest/bin && \
		mv cmdline-tools/lib cmdline-tools/latest/lib && \
		rm -fr cmdline-tools/bin && \
		rm -fr cmdline-tools/lib && \
		rm cmdline-tools/NOTICE.txt && \
		rm cmdline-tools/source.properties

$(SDK_MANAGER): | $(ANDROID_CMD_TOOLS)

$(AVD_MANAGER): | $(ANDROID_CMD_TOOLS)

$(ANDROID_PLATFORM): | $(SDK_MANAGER) 
	yes | $(SDK_MANAGER) "platforms;$(PLATFORM)" 

$(ANDROID_IMAGE): | $(SDK_MANAGER)
	yes | $(SDK_MANAGER) "$(IMAGE)"

$(ANDROID_EMULATOR): | $(SDK_MANAGER) 
	yes | $(SDK_MANAGER)  "build-tools;32.0.0" "emulator" "platform-tools"

$(ANDROID_AVD): |  $(ANDROID_EMULATOR) $(AVD_MANAGER) $(ANDROID_IMAGE) $(ANDROID_PLATFORM)
	$(AVD_MANAGER) create avd -d "$(DEVICE)"  -n "$(NAME)" -k "$(IMAGE)" --force
