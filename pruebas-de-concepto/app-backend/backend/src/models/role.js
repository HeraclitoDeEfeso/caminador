'use strict';

module.exports = (sequelize, DataTypes) => {
  let role = sequelize.define('role', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
  role.USER_ROLE = {
    doctor: 1,
    asistente: 2,
    paciente: 3,
  };
  role.associate = (models) => {
    role.hasMany(models.user,
      {foreignKey: {name: 'roleId'}}
    );
  };
  return role;
};