# CERT = ./.http-mitm-proxy/certs/ca.pem
CERT = ~/.mitmproxy/mitmproxy-ca-cert.cer
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

ANDROID_CERT=$(shell openssl x509 -inform PEM -subject_hash_old -in $(CERT) | head -n 1).0
ANDROID_IS_RUNNING=$(shell if adb emu; then echo "true"; else echo "false"; fi)
NEEDS_CERT=$(shell if adb emu; then \
					 adb shell 'if [ -f /system/etc/security/cacerts/$(ANDROID_CERT) ]; then echo "false"; else echo "true"; fi'; \
					 else echo "false"; \
					 fi)

$(CERT):
	npm run start-env
	npm run gen-cert

$(ANDROID_CERT): $(CERT) install_cert
	cp $< $@ 

.PHONY: install_cert
install_cert: $(CERT)
	sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $<

.PHONY: android-inject-cert
android-inject-cert: $(ANDROID_CERT)
	if $(NEEDS_CERT); then \
		for item in $(call ADB_COMMANDS,$<); do \
			ADB_BOOTED=$$(adb wait-for-device shell getprop sys.boot_completed | tr -d '\r'); \
			while [[ $$ADB_BOOTED != 1 ]]; do \
				echo "Waiting for device to become available..." && sleep 2; \
				ADB_BOOTED=$$(adb wait-for-device shell getprop sys.boot_completed | tr -d '\r'); \
			done; \
			sleep 2; \
			$(ADB) wait-for-device $$item; \
		done; \
	fi
