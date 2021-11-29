const { Sequelize, DataTypes } = require("sequelize");
const { database } = require("../db");
const Users = require("./Users");

const Vaccine = database.define("Vaccine", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expected_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  vaccinated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Vaccine.belongsTo(Users, {
  foreignKey: {
    name: "userid",
    allowNull: false,
  },
});

Users.hasMany(Vaccine, {
  foreignKey: "userid",
});

Vaccine.sync();

module.exports = Vaccine;
