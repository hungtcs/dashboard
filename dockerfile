from node:14.17.5-alpine3.14
workdir /usr/src/app
copy . .
run npm install && npm run build && npm prune --prod && rm -rf node_modules/.cli-ngcc node_modules/.cache
cmd npm run start
expose 3000
