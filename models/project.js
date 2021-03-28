const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.User, { foreignKey: 'createdBy' });
      Project.belongsTo(models.Organization, { foreignKey: 'organizationId' });
      Project.hasMany(models.Invitation, { foreignKey: 'invitedBy' });
    }
  }
  Project.init({
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4},
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    slug: { type: DataTypes.STRING, allowNull: false },
    organizationId: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'Organization'} },
    createdBy: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, references: {model: 'User', key: 'id'} },
    deleted_at: { type: DataTypes.DATE, allowNull: true, },
  }, {
    sequelize,
    modelName: 'Project',
    timestamps: true
  });
  return Project;
};