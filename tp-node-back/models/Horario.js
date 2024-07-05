const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ubicacion = require('./Ubicacion');

const Horario = sequelize.define('Horario', {
  dia_semana: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hora_apertura: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  hora_cierre: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

Ubicacion.hasMany(Horario, { foreignKey: 'ubicacion_id' });
Horario.belongsTo(Ubicacion, { foreignKey: 'ubicacion_id' });

module.exports = Horario;
