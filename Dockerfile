FROM node:15-alpine

# Create app directory
RUN mkdir -p /opt/api && mkdir -p /opt/api/dist

COPY src            /opt/api/src
COPY package.json   /opt/api/
COPY tsconfig.json  /opt/api/

WORKDIR /opt/api

# Install npm modules, then install typescript and then compile code
RUN npm install --production \
    && npm install -g typescript@4.1.3  \
    && tsc

# Start command
CMD [ "node", "./dist/index.js" ]
