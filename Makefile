MAKE_FILES:=make_files

include $(MAKE_FILES)/variables.mk
include $(ANDROID_TEMPLATE_DIR)/$(ANDROID_TEMPLATE)
include $(MAKE_FILES)/android.mk
include $(MAKE_FILES)/iOS.mk 
include $(MAKE_FILES)/proxy.mk 

.PHONY: clean
clean:
	rm -fr $(ANDROID_LOCAL_SDK)
	rm -fr .http-mitm-proxy
