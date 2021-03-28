module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Organizations', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      uuid: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4},
      slug: { type: Sequelize.STRING, allowNull: false, },
      name: { type: Sequelize.STRING, allowNull: false, },
      createdBy: { type: Sequelize.INTEGER, allowNull: false, foreignKey: true, references: {model: 'Users', key: 'id'} },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Organizations');
  }
};