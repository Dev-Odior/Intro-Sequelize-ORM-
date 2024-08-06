const request = require('supertest');
const TestsHelpers = require('../../test-helpers');
const { models } = require('../../../src/models/index');
const Test = require('supertest/lib/test');

const test = new TestsHelpers();

describe('register', () => {
  let app;

  beforeAll(async () => {
    await test.startDb();
    app = test.getApp();
  });

  afterAll(async () => {
    await test.stopDb();
  });

  beforeEach(async () => {
    await test.syncDb();
  });

  it('should register a new user successfully', async () => {
    await request(app).post('/v1/register').send({ email: 'test@example.com', password: 'Test1234$' }).expect(200);

    const { User } = models;

    const users = await User.findAll({});

    // console.log(users);
    // expect(users.length).toEqual(1);
    // expect(users[0].email).toEqual('test@example.com');

    console.log('worked');
  });
});
