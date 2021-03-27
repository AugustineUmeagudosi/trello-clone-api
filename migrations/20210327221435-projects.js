module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Projects', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: true },
      organizationId: { type: Sequelize.INTEGER, allowNull: true, foreignKey: true, references: {model: 'Organizations', key: 'id'} },
      slug: { type: Sequelize.STRING, allowNull: false },
      createdBy: { type: Sequelize.INTEGER, allowNull: false, foreignKey: true, references: {model: 'Users', key: 'id'} },
      deleted_at: { type: Sequelize.DATE, allowNull: true, },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Projects');
  }
};