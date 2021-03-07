const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// local data storage
const posts = {};

// routes
app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    
    console.log(type);
    console.log(data);

    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId } = data;
        console.log(postId);
        const post = posts[postId];
        post.comments.push({ id, content });
    }

    console.log(posts);
    res.status(200).send({});
});


app.listen(4002, () => {
    console.log('listening on 4002...');
});