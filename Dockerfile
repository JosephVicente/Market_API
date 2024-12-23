FROM node

WORKDIR /src/usr/

COPY . .

EXPOSE 8080

RUN npm i
RUN npm run build

CMD ["npm", "start"]
