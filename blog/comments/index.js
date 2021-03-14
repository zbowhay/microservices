const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios').default;
const morgan = require('morgan');

const app = express();
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const postId = req.params.id;

    const comments = commentsByPostId[postId] || [];
    const comment = { id: commentId, content, status: 'pending' };
    comments.push(comment);

    commentsByPostId[postId] = comments;

    await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: { ...comment, postId }
});

res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { id, status, content, postId } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => comment.id === id);
        comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentUpdated',
        data: {
            id, status, content, postId
        }
    });
}

res.status(200).send({});
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});

