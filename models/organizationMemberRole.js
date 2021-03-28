const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrganizationMembersRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // OrganizationMembersRole.hasMany(models.OrganizationMember, { foreignKey: 'roleId' });
      // OrganizationMembersRole.hasOne(models.Invitation, { foreignKey: 'roleId' });
    }
  }
  OrganizationMembersRole.init({
    role: { type: DataTypes.STRING, allowNull: false},
  }, {
    sequelize,
    modelName: 'OrganizationMembersRole',
    timestamps: true
  });
  return OrganizationMembersRole;
};