#!/bin/bash
local_adb=$1
while ! $local_adb emu; do
  echo "Waiting for android emulator to start." && sleep 5
done

ORIGINAL_CERT=$HOME/.mitmproxy/mitmproxy-ca-cert.cer
CERT_NAME="$(openssl x509 -inform PEM -subject_hash_old -in $ORIGINAL_CERT | head -n 1).0"
NEEDS_CERT=$(if $local_adb emu; then $local_adb shell 'if [ -f /system/etc/security/cacerts/$CERT_NAME ]; then echo "false"; else echo "true"; fi'; else echo "false"; fi;)

function wait_for_device(){
  ADB_BOOTED=$($local_adb wait-for-device shell getprop sys.boot_completed | tr -d '\r')
  while [[ $ADB_BOOTED != 1 ]]; do
      echo "Waiting for android device to become available..." && sleep 5
      ADB_BOOTED=$($local_adb wait-for-device shell getprop sys.boot_completed | tr -d '\r')
  done
}

if ! test -f $ORIGINAL_CERT; then
  echo "[Error] No cert found! Have you generated a certificate?"
  exit 1
fi

if $NEEDS_CERT; then
  cp $ORIGINAL_CERT ./$CERT_NAME
  wait_for_device
  echo "[==] Activating root."
  $local_adb root
  wait_for_device
  echo "[==] Disabling verification."
  $local_adb shell avbctl disable-verification
  wait_for_device
  echo "[==] Rebooting device."
  $local_adb reboot
  wait_for_device
  echo "[==] Activating root again."
  $local_adb root
  wait_for_device
  echo "[==] Remount device filesystem."
  $local_adb remount
  wait_for_device
  echo "[==] Pushing certificate."
  $local_adb push $CERT_NAME /system/etc/security/cacerts
  wait_for_device
  echo "[==] Changing cerificate permissions."
  $local_adb shell chmod 664 /system/etc/security/cacerts/$CERT_NAME
  wait_for_device
  echo "[==] Rebooting device one last time."
  $local_adb reboot
  wait_for_device
  echo "[==] Done."
  rm ./$CERT_NAME
fi
