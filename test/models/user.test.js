const TestHelpers = require('../test-helpers');
const { models } = require('../../src/models/index');

describe('User', () => {
  beforeAll(async () => {
    await TestHelpers.startDb();
  });

  afterAll(async () => {
    await TestHelpers.stopDb();
  });

  describe('static methods', () => {
    describe('hashPassword', () => {
      it('should encrypt the password correctly', async () => {
        const { User } = models;

        const password = 'Test123#';

        const hashedPassword = await User.hashedPassword(password);

        // What should be expected
        expect(hashedPassword).toEqual(expect.any(String));
        expect(hashedPassword).not.toEqual(password);
      });
    });

    describe('comparePassword', () => {
      it('it should return true if the hashed password is the same as the original password', async () => {
        const { User } = models;

        const password = 'Test123#';

        const hashedPassword = await User.hashedPassword(password);

        const verify = await User.comparePasswords(password, hashedPassword);

        expect(verify).toBe(true);
      });

      it('should return false if the hashed password does not match the original password', async () => {
        const { User } = models;

        const password = 'Test123#';

        const hashedPassword = await User.hashedPassword(password);

        const verify = await User.comparePasswords('password', hashedPassword);

        expect(verify).toBe(false);
      });
    });

    describe('hooks', () => {
      beforeEach(async () => {
        await TestHelpers.syncDb();
      });

      it('should create a user with a hashed password', async () => {
        const { User } = models;

        const email = 'test@email.com';

        const password = 'Test123#';

        await User.create({ email, password });

        const users = await User.findAll();

        expect(users.length).toBe(1);
        expect(users[0].email).toBe(email);
        expect(users[0].password).not.toEqual(password);
      });
    });
  });
});
