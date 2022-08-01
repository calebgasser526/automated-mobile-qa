#!/bin/bash
# Due to task not being able to detach processes to back ground
# this script is required to make that happen.
if [ -z $3 ]; then
  echo "[==] Running android without proxy."
  nohup $1 -avd "$2" -writable-system -netdelay none -netspeed full > /dev/null &
else
  echo "[==] Running android with proxy. {$3}"
  nohup $1 -avd "$2" -writable-system -netdelay none -netspeed full -http-proxy "http://$3" > /dev/null &
fi
