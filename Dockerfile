FROM node:16-alpine

WORKDIR /front

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5173

CMD ["yarn", "dev", "--port", "5173", "--host"]
