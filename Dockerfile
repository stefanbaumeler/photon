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

COPY api/src/database/fixtures/image-0.jpg api/dist/uploads/9b004ea9-996f-4c18-92e3-bec2b9051585
COPY api/src/database/fixtures/image-1.jpg api/dist/uploads/2b96675e-2428-4520-909e-91e8a91fb5f9
COPY api/src/database/fixtures/image-2.jpg api/dist/uploads/114d5e91-b89e-4a31-9305-d3753bf64f2c
COPY api/src/database/fixtures/image-3.jpg api/dist/uploads/bc8b723c-3f58-4bd6-a2e5-9fa1fbdd305d
COPY api/src/database/fixtures/image-4.jpg api/dist/uploads/3498b0eb-9433-4c90-a27b-ac1f08221fa7
COPY api/src/database/fixtures/image-5.jpg api/dist/uploads/6e11ebf1-4d3d-457d-b27b-7fcf66d5bb16
COPY api/src/database/fixtures/image-6.jpg api/dist/uploads/2ef6335e-ef45-400f-97ee-213f2c1e1a48


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

COPY --from=app-prod photon/node_modules/ app/node_modules/

COPY --from=app-build photon/app/.next/standalone app/

COPY --from=app-build photon/app/.next/static/ app/.next/static/


FROM mcr.microsoft.com/playwright:v1.30.0-focal as test

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

WORKDIR /photon

COPY --from=install photon/ .

COPY app/__tests__ app/__tests__

COPY app/playwright.config.ts app/

COPY app/.env.ci app/.env

COPY app/env.ts app/

COPY api api

COPY api/.env.ci api/.env

COPY jest.config.ts .
