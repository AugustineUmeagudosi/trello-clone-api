const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('OrganizationMembersRoles', [
      { id: uuidv4(), role: 'Member', createdAt: new Date(), updatedAt: new Date() }, 
      { id: uuidv4(), role: 'Supervisor', createdAt: new Date(), updatedAt: new Date() }, 
      { id: uuidv4(), role: 'Creator', createdAt: new Date(), updatedAt: new Date() } 
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OrganizationMembersRoles', null, {});
  }
};