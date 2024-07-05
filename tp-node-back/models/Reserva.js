const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Ubicacion = require('./Ubicacion');

const Reserva = sequelize.define('Reserva', {
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  hora_fin: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  tiempo_permanencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Usuario.hasMany(Reserva, { foreignKey: 'usuario_id' });
Reserva.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Ubicacion.hasMany(Reserva, { foreignKey: 'ubicacion_id' });
Reserva.belongsTo(Ubicacion, { foreignKey: 'ubicacion_id' });

module.exports = Reserva;
