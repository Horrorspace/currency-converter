FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
COPY prisma prisma
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY src src
RUN yarn install --frozen-lockfile --ignore-scripts --ignore-engines
RUN yarn db:generate
RUN yarn build
EXPOSE 3000
CMD [ "node", "dist/main.js" ]