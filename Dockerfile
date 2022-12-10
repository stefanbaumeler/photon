FROM node:16
COPY . /photon
WORKDIR /photon
RUN yarn install
WORKDIR /photon/api
RUN yarn db:generate
RUN yarn build
EXPOSE 2000
RUN node dist
