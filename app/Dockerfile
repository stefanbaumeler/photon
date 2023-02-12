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
#COPY app/package.json app/
#
#RUN yarn install
#
#COPY app app
#
#RUN yarn build:lerna
#
#
#FROM base as prod
#
#WORKDIR /photon
#
#COPY app/package.json app/
#
#RUN yarn install --prod
#
#
#FROM node:18.12-alpine
#
#WORKDIR photon
#
#COPY package.json .
#
#COPY yarn.lock .
#
#COPY app/package.json app/
#
#COPY --from=prod photon/node_modules/ app/node_modules/
#
#COPY --from=build photon/app/.next/standalone app/
#
#COPY --from=build photon/app/.next/static/ app/.next/static/
#
#EXPOSE 3030
