#!/bin/bash

current_proxy_try=0
max_proxy_try=6

while ! nc -z $PROXY_HOST $PROXY_WEB_FILE_PORT 2>/dev/null && (( $current_proxy_try <= $max_proxy_try )); do
  ((current_proxy_try=current_proxy_try+1))
  echo "[==] Proxy server unreachable. Waiting then trying again. (${current_proxy_try}/${max_proxy_try})"
  sleep 10
done

if ! nc -z $PROXY_HOST $PROXY_WEB_FILE_PORT 2>/dev/null; then
  echo "[==] Unable to connect to proxy, max tries exceeded. Check to see if the proxy container is started and try again."
  exit 1
fi

if [ -f $1 ]; then
  echo "[==] Removing old certificate."
  rm $2
fi

wget $1
