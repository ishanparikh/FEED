FROM node:10.15.0-alpine

WORKDIR /frontend/
EXPOSE 3000

COPY package.json package.json
RUN npm install

COPY . .

CMD ["npm", "start"]
