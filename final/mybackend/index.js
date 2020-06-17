const express = require('express');
const {v4: uuidv4} = require('uuid');
const redis = require('redis');
const { Pool } = require('pg');
const keys = require("./keys");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const appId = uuidv4();

app.use(cors());
app.use(bodyParser.json());

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const pgClient = new Pool({
    host: keys.pgHost,
    port: keys.pgPort,
    user: keys.pgUser,
    password: keys.pgPassword,
    database: keys.pgDatabase
});

console.log(keys);

pgClient
    .on('error', () => console.log('Cannot connect to PG database.'));
pgClient
    .query('CREATE TABLE IF NOT EXISTS max_results_final (number BIGINT);')
    .catch(err => console.log(err));

app.get('/', (req, resp) => {
    const key = 'id';
	let chekIfFirst = '';
    redisClient.get(key, (err, appIdval) => {
        if (appIdval !== null) {
			chekIfFirst = `- no, before you was ${appIdval}`;
        } else {
			chekIfFirst = `- yes, you are first`;
		}
        resp.send(`Hello ${appId} -> ${chekIfFirst}!`);
        redisClient.set(key, appId);
    });

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
        .query('INSERT INTO max_results_final (number) VALUES ($1);', [max])
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
  pgClient.query('SELECT * FROM max_results_final;', (error, result) => {
    if (error) {
      throw error;
    }
    if (!result.rows || !result) {
      response.json([]);
    } else {
      response.json(result.rows);
    }
  });
});

app.listen(keys.backPort, err => {
    console.log(`Backend listening on port ${keys.backPort}`);
});
