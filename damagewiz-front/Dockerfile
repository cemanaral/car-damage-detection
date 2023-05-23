FROM node:18.16.0 
WORKDIR /app 
COPY package.json /app 
RUN npm install 
COPY . /app 
RUN find ./src \( -name "*jsx"  \) -print0 | xargs -0 sed -i 's/8080/8082/g; s/35.208.145.26/localhost/g; s/127.0.0.1/localhost/g'
ENTRYPOINT ["npm", "run", "dev"]