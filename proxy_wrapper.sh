#!/bin/bash

python3 -m http.server $PROXY_WEB_FILE_PORT &
task proxy:run:web &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
