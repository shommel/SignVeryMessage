FROM node:12

WORKDIR /app

# install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# copy public/ and src/
COPY . ./

# expose react port
EXPOSE 3000


CMD ["yarn", "start"]