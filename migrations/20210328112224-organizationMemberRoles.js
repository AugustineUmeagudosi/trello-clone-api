module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrganizationMembersRoles', {
      id: { allowNull: false, primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
      role: { type: Sequelize.STRING, allowNull: false},
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrganizationMembersRoles');
  }
};