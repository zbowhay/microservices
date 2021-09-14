import request from 'supertest';
import { app } from '../../app';


beforeAll(() => {
    process.env.JWT_KEY = 'test';
});

it('returns a 201 on successful signup', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    });

it('returns a 400 with an invalid email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'notanemail',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456789012345678901234567890' // too many characters
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1' // not enough characters
        })
        .expect(400);
    });

it('returns a 400 for missing email or password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'password'
        })
        .expect(400);
});

it('does not allow duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('should set cookie with JWT if signup is successful', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();
    const cookie = response.get('Set-Cookie')[0];
    const jwtRegexMatch = cookie.match(/express:sess=([\w=]*);/);
    expect(jwtRegexMatch).toBeDefined();
    expect(jwtRegexMatch?.length).toBeDefined();
    const jwt = jwtRegexMatch![1];
    const decoded = Buffer.from(jwt, 'base64').toString('utf-8');
    const jwtObj = JSON.parse(decoded);
    expect(jwtObj.jwt).toBeDefined();
});