// This file connects to the remote prisma DB and gives us the ability to query using JS
const { Prisma } = require('prisma-binding');

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secred: process.env.PRISMA_SECRET,
  debug: true
});

module.exports = db;