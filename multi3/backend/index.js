const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const { Pool } = require('pg');
const pgClient = new Pool({
  host: keys.pgHost,
  port: keys.pgPort,
  user: keys.pgUser,
  password: keys.pgPassword,
  database: keys.pgDatabase
});

pgClient
  .on('error', () => console.log('Cannot connect to PG database.'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));


const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});


const port = 5000;
app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
  console.log(keys);
})

app.get('/', (request, response) => {
  response.status(200).send("Hello from Backend!");
});
