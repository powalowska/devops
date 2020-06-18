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


app.listen(port, err => {
    console.log(`Backend listening on port ${port}`);
});
