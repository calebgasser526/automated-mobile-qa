#!/bin/bash
processes=()
CERT_FILE=~/.mitmproxy/
TARGET="anroid"
ANDROID_TEMPLATE="android-30.tmpl"
PROXY_IP="127.0.0.1"
PROXY_PORT="8080"
ORIG_PROXY_IP=$(networksetup -getwebproxy 'Wi-fi' | awk '/Server:/{print $NF}')
ORIG_PROXY_PORT=$(networksetup -getwebproxy 'Wi-fi' | awk '/Port:/{print $NF}')
ORIG_SECURE_PROXY_IP=$(networksetup -getsecurewebproxy 'Wi-fi' | awk '/Server:/{print $NF}')
ORIG_SECURE_PROXY_PORT=$(networksetup -getsecurewebproxy 'Wi-fi' | awk '/Port:/{print $NF}')
LOGS=./logs/$(date +"%Y-%m-%d")/$(date +"%T")

function init(){
  clear
  echo "
▀████▄     ▄███▀         ▄██         ██  ▀███                   ██                  ██                                      ██                ▀███     ███▀▀██▀▀███                ██    ██                     
  ████    ████            ██               ██                  ▄██▄                 ██                                      ██                  ██     █▀   ██   ▀█                ██                           
  █ ██   ▄█ ██   ▄██▀██▄  ██▄████▄ ▀███    ██   ▄▄█▀██        ▄█▀██▄   ▀███  ▀███ ██████  ▄██▀██▄▀████████▄█████▄  ▄█▀██▄ ██████  ▄▄█▀██   ▄█▀▀███          ██      ▄▄█▀██ ▄██▀████████▀███ ▀████████▄  ▄█▀█████
  █  ██  █▀ ██  ██▀   ▀██ ██    ▀██  ██    ██  ▄█▀   ██      ▄█  ▀██     ██    ██   ██   ██▀   ▀██ ██    ██    ██ ██   ██   ██   ▄█▀   ██▄██    ██          ██     ▄█▀   ████   ▀▀ ██    ██   ██    ██ ▄██  ██  
  █  ██▄█▀  ██  ██     ██ ██     ██  ██    ██  ██▀▀▀▀▀▀      ████████    ██    ██   ██   ██     ██ ██    ██    ██  ▄█████   ██   ██▀▀▀▀▀▀███    ██          ██     ██▀▀▀▀▀▀▀█████▄ ██    ██   ██    ██ ▀█████▀  
  █  ▀██▀   ██  ██▄   ▄██ ██▄   ▄██  ██    ██  ██▄    ▄     █▀      ██   ██    ██   ██   ██▄   ▄██ ██    ██    ██ ██   ██   ██   ██▄    ▄▀██    ██          ██     ██▄    ▄█▄   ██ ██    ██   ██    ██ ██       
▄███▄ ▀▀  ▄████▄ ▀█████▀  █▀█████▀ ▄████▄▄████▄ ▀█████▀   ▄███▄   ▄████▄ ▀████▀███▄ ▀████ ▀█████▀▄████  ████  ████▄████▀██▄ ▀████ ▀█████▀ ▀████▀███▄      ▄████▄    ▀█████▀██████▀ ▀████████▄████  ████▄███████ 
                                                                                                                                                                                                      █▀     ██
                                                                                                                                                                                                      ██████▀ 
"
  echo "
======================================================================================
| If this  is your first time running the application then start up may take a while.|
======================================================================================
"
  echo "Creating log directory $LOGS if not present"
  mkdir -p $LOGS

  source ./.venv/bin/activate
  echo "[==] Installing python depedancies"
  pip install -r requirments.txt &> $LOGS/pip_install.log 
  
  echo "[==] Installing node depedancies"
  npm install &> $LOGS/npm_install.log
}

function start_server(){
  source ./.venv/bin/activate
  
  echo "[==] Starting android emulator"
  make run-android ANDROID_TEMPLATE=$ANDROID_TEMPLATE PROXY=$PROXY_IP:$PROXY_PORT &> $LOGS/android_emulator.log &
  processes+=($!)
  
  echo "[==] Starting Appium"
  make ANDROID_TEMPLATE=$ANDROID_TEMPLATE appium &> /dev/null &
  processes+=($!)
}

function run_tests(){
  source ./.venv/bin/activate
  ADB_BOOTED=$(adb wait-for-device shell getprop sys.boot_completed | tr -d '\r');
  echo "[==] Proxy: $PROXY_IP:$PROXY_PORT"
  echo "[==] Current Proxy(HTTP): $ORIG_PROXY_IP:$ORIG_PROXY_PORT"
  echo "[==] Current Proxy(HTTPS): $ORIG_SECURE_PROXY_IP:$ORIG_SECURE_PROXY_PORT"
  
  echo "[==] Setting proxy for iOS tests."
  networksetup -setwebproxy "Wi-fi" $PROXY_IP $PROXY_PORT 
  networksetup -setsecurewebproxy "Wi-fi" $PROXY_IP $PROXY_PORT 
  networksetup -setwebproxystate "Wi-fi" on
  networksetup -setsecurewebproxystate "Wi-fi" on
  
  echo "[==] Checking for android device"
  
  while [[ $ADB_BOOTED != 1 ]]; do
    echo "[==] Waiting for android device to become available..." && sleep 2;
    ADB_BOOTED=$(adb wait-for-device shell getprop sys.boot_completed | tr -d '\r');
  done
  ADB_BOOTED=0 

  echo "[==] Generating certificate. (If not present)"
  npm run gen-cert &> /dev/null 
 
  if [[ ! -d $CERT_FILE ]]; then 
    echo "[EE] Certifciate generation failed!"
    exit 1
  fi

  echo "[==] Injecting certificate into android emulator"
  sudo make android-inject-cert ANDROID_TEMPLATE=$ANDROID_TEMPLATE PROXY=$PROXY_IP:$PROXY_PORT &> /dev/null
  
  while [[ $ADB_BOOTED != 1 ]]; do
    echo "[==] Waiting for android device to become available..." && sleep 2;
    ADB_BOOTED=$(adb wait-for-device shell getprop sys.boot_completed | tr -d '\r');
  done

  echo "[==] Running tests."
  ./node_modules/.bin/mocha --timeout 100000 --config .mocharc.js 'src/__test__/data.test.js' --reporter mochawesome
  
  echo "[==] Restoring proxy settings."
  networksetup -setwebproxy "Wi-fi" $ORIG_PROXY_IP $ORIG_PROXY_PORT 
  networksetup -setsecurewebproxy "Wi-fi" $ORIG_SECURE_PROXY_IP $ORIG_SECURE_PROXY_PORT 
  networksetup -setwebproxystate "Wi-fi" off
  networksetup -setsecurewebproxystate "Wi-fi" off
  
  open ./mochawesome-report/mochawesome.html
  echo "[==] Tests finished."
}

function clean_up(){
  for p in "${processes[@]}"
  do
    echo kill $p &> /dev/null
  done
  adb emu kill &> /dev/null
  killall Simulator &> /dev/null
  pkill node &> /dev/null
  deactivate &> /dev/null
  echo "[==] Finished."
}

init
start_server
run_tests
clean_up
