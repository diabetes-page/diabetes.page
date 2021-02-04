# diabetes.page backend

This the backend of diabetes.page and offers an API written using `nest.js`.

## Installation

First, run

```bash
npm install
```

### Setting up postgres

If you don't have postgres installed, [follow the instructions here to install it on Ubuntu (German article).](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04-de)

Set password for default user `postgres`:

```bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
```

Create test db:

```bash
sudo -u postgres psql -c "CREATE DATABASE testdb;"
```

Start/stop service:

```bash
sudo service postgresql start
```

Default port is `5432`.

### Creating the `.env` file

Finally, create a `.env` file via

```bash
cp .env.example .env
```

And set the correct values in the `.env` file. Choose a randomly generated password for `SECRET_KEY`.

And you're done! Try to run the backend using one of the commands below.

### Run the migrations

Run all database migrations to set up the database.

```bash
# Delete all tables and run migrations
npm run db:fresh

# Run seeder 
npm run db:seed

# Or just use this command to do both in one run:
npm run db:fresheed
```

## Running the backend

```bash
# watch mode
npm run watch

# debug mode
npm run debug

# production mode
npm run prod
```

## Testing

```bash
# tests
npm run test
```
