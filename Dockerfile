FROM mhart/alpine-node

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm","start"]
