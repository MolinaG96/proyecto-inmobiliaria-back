const { Sequelize } = require("sequelize");
const db = require("../db");

class Properties extends Sequelize.Model {}

Properties.init(
  {
    type: { type: Sequelize.INTEGER, allowNull: false },
    price: { type: Sequelize.INTEGER, allowNull: false },
    country: { type: Sequelize.STRING, allowNull: false },
    neighborhood: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: false },
    size: { type: Sequelize.INTEGER, allowNull: false },
    bedrooms: { type: Sequelize.INTEGER, allowNull: false },
    bathrooms: { type: Sequelize.INTEGER, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: false },
  },
  { sequelize: db, modelName: "properties" }
);

module.exports = Properties;
