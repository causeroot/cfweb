#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [ ! "$(which mongoose)" ]; then
	echo "mongoose web server is not installed."
	if [ "$(which brew)" ]; then
		echo "Found homebrew. Installing mongoose..."
		brew update
		brew install mongoose
	elif [ "$( which port)" ]; then
		echo "Found MacPorts. Installing mongoose..."
		port install mongoose
	fi
fi
if [ ! "$(which yuicompressor)" ]; then
	brew install yuicompressor || port install yuicompressor
fi

cd $DIR/../www/

echo "Launching webserver in directory: $(pwd)"
mongoose -listening_port 4000 -enable_directory_listing yes &
MONGOOSE_PID=$!
trap "echo Killing web server...; kill $MONGOOSE_PID; exit;" SIGINT SIGTERM ERR
sleep 1
if [ -d /Applications/Google\ Chrome.app ]; then
  open -a Google\ Chrome "http://localhost:4000"
else
  open "http://localhost:4000"
fi
wait $MONGOOSE_PID 
