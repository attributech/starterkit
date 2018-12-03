'use strict';

const faker = require('faker'); // require the faker module
const menuItemCount = 5; // how many members we should generate data for
const menuItemData = [];
const defaultValues = {
  url: '#',
  in_active_trail: false,
  is_active: false,
};

for (var i = 0; i < menuItemCount; i++) {
  let data = {
    title: faker.lorem.word()
  };
  data = {...defaultValues, ...data};
  menuItemData.push(data);
}

const random = Math.floor(Math.random() * menuItemCount);
menuItemData[random].in_active_trail = true;
menuItemData[random].is_active = true;

module.exports = {
  context: {
    menu_name: 'main',
    attributes: [],
    modifier: '',
    items: menuItemData
  }
};
