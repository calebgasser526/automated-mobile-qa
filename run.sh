#!/bin/bash
PYTHON_VERSION=3.8.13
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
  # install wget
  if ! command -v wget &> /dev/null; then
    echo "[==] Installing wget."
    brew install wget &> /dev/null
  fi

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

  pyenv global $PYTHON_VERSION &> /dev/null 

  if [[ "$(python --version | awk '/Python/{print $NF}')" != "${PYTHON_VERSION}" ]]; then
    # Change python version. 
    echo "[==] Installing python version $PYTHON_VERSION"
    pyenv install $PYTHON_VERSION &> /dev/null
    pyenv global $PYTHON_VERSION &> /devn/null 
  fi

  echo "[==] Using python version $PYTHON_VERSION"

  if [[ ! -d "./.venv" ]]; then
    echo "[==] Creating python virtual environment."
    python -m venv .venv
  fi

  if [[ ! -d "./.venv/lib/python3.9/site-packages/mitmproxy" ]]; then 
    echo "[==] Installing python depedancies"
    . ./.venv/bin/activate && pip install -r requirments.txt &> /dev/null 
  fi
  
  if [[ ! -d "./node_modules" ]]; then 
    echo "[==] Installing node depedancies"
    npm install -g appium &> /dev/null
    npm install &> /dev/null 
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

function gen_cert(){
  echo "[==] Generating certificate."
  check_for_android
  start_proxy
  . ./.venv/bin/activate && make android-inject-cert &> /dev/null 
  stop_proxy
  if [[ ! -f $CERT_FILE ]]; then 
    echo "[EE] Certifciate generation failed!"
    clean_up
    exit 1
  fi
  echo "[==] Certificate generated successfully."
}

function run_tests(){
  echo "[==] Starting tests."

  gen_cert

  if ! security find-certificate -c "mitmproxy" -a &> /dev/null; then  
    echo "[==] Installing certificate to system."
	  sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $CERT_FILE &> /dev/null 
  fi

  check_for_android

  start_proxy

  echo "[==] Running tests."
  ./node_modules/.bin/mocha --timeout 100000 --config .mocharc.js 'src/__test__/data.test.js' --reporter mochawesome
  
  
  open ./mochawesome-report/mochawesome.html
  echo "[==] Tests finished."
}

function start_proxy(){
  echo "[==] Starting proxy."
  networksetup -setwebproxy "${PROXY_TARGET}" $PROXY_IP $PROXY_PORT 
  networksetup -setsecurewebproxy "${PROXY_TARGET}" $PROXY_IP $PROXY_PORT 
  networksetup -setwebproxystate "${PROXY_TARGET}" on
  networksetup -setsecurewebproxystate "${PROXY_TARGET}" on
}

function stop_proxy(){
  echo "[==] Restoring proxy settings."
  networksetup -setwebproxy "${PROXY_TARGET}" $ORIG_PROXY_IP $ORIG_PROXY_PORT 
  networksetup -setsecurewebproxy "${PROXY_TARGET}" $ORIG_SECURE_PROXY_IP $ORIG_SECURE_PROXY_PORT 
  networksetup -setwebproxystate "${PROXY_TARGET}" off
  networksetup -setsecurewebproxystate "${PROXY_TARGET}" off
}

function clean_up(){
  stop_proxy

  for p in "${processes[@]}"
  do
    echo kill $p &> /dev/null
  done
  adb emu kill &> /dev/null
  killall Simulator &> /dev/null
  kill -9 $(pgrep -f mitm) &> /dev/null
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
