const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');

const app = express();
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(cors());

// local data storage
const posts = {};

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, status, postId } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, content, status, postId } = data;
        const comments = posts[postId].comments;
        const comment = comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    }
}

// routes
app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.status(200).send({});
});


app.listen(4002, async () => {
    console.log('listening on 4002...');

    const res = await axios.get('http://localhost:4005/events');

    res.data.forEach(event => {
        console.log(`Processing event: ${event.type}`);
        handleEvent(event.type, event.data);
    });
});