FROM node:18.12-alpine as base

RUN apk add --update libc6-compat openssl openssl-dev g++ make py3-pip

WORKDIR /photon

COPY package.json package.json

COPY api/package.json api/package.json

COPY app/package.json app/package.json

RUN yarn install --target_arch=x64

COPY api/prisma/schema.prisma api/src/database/schema.prisma

RUN yarn workspace @photon/api db:generate

COPY packages packages

COPY api api

RUN yarn workspace @photon/api build

COPY app app

RUN yarn workspace @photon/app build

FROM base as dev

RUN yarn workspace @photon/api db:seed
