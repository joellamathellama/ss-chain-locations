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


##### Server

- createdb ss_dev

- npm start

##### Tests

Initial
- dropdb ss_test

- createdb ss_test

Consecutive
- npm [test, run nyan, run spec]
