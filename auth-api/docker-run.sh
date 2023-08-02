#!/bin/bash

docker run --name auth-api-db -e POSTGRES_PASSWORD=qwerty -p 5555:5432 -v $(pwd)/postgres-init:/docker-entrypoint-initdb.d -d --rm postgres:alpine
#psql -h localhost -p 5555 -U postgres -d sls_academynp