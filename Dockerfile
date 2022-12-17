FROM node:16.12-alpine as base

RUN apk add --update libc6-compat openssl openssl-dev g++ make py3-pip

WORKDIR /photon

COPY package.json package.json

COPY packages/api/package.json packages/api/package.json

COPY packages/app/package.json packages/app/package.json

RUN yarn install --target_arch=x64

COPY packages/api/prisma/schema.prisma packages/api/src/database/schema.prisma

RUN yarn workspace @photon/api db:generate

COPY packages/api packages/api

RUN yarn workspace @photon/api build

COPY packages/app packages/app

RUN yarn workspace @photon/app build

FROM base as dev

RUN yarn workspace @photon/api db:seed
