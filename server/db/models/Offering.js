const db = require('../db_index');
const { UUID, UUIDV4, STRING, INTEGER } = require('sequelize');

const Offering = db.define('offering', {
  price: {
    type: INTEGER,
    defaultValue: 0,
  },
});

module.exports = Offering;
