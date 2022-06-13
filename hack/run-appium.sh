#!/bin/bash
# Due to task not being able to detach processes to back ground
# this script is required to make that happen.
nohup appium &> /dev/null &
