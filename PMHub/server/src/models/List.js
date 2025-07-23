const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class List extends Model {}

List.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mediaItems: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'List',
  tableName: 'lists',
  timestamps: true,
});

module.exports = List;