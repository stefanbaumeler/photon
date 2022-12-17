#!/bin/sh

export NODE_ENV=test;
trap 'node scripts/teardown-db.js; exit 0;' SIGINT SIGTERM;
node scripts/setup-db.js;
yarn start-server-and-test 'yarn watch:api' 2001 'yarn watch:app' 3030 'yarn cy';
node scripts/teardown-db.js
