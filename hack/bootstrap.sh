#!/bin/bash

# Install brew if not present.
if ! command -v brew &> /dev/null; then
  NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install task if not present.
if ! command -v task &> /dev/null; then
  brew install go-task/tap/go-task
fi
