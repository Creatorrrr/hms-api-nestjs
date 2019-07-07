# HealthManagerServer

## Description

Runtime: NodeJS<br/>
Web Framework: NestJS<br/>
Persistence Framework: Sequelize

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# docker development mode
$ npm run build
$ docker-compose -f docker-compose.yml -f docker-compose.development.yml -p [container name prefix] up --scale web=[scale size] -d --build

# docker production mode
$ npm run build
$ docker-compose -f docker-compose.yml -f docker-compose.production.yml -p [container name prefix] up --scale web=[scale size] -d --build
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
