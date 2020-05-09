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
  response.status(200).send('Hello from Backend!');
});

app.get('/max/:first,:second,:third', (request, response) => {
  let first = parseInt(request.params.first);
  let second = parseInt(request.params.second);
  let third = parseInt(request.params.third);
  let maxStr = [first, second, third].toString();

  redisClient.get(maxStr, (err, maxFromCache) => {
    let result = {};
    if (!maxFromCache) {
      let max = Math.max(first, second, third);
      redisClient.set(maxStr, max);
      pgClient
        .query('INSERT INTO values (number) VALUES ($1)', [max])
        .catch(error => console.log(`Błąd: ${error}`));
      result.maxValue = max;
      result.description = 'to jest Twój wynik z obliczeń';
    }
    else {
      result.maxValue = maxFromCache;
      result.description = 'to jest Twój wynik z cache';
    }
    response.send(result);
  });
});

app.get('/results', (request, response) => {
  pgClient.query('SELECT * FROM values;', (error, result) => {
    if (error) {
      throw error;
    }
    if (!result.rows) {
      response.json([]);
    }
    else {
      response.json(result.rows);
    }
  });
});
