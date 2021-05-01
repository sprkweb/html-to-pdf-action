FROM buildkite/puppeteer:8.0.0

LABEL MAINTAINER="Łukasz Łapaj <lukaszlapaj@interia.pl>"

ENTRYPOINT ["node", "/lib/main.js"]

COPY . .

RUN npm install --production