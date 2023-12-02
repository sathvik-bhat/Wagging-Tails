FROM node:14.9

WORKDIR '/'
ADD . /

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm","run", "start:backend"]