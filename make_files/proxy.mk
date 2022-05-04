CERT_DIR=$(HOME)/.mitmproxy
CERT=$(CERT_DIR)/mitmproxy-ca-cert.cer
ADB_COMMANDS = "root" \
							 "shell avbctl disable-verification" \
							 "reboot" \
							 "root" \
							 "remount" \
							 "push $(1) /system/etc/security/cacerts/" \
							 "shell chmod 664 /system/etc/security/cacerts/$(1)" \
							 "reboot"
							 # "shell svc wifi enable"
							 # "shell settings put global http_proxy $(PROXY)" \

$(CERT):
	source $(PYTHON_ENV)/bin/activate && npm run gen-cert

.PHONY: android-inject-cert
android-inject-cert: $(CERT) 
	cp $< "$$(openssl x509 -inform PEM -subject_hash_old -in $< | head -n 1).0"; \
	CERT_NAME=$(shell echo "$$(openssl x509 -inform PEM -subject_hash_old -in $< | head -n 1).0"); \
	NEEDS_CERT=$$(if adb emu; then adb shell 'if [ -f /system/etc/security/cacerts/$$CERT_NAME ]; then echo "false"; else echo "true"; fi'; else echo "false"; fi;); \
	echo "NEED CERT? $${NEED_CERT}"; \
	if $$NEEDS_CERT; then \
		for item in $(call ADB_COMMANDS,$(shell echo "$$(openssl x509 -inform PEM -subject_hash_old -in $< | head -n 1).0")); do \
			ADB_BOOTED=$$(adb wait-for-device shell getprop sys.boot_completed | tr -d '\r'); \
			while [[ $$ADB_BOOTED != 1 ]]; do \
				echo "Waiting for device to become available..." && sleep 2; \
				ADB_BOOTED=$$(adb wait-for-device shell getprop sys.boot_completed | tr -d '\r'); \
			done; \
			sleep 2; \
			$(ADB) wait-for-device $$item; \
		done; \
	fi
