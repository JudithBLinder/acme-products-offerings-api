const Product = require('./Product');
const Company = require('./Company');
const Offering = require('./Offering');
const db = require('../db_index');

Product.belongsToMany(Company, { through: Offering });
Company.belongsToMany(Product, { through: Offering });

module.exports = {
  models: { Product, Company, Offering },
  db,
};
