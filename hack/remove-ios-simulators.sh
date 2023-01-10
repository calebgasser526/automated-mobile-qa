#!/bin/bash
jq_output=$(xcrun simctl list --json | jq --raw-output '.devices."com.apple.CoreSimulator.SimRuntime.iOS-15-0"[] | select(.name=="appium") | .udid')
#jq_output=$(xcrun simctl list --json | jq '.devices."com.apple.CoreSimulator.SimRuntime.iOS-15-0"[] | select(.name=="appium")')
function delete_simualtors(){
  while IFS= read -r line; do
      echo "Removing iOS Simulator: $line"
      xcrun simctl delete $line
  done <<< "$jq_output"
}
delete_simualtors
