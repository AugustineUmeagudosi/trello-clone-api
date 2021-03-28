module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invitations', {
      id: { allowNull: false, primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
      projectId: { type: Sequelize.UUID, allowNull: true, foreignKey: true, references: {model: 'Projects'} },
      organizationId: { type: Sequelize.UUID, allowNull: true, foreignKey: true, references: {model: 'Organizations'} },
      inviteeEmail: { type: Sequelize.STRING, allowNull: false},
      invitationCode: { type: Sequelize.STRING, allowNull: false},
      roleId: { type: Sequelize.UUID, allowNull: false, foreignKey: true, references: {model: 'OrganizationMembersRoles'} },
      invitationStatus: { type: Sequelize.STRING, allowNull: true},
      invitedBy: { type: Sequelize.UUID, allowNull: false, foreignKey: true, references: {model: 'Users'} },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Invitations');
  }
};