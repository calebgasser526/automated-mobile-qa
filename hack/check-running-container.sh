#!/bin/bash

function container_status(){
  mtest_status=$(lima nerdctl inspect mtest | jq -r ".[0].State.Status")
  echo "mTest: ${mtest_status}"
  grafana_status=$(lima nerdctl inspect grafana | jq -r ".[0].State.Status")
  echo "Grafana: ${grafana_status}"
  postgres_status=$(lima nerdctl inspect postgres | jq -r ".[0].State.Status")
  echo "Posgres: ${postgres_status}"
  mongo_status=$(lima nerdctl inspect mongo | jq -r ".[0].State.Status")
  echo "Mongo: ${mongo_status}"
  adminer_status=$(lima nerdctl inspect adminer | jq -r ".[0].State.Status")
  echo "Adminer: ${adminer_status}"
  mongo_express_status=$(lima nerdctl inspect mongo-express | jq -r ".[0].State.Status")
  echo "Mongo-Express: ${mongo_express_status}"
}

function ready_check(){
  if [[ "$1" == "running" ]]; then
    return 1
  fi
  return 0
}

max_wait=5
wait_tries=3
current_wait=0

sleep 3
container_status
while (( $wait_tries < $max_wait )) && ready_check "$mtest_status" || ready_check "$grafana_status" || ready_check "$postgres_status" || ready_check "$mongo_status" || ready_check "$adminer_status" || ready_check "$mongo_express_status"; do
  container_status
  ((current_wait=current_wait+wait_tries))
  sleep 3
done

if ready_check "$mtest_status" ||  ready_check "$grafana_status" || ready_check "$postgres_status" || ready_check "$mongo_status" || ready_check "$adminer_status" || ready_check "$mongo_express_status"; then
  echo "[Error] Not all contianers started successfully!"
  exit 1
fi

echo "Containers ready!"
