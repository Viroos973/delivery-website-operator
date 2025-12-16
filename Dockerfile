FROM node:20-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4175

CMD ["npm", "run", "build-and-preview"]