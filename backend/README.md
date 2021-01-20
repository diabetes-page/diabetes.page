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

And set the correct values in the `.env` file.

And you're done! Try to run the backend using one of the commands below.

## Running the backend

```bash
# development mode
npm run start:dev

# watch mode
npm run start:dev:watch

# debug mode
npm run start:dev:debug

# production mode
npm run start:prod
```

## Testing

```bash
# tests
npm run test
```
