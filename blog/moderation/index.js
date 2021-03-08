const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const morgan = require('morgan');

const app = express();
app.use(morgan('short'));
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        let { id, content, status, postId } = data;
        status = content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id, content, status, postId
            }
        });
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('listening on 4003...');
});

