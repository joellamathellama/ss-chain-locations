## Soccer Spirits: Chain Locator

##### Database of NPC locations for Soccer Spirits Chains

##### Tech Stack
- Angular

- Jquery's Ajax

- Express

- Knex

- Postgres

- Mocha, Chai, Supertest, Supertest-as-promised

##### First things first

- npm install

##### Database

- initdb db/

- postgres -D db/ (or what they show you in Terminal, if it's different)

- createdb DB_NAME

- psql ss_dev (db meddling)


##### Start Dev Server

- npm start

##### Tests

Initial
- dropdb ss_test

- createdb ss_test

- NODE_ENV=test node server/index.js

- CTRL + c

Consecutive
- npm [test, run nyan, run spec]
