const { randomBytes } = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = 4000;
const posts = {}; // in-memory database

app.use(morgan('dev'));
app.use(bodyParser.json());

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = { id, title };

    res.status(201).send(posts[id]);
});

app.get('/posts', (req, res) => {
    res.status(200).send(posts);
});

app.listen(port, () => { console.log(`POSTS server listening on port ${port}...`); });