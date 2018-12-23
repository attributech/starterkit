const faker = require('faker');

module.exports = {
  status: 'unused',
  context: {
    title: faker.lorem.words(),
    content: '<p>' + faker.lorem.paragraph() + '</p>',
  }
};
