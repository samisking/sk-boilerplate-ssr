FROM node:7.7

ENV PATH="$PATH:/opt/yarn/bin"

RUN mkdir -p /usr/src/app && \
    cd /opt && \
    curl -OL https://yarnpkg.com/latest.tar.gz && \
    tar xzf latest.tar.gz && \
    mv /opt/dist /opt/yarn

WORKDIR /usr/src/app

ADD package.json /usr/src/app/package.json
ADD yarn.lock /usr/src/app/yarn.lock
RUN yarn install

ADD . /usr/src/app

ENV NODE_ENV=production
