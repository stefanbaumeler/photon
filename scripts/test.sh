#!/bin/sh

export NODE_ENV=test;
trap 'node scripts/teardown-db.js; exit 0;' SIGINT SIGTERM;
node scripts/setup-db.js;
yarn start-server-and-test 'yarn start:api' 2000 'yarn start:app' 3000 'yarn cy';
node scripts/teardown-db.js
