# Earthquake early warning API

## Description
Bla bla bla

## Table of Contents
- [API Link](#api-link)
- [Seeding the Database](#seeding-the-database)
- [Running Chai and Mocha tests](#running-chai-and-mocha-tests)
- [API table ERD](#api-table-erd)

## API Link
(Note if link hasnt been used for a while, requests may be slow)
```
https://s1-24-intro-app-dev-mahoneybj.onrender.com
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
npx test
```

## API table ERD
![ERD](https://github.com/otago-polytechnic-bit-courses/s1-24-intro-app-dev-mahoneybj/assets/65274137/158f93e5-1acc-4dc8-9ca2-ebeec13af113)
