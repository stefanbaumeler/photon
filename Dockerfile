FROM node:18.12.1-slim as base

RUN apt-get update && apt-get -y install g++ make python3

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


FROM packages as install

WORKDIR /photon

COPY api/package.json api/

COPY app/package.json app/

COPY api/prisma/schema.prisma api/prisma/

RUN yarn install --network-timeout 300000


FROM install as api-build

WORKDIR /photon

COPY api api

COPY api/.env.ci api/.env

RUN yarn workspace @photon/api build


FROM base as api-prod

WORKDIR /photon

COPY api/prisma/schema.prisma api/prisma/

COPY api/package.json api/

RUN yarn install --prod --network-timeout 300000


FROM node:18.12.1-slim as api

RUN apt-get update && apt-get -y install g++ make python3

WORKDIR /photon

COPY api/package.json api/

COPY package.json .

COPY yarn.lock .

COPY --from=api-prod photon/node_modules/ node_modules/

COPY --from=api-build photon/api/dist/ api/dist/

RUN mkdir api/dist/uploads


FROM install as app-build

WORKDIR /photon

COPY app app

COPY app/.env.ci app/.env

WORKDIR /photon/app

RUN yarn build


FROM base as app-prod

WORKDIR /photon

COPY app/package.json app/

RUN yarn install --prod --network-timeout 300000


FROM node:18.12.1-slim as app

WORKDIR /photon

COPY package.json .

COPY yarn.lock .

COPY app/package.json app/

COPY --from=app-prod photon/node_modules/ node_modules/

COPY --from=app-build photon/app/.next/standalone .

COPY --from=app-build photon/app/.next/static/ app/.next/static/


FROM mcr.microsoft.com/playwright:v1.30.0-focal as test

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs postgresql

WORKDIR /photon

COPY --from=install photon/ .

COPY app/__tests__ app/__tests__

COPY app/playwright.config.ts app/

COPY app/.env.ci app/.env

COPY app/.env.ci app/.env.test

COPY app/env.ts app/

COPY api api

COPY api/.env.ci api/.env

COPY api/.env.ci api/.env.test

COPY jest.config.ts .

RUN npx playwright install

RUN mkdir api/uploads
