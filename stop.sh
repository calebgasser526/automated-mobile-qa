#!/bin/bash
adb emu kill
killall Simulator
kill -9 $(pgrep -f mitm)
kill $(pgrep -f mocha)
