FROM node:18.16.0 
WORKDIR /app 
COPY package.json /app 
RUN npm install 
COPY . /app 
RUN find ./src \( -name "*jsx"  \) -print0 | xargs -0 sed -i 's/localhost:8080/35.208.145.26:8082/g; s/127.0.0.1:8080/35.208.145.26:8082/g;'
ENTRYPOINT ["npm", "run", "dev"]