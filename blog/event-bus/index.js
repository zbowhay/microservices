const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const morgan = require('morgan');

const app = express();
app.use(morgan('short'));
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);
    axios.post('http://localhost:4003/events', event);

    res.status(200).send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.status(200).send(events);
})

app.listen(4005, () => {
    console.log('listening on 4005...');
});
