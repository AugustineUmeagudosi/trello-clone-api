const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Organization.belongsTo(models.User, { foreignKey: 'createdBy' });
      Organization.hasMany(models.Project, { foreignKey: 'organizationId' });
      Organization.hasMany(models.Invitation, { foreignKey: 'organizationId' });
      Organization.hasMany(models.OrganizationMember, { foreignKey: 'organizationId' });
    }
  }
  Organization.init({
    slug: { type: DataTypes.STRING, allowNull: false, },
    name: { type: DataTypes.STRING, allowNull: false, },
    createdBy: { type: DataTypes.UUID, allowNull: false, foreignKey: true, references: {model: 'User'} },
  }, {
    sequelize,
    modelName: 'Organization',
    timestamps: true
  });
  return Organization;
};