FROM node:14.9

WORKDIR '/app'
ADD . /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run", "start:frontend"]