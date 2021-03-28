module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Organizations', {
      id: { allowNull: false, primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
      slug: { type: Sequelize.STRING, allowNull: false, },
      name: { type: Sequelize.STRING, allowNull: false, },
      createdBy: { type: Sequelize.UUID, allowNull: false, foreignKey: true, references: {model: 'Users'} },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Organizations');
  }
};