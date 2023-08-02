#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 -U postgres <<-EOSQL
CREATE DATABASE sls_academy WITH OWNER postgres;
\c sls_academy postgres
CREATE TABLE users (
    id serial PRIMARY KEY,
    user_id varchar UNIQUE NOT NULL,
    email varchar UNIQUE NOT NULL,
    password_hash varchar NOT NULL
);