CERT = ./.http-mitm-proxy/certs/ca.pem
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

$(CERT):
	npm run gen-cert

$(ANDROID_CERT): $(CERT)
	cp $< $@ 

.PHONY: android-inject-cert
android-inject-cert: $(ANDROID_CERT)
	for item in $(call ADB_COMMANDS,$<); do \
		ADB_BOOTED=$$(adb wait-for-device shell getprop sys.boot_completed | tr -d '\r'); \
		while [[ $$ADB_BOOTED != 1 ]]; do \
			echo "Waiting for device to become available..." && sleep 2; \
			ADB_BOOTED=$$(adb wait-for-device shell getprop sys.boot_completed | tr -d '\r'); \
 		done; \
		sleep 2; \
		adb wait-for-device $$item; \
	done;
