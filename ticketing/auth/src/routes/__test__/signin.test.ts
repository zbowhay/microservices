import request from 'supertest';
import { app } from '../../app';

beforeAll(() => {
    process.env.JWT_KEY = 'test';
});

it('returns a 400 when an email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'doesnotexist@fake.com',
            password: 'password'
        })
        .expect(400);
});

// it('returns a 201 on successful signin', () => {
//     return request(app)
//         .post('/api/users/siginin')
//         .send({
//             email: 'test@test.com',
//             password: 'password'
//         })
//         .expect(201);
// });
