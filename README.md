# Earthquake early warning API

## Description
Rest API using Express and node.js. Earthquake early warning API used to access and modify infomation related to Earthquakes and a warning system.

## Table of Contents
- [API Link](#api-link)
- [Documentation](#documentation)
- [Apply prisma migrations](#apply-prisma-migrations)
- [Running database locally](#running-database-locally)
- [Seeding the Database](#seeding-the-database)
- [Running Chai and Mocha tests](#running-chai-and-mocha-tests)
- [API table ERD](#api-table-erd)

## API Link
(Note if link hasnt been used for a while, requests may be slow)
```
https://s1-24-intro-app-dev-mahoneybj.onrender.com
```

## Documentation
Link to postman route testing documentation
```
https://documenter.getpostman.com/view/33350013/2sA3QtcW1P
```
## Apply prisma migrations
Script to apply prisma migrations
```

```

## Running database locally
How to run database locally
```
npm install
npm run dev
```

## Running web app
How to run the web app locally
```
cd eew-frontend-react/
npm install
npm run dev -- --open
```

## Seeding the Database
(Note that when you run the automated tests, the database will automatically be seeded) 
To seed data into your database tables, use the following command:
```bash
npm install
npx prisma db seed
```

## Running Chai and Mocha tests
To run automated tests, use the following commands in order:
```bash
npm install
npm install joi
npm install chai@4.3.9 chai-http mocha --save-dev
npm test
```

## API table ERD
![ERD](https://github.com/otago-polytechnic-bit-courses/s1-24-intro-app-dev-mahoneybj/assets/65274137/158f93e5-1acc-4dc8-9ca2-ebeec13af113)
