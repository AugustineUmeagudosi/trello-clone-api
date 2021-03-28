const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrganizationMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrganizationMember.hasOne(models.OrganizationMembersRole, { foreignKey: 'roleId' });
      OrganizationMember.belongsTo(models.User, { foreignKey: 'memberId' });
      OrganizationMember.belongsTo(models.Organization, { foreignKey: 'organizationId' });
    }
  }
  OrganizationMember.init({
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4},
    organizationId: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'Organization', key: 'id'}},
    memberId: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'User', key: 'id'}},
    roleId: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'OrganizationMembersRole', key: 'id'}},
  }, {
    sequelize,
    modelName: 'OrganizationMember',
    timestamps: true
  });
  return OrganizationMember;
};