FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --fronzen-lockfile

COPY . .

RUN yarn --cwd "./src/ui-extensions/react-app" install
RUN yarn --cwd "./src/ui-extensions/react-app" build

RUN yarn build
EXPOSE 3000

CMD [ "yarn", "start" ]
