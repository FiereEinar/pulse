require('dotenv').config();
const { faker } = require('@faker-js/faker');

require('./utils/mongodb');

const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

function createRandomUser() {
  return {
    username: faker.internet.userName(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    password: faker.internet.password(),
  };
}

async function CreateMultipleUsers() {
  const amountOfUsers = 5;
  const users = [];

  for (let i = 0; i < amountOfUsers; i++) {
    console.log('Creating data for user ', i + 1)
    const userData = createRandomUser();
    users.push(userData);

    console.log('Creating user model');
    const user = new User({
      ...userData,
      profile: {
        url: '',
        publicID: ''
      },
      cover: {
        url: '',
        publicID: ''
      },
    });

    console.log('Saving user');
    await user.save();
  }

  console.log('All Users Saved:');
  console.log(users);
}

CreateMultipleUsers();