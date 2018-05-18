// contact.config.js
const faker = require('faker');

module.exports = {
  status: 'ready',
  context: {
    attributes: " src=\"" + faker.image.imageUrl() + "\"",
    fallback: faker.image.imageUrl(),
    alt: faker.lorem.paragraph(),
  }
};
