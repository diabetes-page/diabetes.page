---
Created: "2020-07-24"
Author: "Vincent Rolfs"
---

# A general development setup for The Software Brothers

This aims to become a general guideline for software projects developed by The Software Brothers. It will encompass the following modules:

- Backend
- Web frontend
- Mobile frontend
- Desktop frontend

It will provide standards for the following aspects of development:

- Technologies
- Frameworks
- Tools
- Code Style
- Testing
- DevOps
- Documentation
- Culture

# Backend: nest.js
The backend is written in JavaScript with [nest.js](https://nestjs.com/). It uses a [PostgreSQL](https://www.postgresql.org/) database.

- nestjs passport https://docs.nestjs.com/techniques/authentication
- CSRF
- JSON web token
- server side rendering
- optional chaining typescript: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining
- db access control
- webstorm for dev (eslint + prettier, ctrl+shift+alt+l enable all, commit enable all, prettier enable on save + ctrl+alt+l, eslint automatic config)
	- mark dist as excluded 
- typora for markdown
- Database migrations: https://medium.com/better-programming/typeorm-migrations-explained-fdb4f27cb1b3
  - Download omniDB
  - https://github.com/typeorm/typeorm/blob/master/docs/migrations.md
  - testing: https://docs.nestjs.com/techniques/database#testing-1
  - seeding
      - https://stackoverflow.com/questions/51198817/typeorm-how-to-seed-database
      - https://github.com/w3tecch/typeorm-seeding
  - only accept json!
- pre validation auth / post validation auth
- Lerna monorepo? https://blog.scottlogic.com/2018/02/23/javascript-monorepos.html
- Naming: everything camelCase, even database
- A folder that is not a leaf may contain at most one file
- Don't return password when returning userresource
- database unique validation?
- secret key env
- bcrypt
- everything should be async?
- Frontend: "new version is available" instead of cache breaking? like awork?

## Rationale

## Database

### Choice of database
The choice was between MySQL and Postgres. I decided to use Postgres, as it generally seems to be more sane with more/better features and conforming to standards. See https://developer.okta.com/blog/2019/07/19/mysql-vs-postgres for a comparison.

Down the line we might have to deal with some problems detailed in https://medium.com/@rbranson/10-things-i-hate-about-postgresql-20dbab8c2791, but this is very advanced use.

See here for installation on Ubuntu (German): https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04-de

Set password for default user `postgres`:
`sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"`
Create test db:
`sudo -u postgres psql -c "CREATE DATABASE testdb;"`
Start/stop service:
`sudo service postgresql start`

Default port is `5432`.

