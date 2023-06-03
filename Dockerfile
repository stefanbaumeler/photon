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

COPY web/package.json web/

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


FROM install as web-build

WORKDIR /photon

COPY web web

COPY web/.env.ci web/.env

WORKDIR /photon/web

RUN yarn build


FROM base as web-prod

WORKDIR /photon

COPY web/package.json web/

RUN yarn install --prod --network-timeout 300000


FROM node:18.12.1-slim as web

WORKDIR /photon

COPY package.json .

COPY yarn.lock .

COPY web/package.json web/

COPY --from=web-prod photon/node_modules/ node_modules/

COPY --from=web-build photon/web/.next/standalone .

COPY --from=web-build photon/web/.next/static/ web/.next/static/


FROM mcr.microsoft.com/playwright:v1.30.0-focal as test

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs postgresql

WORKDIR /photon

COPY --from=install photon/ .

COPY web/__tests__ web/__tests__

COPY web/playwright.config.ts web/

COPY web/.env.ci web/.env

COPY web/.env.ci web/.env.test

COPY web/env.ts web/

COPY api api

COPY api/.env.ci api/.env

COPY api/.env.ci api/.env.test

COPY jest.config.ts .

RUN npx playwright install

RUN mkdir api/uploads
