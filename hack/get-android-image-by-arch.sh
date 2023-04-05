#!/bin/bash

case $(uname -m) in
    x86_64) echo "system-images;android-30;google_apis;x86";;
    *) echo "system-images;android-30;google_apis;arm64-v8a";;
esac
