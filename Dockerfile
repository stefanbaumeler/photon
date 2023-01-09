FROM node:18.12-alpine as base

RUN apk add --update libc6-compat openssl openssl-dev g++ make py3-pip

WORKDIR /photon

COPY package.json package.json

COPY src/api/package.json src/api/package.json

COPY src/app/package.json src/app/package.json

RUN yarn install --target_arch=x64

COPY src/api/prisma/schema.prisma src/api/src/database/schema.prisma

RUN yarn workspace @photon/api db:generate

COPY packages packages

COPY src/api src/api

RUN yarn workspace @photon/api build

COPY src/app src/app

RUN yarn workspace @photon/app build

FROM base as dev

RUN yarn workspace @photon/api db:seed
