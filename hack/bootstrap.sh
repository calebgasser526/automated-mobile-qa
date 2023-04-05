#!/bin/bash


if ! command -v brew &> /dev/null; then
  NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL --noproxy https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi


if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> $HOME/.profile
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
    sudo apt-get install build-essential gcc
elif [[ "$OSTYPE" == "darwin"* ]]; then
  echo "OSX"
else
  echo "$OSTYPE not supported."
fi

if ! command -v task &> /dev/null; then
  brew install go-task/tap/go-task
fi
