import mongoose from 'mongoose';
import { app } from './app';

(async () => {
    // environment variable confirmation
    if (!process.env.JWT_KEY) {
        throw new Error('Environment variable JWT_KEY is not defined!');
    }

    // data layer
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB Error!', err);
    }

    // listen
    app.listen(3000, () => {
        console.log('Listening on port 3000!');
    });
})();
