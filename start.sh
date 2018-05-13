#!/bin/sh

FILE="$1"
cat .env.$FILE > .env

if [ $FILE = "dev" ]; then
  docker-compose up --build
fi

if [ $FILE = "prod" ]; then
  docker-compose --file docker-compose.yml up --build
fi

if [ $FILE = "local" ]; then
  npm run dev
fi
