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
cd $DIR/../public/
echo "Launching webserver in directory: $(pwd)"
open "http://localhost:4000"
mongoose -listening_port 4000 -enable_directory_listing yes
