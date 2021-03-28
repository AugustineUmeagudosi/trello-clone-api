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
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    organizationId: { type: DataTypes.UUID, allowNull: true, foreignKey: true, references: {model: 'Organization'} },
    slug: { type: DataTypes.STRING, allowNull: false },
    createdBy: { type: DataTypes.UUID, allowNull: false, foreignKey: true, references: {model: 'User'} },
    deleted_at: { type: DataTypes.DATE, allowNull: true, },
  }, {
    sequelize,
    modelName: 'Project',
    timestamps: true
  });
  return Project;
};