const db = require('../db_index');
const { UUID, UUIDV4, STRING } = require('sequelize');

const Company = db.define('company', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Company;
