# Earthquake early warning API

## Description

Rest API using Express and node.js. Earthquake early warning API used to access and modify infomation related to Earthquakes and a warning system.

## Table of Contents

- [API Link](#api-link)
- [Documentation](#documentation)
- [Set up after cloning repo](#set-up-after-cloning-repo)
- [Running database locally](#running-database-locally)
- [Running web app locally](#running-web-app-locally)
- [Seeding the Database](#seeding-the-database)
- [Running Chai and Mocha tests](#running-chai-and-mocha-tests)
- [Debugging and resetting database](#debugging-and-resetting-database)
- [How to format code](#how-to-format-code)
- [API table ERD](#api-table-erd)
- [Use of AI](#use-of-ai)

## API Link

(Note if link hasnt been used for a while, requests may be slow)

```bash
https://s1-24-intro-app-dev-mahoneybj.onrender.com
```

## Documentation

Link to postman route testing documentation

```bash
https://documenter.getpostman.com/view/33350013/2sA3QtcW1P
```

## Set up after cloning repo

Lists of scripts to run after cloning repo

```bash
npm install
```

Copy .env.example, change file name to .env
Enter database external connection link to .env

```
DATABASE_URL=ADD DATABASE LINK HERE
```

Apply prisma migrations

```bash
npx prisma migrate dev
```

## Running database locally

How to run database locally

```bash
npm run dev
```

## Running web app

How to run the web app locally

```bash
cd eew-frontend-react/
npm install
npm run dev -- --open
```

## Seeding the Database

(Note that when you run the automated tests, the database will automatically be seeded)
To seed data into your database tables, use the following command:

```bash
npx prisma db seed
```

## Running Chai and Mocha tests

To run automated tests, use the following commands in order:

```bash
npm install joi
npm install chai@4.3.9 chai-http mocha --save-dev
npm test
```

## Debugging and resetting database

Some debugging steps when things arn't working as it should
This command resets the database

```bash
npx prisma migrate reset
```

Prisma studio allows you to view each table and all the data in a web app

```bash
npx prisma studio
```

## How to format code

- CONTROL + SHIFT + P
- Type in 'format document' in the vs code search
- Press enter

## API table ERD

![ERD](https://github.com/otago-polytechnic-bit-courses/s1-24-intro-app-dev-mahoneybj/assets/65274137/158f93e5-1acc-4dc8-9ca2-ebeec13af113)

## Use of AI

I used AI such as chatgpt for time consuming tasks such as converting one table componant to work with another table etc. Only did this a couple of time
until I relised that it was acually slowing me down as it was just causing more bugs that I would have to spend time to correct.
Example promts used:
"Can you change this (Table code for earthquake) to work with this table (building table)"
