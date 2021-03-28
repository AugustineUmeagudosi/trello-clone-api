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
      // Invitation.hasOne(models.Organization, { foreignKey: 'organizationId' });
      Invitation.hasOne(models.OrganizationMembersRole, { foreignKey: 'roleId' });      
    }
  }
  Invitation.init({
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4},
    projectId: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'Projects', key: 'id'} },
    organizationId: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'Organizations', key: 'id'}},
    inviteeEmail: { type: DataTypes.STRING, allowNull: false},
    invitationCode: { type: DataTypes.STRING, allowNull: false},
    roleId: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'OrganizationMembersRoles', key: 'id'}},
    invitationStatus: { type: DataTypes.STRING, allowNull: true},
    invitedBy: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, references: {model: 'Users', key: 'id'}}
  }, {
    sequelize,
    modelName: 'Invitation',
    timestamps: true
  });
  return Invitation;
};