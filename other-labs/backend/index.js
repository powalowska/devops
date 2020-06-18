const keys = require('./keys');

const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log(keys);

// Postgres Client setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
})

pgClient.on('error', () => console.log('Lost connection to PG'))

pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)').catch(err => console.log(err));

app.listen(5000, err => {
  console.log('Backend listening');
})

const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort
});

function NWD(a, b) {
    return b ? NWD(b, a % b) : a
}

app.get('/', (request, response) => {
  response.send('app-backend');
});

app.get('/counter', (request, response) => {
  redisClient.get('counter', (err, counterValue) => {
    response.send('Counter: ' + counterValue);
    redisClient.set('counter', parseInt(counterValue) + 1);
  });
});

app.get('/nwd/:l1/:l2', (req, res) => {
	const l1 = req.params.l1;
	const l2 = req.params.l2;
	const key = `${l1}:${l2}`;

	redisClient.get(key, (err, value) => {
            if (value === null || value === undefined) {
            value = nwd(number1, number2);
            redisClient.set(key, parseInt(value));
            postgresClient.query('INSERT INTO results (number) VALUES ($1)', [value])
            .catch(error => console.log(error));
    }
    response.send("NWD" + key + " = " + value);
  });
});

app.get('/nwd/results', (request, response) => {
  postgresClient.query('SELECT number FROM results', (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});

