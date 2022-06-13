#!/bin/bash
# Due to task not being able to detach processes to back ground
# this script is required to make that happen.
nohup $1 -avd "$2" -writable-system -netdelay none -netspeed full -http-proxy "http://$3" > /dev/null &
