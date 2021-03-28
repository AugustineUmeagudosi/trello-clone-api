const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrganizationMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrganizationMember.belongsTo(models.User, { foreignKey: 'memberId' });
      OrganizationMember.belongsTo(models.Organization, { foreignKey: 'organizationId' });
      OrganizationMember.belongsTo(models.OrganizationMembersRole, { foreignKey: 'roleId' });
    }
  }
  OrganizationMember.init({
    organizationId: { type: DataTypes.UUID, allowNull: true, foreignKey: true, references: {model: 'Organization', key: 'id'}},
    memberId: { type: DataTypes.UUID, allowNull: true, foreignKey: true, references: {model: 'User', key: 'id'}},
    roleId: { type: DataTypes.UUID, allowNull: false, foreignKey: true, references: {model: 'OrganizationMembersRole'}},
  }, {
    sequelize,
    modelName: 'OrganizationMember',
    timestamps: true
  });
  return OrganizationMember;
};