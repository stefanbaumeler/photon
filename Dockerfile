FROM node:18.12-alpine as base

RUN apk add --update libc6-compat openssl openssl-dev g++ make py3-pip

WORKDIR /photon

COPY package.json .

COPY yarn.lock .

COPY lerna.json .

COPY tsconfig.json .

COPY packages packages


FROM base as packages

WORKDIR /photon

RUN yarn install --network-timeout 300000

RUN yarn build:lerna


FROM packages as api-build

WORKDIR /photon

COPY api/package.json api/

RUN yarn install --network-timeout 300000

COPY api/env.ts api/

COPY api/src/database/index.ts api/src/database/

COPY api/src/database/setup.ts api/src/database/

COPY api/prisma/schema.prisma api/prisma/

COPY api/tsconfig.json api/

RUN yarn workspace @photon/api db:setup

COPY api api

RUN yarn workspace @photon/api db:generate

RUN yarn workspace @photon/api build


FROM base as api-prod

COPY api/package.json api/

WORKDIR /photon

RUN yarn install --prod --network-timeout 300000


FROM node:18.12-alpine as api

RUN apk add --update libc6-compat openssl openssl-dev g++ make py3-pip

WORKDIR /photon

COPY api/package.json api/

COPY package.json .

COPY yarn.lock .

COPY --from=api-prod photon/node_modules/ node_modules/

RUN mkdir api/ssl

RUN openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout api/ssl/key.pem -out api/ssl/cert.pem -subj "/C=CH/ST=Lucerne/L=Lucerne/O=Photon/OU=Photon/CN=photon.com"

COPY --from=api-build photon/api/dist/ api/dist/

EXPOSE 11011


FROM packages as app-build

WORKDIR /photon

COPY app/package.json app/

RUN yarn install --network-timeout 300000

COPY app app

RUN yarn workspace @photon/app build


FROM base as app-prod

WORKDIR /photon

COPY app/package.json app/

RUN yarn install --prod --network-timeout 300000


FROM node:18.12-alpine as app

WORKDIR /photon

COPY package.json .

COPY yarn.lock .

COPY app/package.json app/

COPY --from=app-prod photon/node_modules/ app/node_modules/

COPY --from=app-build photon/app/.next/standalone app/

COPY --from=app-build photon/app/.next/static/ app/.next/static/

EXPOSE 3030
