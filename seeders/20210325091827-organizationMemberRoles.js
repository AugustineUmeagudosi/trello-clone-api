const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('OrganizationMembersRoles', [
      { role: 'Member', createdAt: new Date(), uuid: uuidv4(), updatedAt: new Date() }, 
      { role: 'Supervisor', createdAt: new Date(), uuid: uuidv4(), updatedAt: new Date() }, 
      { role: 'Creator', createdAt: new Date(), uuid: uuidv4(), updatedAt: new Date() } 
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OrganizationMembersRoles', null, {});
  }
};