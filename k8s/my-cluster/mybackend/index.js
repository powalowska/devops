const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const appId = uuidv4();
const port = 5000;

const redis = require('redis');
const redisClient = redis.createClient({
    host: 'redis-service',
    port: 6379,
    retry_strategy: () => 1000
});

app.get('/', (req, resp) => {
    resp.send(`[${appId} Hello from my backend app]`);
});

app.listen(port, err => {
    console.log(`Backend listening on port ${port}`);
});
