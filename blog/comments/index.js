const { randomBytes } = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = 4001;
const commentsByPostId = { /** postId: [ { commentId, content }, ... comments]  */}; // in-memory database

app.use(morgan('dev'));
app.use(bodyParser.json());

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.listen(port, () => { console.log(`POSTS server listening on port ${port}...`); });