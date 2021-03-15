from node:alpine

# Fix for create-react-app to run properly in docker
ENV CI=true

workdir /app
copy package.json ./
run npm install
copy ./ ./

cmd [ "npm", "start" ]