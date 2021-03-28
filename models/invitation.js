const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invitation.hasOne(models.Project, { foreignKey: 'projectId' });
      Invitation.hasOne(models.OrganizationMembersRole, { foreignKey: 'roleId' });
      Invitation.belongsTo(models.Organization, { foreignKey: 'organizationId' });
    }
  }
  Invitation.init({
    projectId: { type: DataTypes.UUID, allowNull: true, foreignKey: true, references: {model: 'Projects'} },
    organizationId: { type: DataTypes.UUID, allowNull: true, foreignKey: true, references: {model: 'Organizations'} },
    inviteeEmail: { type: DataTypes.STRING, allowNull: false},
    invitationCode: { type: DataTypes.STRING, allowNull: false},
    roleId: { type: DataTypes.UUID, allowNull: false, foreignKey: true, references: {model: 'OrganizationMembersRoles'} },
    invitationStatus: { type: DataTypes.STRING, allowNull: true},
    invitedBy: { type: DataTypes.UUID, allowNull: false, foreignKey: true, references: {model: 'Users'} },
  }, {
    sequelize,
    modelName: 'Invitation',
    timestamps: true
  });
  return Invitation;
};