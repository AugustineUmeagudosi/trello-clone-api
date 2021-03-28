module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrganizationMembers', {
      id: { allowNull: false, primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
      organizationId: { type: Sequelize.UUID, allowNull: true, foreignKey: true, references: {model: 'Organizations', key: 'id'}},
      memberId: { type: Sequelize.UUID, allowNull: true, foreignKey: true, references: {model: 'Users', key: 'id'}},
      roleId: { type: Sequelize.UUID, allowNull: false, foreignKey: true, references: {model: 'OrganizationMembersRoles'}},
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrganizationMembers');
  }
};