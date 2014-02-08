#!/bin/sh
BINDIR="$(dirname "$(readlink -fn "$0")")"
cd "$BINDIR"
screen -S WebServer python -m SimpleHTTPServer 80
