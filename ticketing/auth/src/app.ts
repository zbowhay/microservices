import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found.error';
import cookieSession from 'cookie-session';


const app = express();

// should trust the ngnix proxy the server sits behind
app.set('trust proxy', true);

// middleware
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
}));

// routes
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

// error handling
app.all('*', async() => { throw new NotFoundError(); });
app.use(errorHandler);

export { app }
