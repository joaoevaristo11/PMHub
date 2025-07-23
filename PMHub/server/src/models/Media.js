const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Media extends Model {}

Media.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('movie', 'series', 'book', 'game'),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Media',
  tableName: 'media',
  timestamps: true,
});

module.exports = Media;