'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_register extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_register.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    country: DataTypes.STRING,
    company_name: DataTypes.STRING,
    company_name_en: DataTypes.STRING,
    company_name_jp: DataTypes.STRING,
    booking_count: DataTypes.TINYINT,
    user_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    allow: DataTypes.INTEGER,
    operator: DataTypes.STRING,
    highlight: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user_register',
  });
  return user_register;
};