module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Projects', {
      id: { allowNull: false, primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: true },
      organizationId: { type: Sequelize.UUID, allowNull: true, foreignKey: true, references: {model: 'Organizations'} },
      slug: { type: Sequelize.STRING, allowNull: false },
      createdBy: { type: Sequelize.UUID, allowNull: false, foreignKey: true, references: {model: 'Users'} },
      deleted_at: { type: Sequelize.DATE, allowNull: true, },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Projects');
  }
};