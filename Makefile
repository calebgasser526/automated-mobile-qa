MAKE_FILES:=make_files

include $(MAKE_FILES)/variables.mk
include $(ANDROID_TEMPLATE_DIR)/$(ANDROID_TEMPLATE)
include $(MAKE_FILES)/android.mk
include $(MAKE_FILES)/iOS.mk 
include $(MAKE_FILES)/proxy.mk 
include $(MAKE_FILES)/appium.mk 

.PHONY: clean
clean:
	rm -fr ./$(ANDROID_LOCAL_SDK)
	rm -fr ./*.0
	rm -fr ./mochawesome-report 
	rm -fr ~/.mitmproxy
