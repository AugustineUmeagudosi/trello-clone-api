const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Organization, { foreignKey: 'createdBy' });
      // User.hasMany(models.Invitation, { foreignKey: 'invitedBy' });
      // User.hasMany(models.Project, { foreignKey: 'createdBy' });
      // User.belongsToMany(models.Organization, { through: models.OrganizationMember }, { foreignKey: 'memberId' });
      // User.hasMany(models.OrganizationMember, { foreignKey: 'memberId' });
    }
  }
  User.init({
    name: { type: DataTypes.STRING, allowNull: false, },
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    password: { type: DataTypes.STRING, allowNull: false, },
    deleted_at: { type: DataTypes.DATE, allowNull: true, },
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true
  });
  return User;
};