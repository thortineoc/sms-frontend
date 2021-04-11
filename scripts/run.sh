#!/bin/bash

runCmd="serve -s build -l 24010"

PID=""
notRunning() {
	PID=$(ps aux | grep "node.*$runCmd" | grep -v "grep" | awk '{print $2}')
	[[ $PID == "" ]]
}

case $1 in
  start)
      echo "Starting frontend react app"
      $runCmd > /dev/null 2>&1 < /dev/null &
    ;;
  stop)
      echo "Stopping frontend react app"
      if notRunning; then
        echo "Frontend is not running"
        exit 1;
      fi
      kill $PID
    ;;
  status)
      echo "Frontend status:"
      if notRunning; then
        echo "Not running"
        exit 2
      else
        echo "Running at pid: $PID";
      fi
    ;;
  *)
    echo "Usage ./run.sh {start|stop|status}"
    exit 255
    ;;
esac

