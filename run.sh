#!/bin/bash
processes=()
CERT_FILE=~/.mitmproxy/mitmproxy-ca-cert.cer
TARGET="anroid"
ANDROID_TEMPLATE="android-30.tmpl"
export PROXY_IP="127.0.0.1"
export PROXY_PORT="8080"
export PROXY="$PROXY_IP:$PROXY_PORT"
ORIG_PROXY_IP=$(networksetup -getwebproxy 'Wi-fi' | awk '/Server:/{print $NF}')
ORIG_PROXY_PORT=$(networksetup -getwebproxy 'Wi-fi' | awk '/Port:/{print $NF}')
ORIG_SECURE_PROXY_IP=$(networksetup -getsecurewebproxy 'Wi-fi' | awk '/Server:/{print $NF}')
ORIG_SECURE_PROXY_PORT=$(networksetup -getsecurewebproxy 'Wi-fi' | awk '/Port:/{print $NF}')
LOGS=./logs/$(date +"%Y-%m-%d")/$(date +"%T")
PROXY_TARGET="Wi-fi"

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
  echo "[==] Initializing."
  networksetup -setwebproxystate "${PROXY_TARGET}" off
  networksetup -setsecurewebproxystate "${PROXY_TARGET}" off

  mkdir -p $LOGS

  if ! command -v pyenv &> /dev/null; then
    echo "[==] Installing pyenv."
    curl https://pyenv.run | bash
    if [[ -f "${HOME}/.bashrc" ]]; then
      echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
      echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
      echo 'eval "$(pyenv init -)"' >> ~/.bashrc
      source ~/.bashrc
    fi
    if [[ -f "${HOME}/.profile" ]]; then
      echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
      echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
      echo 'eval "$(pyenv init -)"' >> ~/.bashrc
      source ~/.profile
    fi
    if [[ -f "${HOME}/.bash_profile" ]]; then
      echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
      echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
      echo 'eval "$(pyenv init -)"' >> ~/.bash_profile
      source ~/.bash_profile
    fi
    if [[ -f "${HOME}/.zshrc" ]]; then
      echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
      echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
      echo 'eval "$(pyenv init -)"' >> ~/.zshrc
      source ~/.zshrc
    fi
  fi

  if ! command -v python3.6 &> /dev/null; then
    echo "[==] Installing python 3.6."
    pyenv install 3.6.15 #&> /dev/null
  fi

  pyenv global 3.6.15

  if [[ ! -d "./.venv" ]]; then
    echo "[==] Creating python virtual environment."
    python -m venv .venv
  fi

  if [[ ! -d "./.venv/lib/python3.9/site-packages/mitmproxy" ]]; then 
    echo "[==] Installing python depedancies"
    . ./.venv/bin/activate && pip install -r requirments.txt &> $LOGS/pip_install.log 
  fi
  
  if [[ ! -d "./node_modules" ]]; then 
    echo "[==] Installing node depedancies"
    npm install &> $LOGS/npm_install.log
  fi
}

function check_for_android(){
  echo "[==] Checking for android device. This could take a while..."
  while [[ $ADB_BOOTED != 1 ]]; do
    echo "[==] Waiting for android device to become available..." && sleep 5;
    ADB_BOOTED=$(adb wait-for-device shell getprop sys.boot_completed | tr -d '\r');
  done
  ADB_BOOTED=0 
}

function start_server(){
  echo "[==] Starting server."
  echo "[==] Starting android emulator and appium."
  echo "[==] If this is your first run the emulator will need to be created. This may take a while."
  . ./.venv/bin/activate && make start &> $LOGS/server.log
  processes+=($!)
}

function run_tests(){
  echo "[==] Starting tests."
  check_for_android

  . ./.venv/bin/activate && make android-inject-cert &> $LOGS/inject_cert.log 

  if [[ ! -f $CERT_FILE ]]; then 
    echo "[EE] Certifciate generation failed!"
    clean_up
    exit 1
  fi
  
  echo "[==] Installing certificate to system."
	sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $CERT_FILE &> $LOG/add_cert.log 

  check_for_android

  echo "[==] Proxy: $PROXY_IP:$PROXY_PORT"
  echo "[==] Current Proxy(HTTP): $ORIG_PROXY_IP:$ORIG_PROXY_PORT"
  echo "[==] Current Proxy(HTTPS): $ORIG_SECURE_PROXY_IP:$ORIG_SECURE_PROXY_PORT"
  echo "[==] Setting proxy for iOS tests."
  networksetup -setwebproxy "${PROXY_TARGET}" $PROXY_IP $PROXY_PORT 
  networksetup -setsecurewebproxy "${PROXY_TARGET}" $PROXY_IP $PROXY_PORT 
  networksetup -setwebproxystate "${PROXY_TARGET}" on
  networksetup -setsecurewebproxystate "${PROXY_TARGET}" on

  echo "[==] Running tests."
  ./node_modules/.bin/mocha --timeout 100000 --config .mocharc.js 'src/__test__/data.test.js' --reporter mochawesome
  
  
  open ./mochawesome-report/mochawesome.html
  echo "[==] Tests finished."
}

function clean_up(){

  echo "[==] Restoring proxy settings."
  networksetup -setwebproxy "${PROXY_TARGET}" $ORIG_PROXY_IP $ORIG_PROXY_PORT 
  networksetup -setsecurewebproxy "${PROXY_TARGET}" $ORIG_SECURE_PROXY_IP $ORIG_SECURE_PROXY_PORT 
  networksetup -setwebproxystate "${PROXY_TARGET}" off
  networksetup -setsecurewebproxystate "${PROXY_TARGET}" off

  for p in "${processes[@]}"
  do
    echo kill $p &> /dev/null
  done
  adb emu kill &> /dev/null
  killall Simulator &> /dev/null
  kill $(pgrep -f mitm) &> /dev/null
  kill $(pgrep -f mocha) &> /dev/null
  deactivate &> /dev/null
  pkill -P $$
  pyenv global system
  echo "[==] Finished."
}

init
start_server
run_tests
clean_up
