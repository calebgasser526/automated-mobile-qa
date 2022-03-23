ROOT_DIR:=$(shell pwd)
MAKE_FILES:=make_files

include $(MAKE_FILES)/variables.mk

ifdef ANDROID_TEMPLATE
include $(ANDROID_TEMPLATE_DIR)/$(ANDROID_TEMPLATE)
include $(MAKE_FILES)/android.mk
endif

include $(MAKE_FILES)/iOS.mk 
include $(MAKE_FILES)/proxy.mk 

.PHONY: clean
clean:
	rm -fr $(ANDROID_LOCAL_SDK)
