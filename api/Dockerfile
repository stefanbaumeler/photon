#FROM node:18.12-alpine as base
#
#RUN apk add --update libc6-compat openssl openssl-dev g++ make py3-pip
#
#WORKDIR /photon
#
#COPY package.json .
#
#COPY yarn.lock .
#
#COPY lerna.json .
#
#COPY tsconfig.json .
#
#COPY packages packages
#
#
#FROM base as packages
#
#WORKDIR /photon
#
#RUN yarn install
#
#RUN yarn build:lerna
#
#
#FROM packages as build
#
#WORKDIR /photon
#
#COPY api/package.json api/package.json
#
#RUN yarn install
#
#COPY api/env.ts api/env.ts
#
#COPY api/src/database/index.ts api/src/database/index.ts
#
#COPY api/src/database/setup.ts api/src/database/setup.ts
#
#COPY /api/prisma/schema.prisma /api/prisma/schema.prisma
#
#RUN yarn workspace @photon/api db:setup
#
#RUN yarn workspace @photon/api db:generate
#
#COPY api api
#
#RUN yarn build:lerna
#
#
#FROM base as prod
#
#COPY api/package.json api/package.json
#
#WORKDIR /photon
#
#RUN yarn install --prod
#
#
#FROM node:18.12-alpine
#
#RUN apk add --update libc6-compat openssl openssl-dev g++ make py3-pip
#
#WORKDIR /photon
#
#COPY api/package.json api/package.json
#
#COPY package.json .
#
#COPY yarn.lock .
#
#COPY --from=prod photon/node_modules/ node_modules/
#
#RUN mkdir api/ssl
#
#RUN openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout api/ssl/key.pem -out api/ssl/cert.pem -subj "/C=CH/ST=Lucerne/L=Lucerne/O=Photon/OU=Photon/CN=photon.com"
#
#COPY --from=build photon/api/dist/ api/dist/
#
#EXPOSE 11011
