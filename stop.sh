#!/bin/bash
adb emu kill
killall Simulator
kill $(pgrep -f mitm)
kill $(pgrep -f mocha)
