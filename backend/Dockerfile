FROM node:latest

RUN mkdir -p /app/src

WORKDIR /api

ENV ATLAS_URI=mongodb+srv://Admin_user:MBYGCf6E4DvHeqkL@ggnotes.ptfin.gcp.mongodb.net/GGnotes?retryWrites=true&w=majority\
JWTSECRET=mk38hdtlHTS3gR

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]