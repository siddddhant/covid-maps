'use strict';
module.exports = (sequelize, DataTypes) => {
  const StoreInfo = sequelize.define('StoreInfo', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    place_id: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    locality: DataTypes.STRING,
    country: DataTypes.STRING,
    created_at: DataTypes.TIME,
    updated_at: DataTypes.TIME
  }, {});
  StoreInfo.associate = function(models) {
    // associations can be defined here
  };
  return StoreInfo;
};