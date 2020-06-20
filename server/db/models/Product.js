const db = require('../db_index');
const { UUID, UUIDV4, STRING, INTEGER } = require('sequelize');

const Product = db.define('product', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  price: {
    type: INTEGER,
    allowNull: false,
  },
});

module.exports = Product;
