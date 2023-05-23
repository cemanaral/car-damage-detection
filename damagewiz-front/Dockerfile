FROM node:18.16.0 
WORKDIR /app 
COPY package.json /app 
RUN npm install 
COPY . /app 
ENTRYPOINT ["npm", "run", "dev"]