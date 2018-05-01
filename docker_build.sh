#!/bin/sh

docker build -t autochecker --build-arg CACHEBUST=$(date +%d) .
