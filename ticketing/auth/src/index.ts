import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found.error';
import { User } from './models/user';
import cookieSession from 'cookie-session';


const app = express();

// should trust the ngnix proxy the server sits behind
app.set('trust proxy', true);

// middleware
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true,
}));

// routes
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

// error handling
app.all('*', async() => { throw new NotFoundError(); });
app.use(errorHandler);

const start = async () => {
    // data layer
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to MongoDB');

        await User.create({ email: 'test@test.com', password: 'password' });
    } catch (err) {
        console.error('MongoDB Error!', err);
    }

    // listen
    app.listen(3000, () => {
        console.log('Listening on port 3000!');
    });
};

start();
