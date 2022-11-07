## How Prisma works

---

There are three main components to Prisma

## Prisma schema

The prisma schema is the main configuration file for setting up our setup. In here we define how our db tables look like and what they contain. For reference see 'model User' in schema.prisma file.

## Importing ENV vars

To use any of the prisma commands, we need to import the environment variables so Prisma can connect to the DB. Use the following command:

```
source .env
```

## Prisma migrate

Prisma migrate allows us to migrate our schema we added/modified in schema.prisma. You can do this with a simple command:

```
prisma migrate dev --name addedSomething
```

## Prisma client

The prisma client allows us to interact with our database.

The prisma client is defined inside of index.ts, I have created a new object for PrismaClient. This will be used to perform CRUD operations.
