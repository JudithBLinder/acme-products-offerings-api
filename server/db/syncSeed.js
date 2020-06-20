const {
  models: { Product, Company, Offering },
  db,
} = require('./models/index');
const chalk = require('chalk');

const products = [
  {
    name: 'Foo',
    price: 3,
  },
  {
    name: 'Bazz',
    price: 6,
  },
  {
    name: 'Jelly',
    price: 7,
  },
];

const companies = [
  {
    name: 'Hello',
  },
  {
    name: 'World',
  },
  {
    name: 'Josh',
  },
];

const offerings = [];
const createOfferings = async function () {
  const companies = await Company.findAll();
  const products = await Product.findAll();

  companies.forEach((comp) => {
    products.forEach((pro) => {
      offerings.push({
        companyId: comp.get().id,
        productId: pro.get().id,
      });
    });
  });
};

createOfferings();

const seed = async () => {
  await Promise.all(products.map((pro) => Product.create(pro)));
  await Promise.all(companies.map((comp) => Company.create(comp)));
  await Promise.all(
    offerings.map((offer) => Offering.create(offer))
  ).catch((e) => console.log(e));

  console.log(chalk.greenBright('Done seeding'));
};

const syncSeed = async (force = false) => {
  try {
    await db.sync({ force });
    if (force) seed();
    console.log(chalk.yellow('DB connected'));
  } catch (e) {
    console.log(chalk.red('Error connecting to DB'));
    throw e;
  }
};

module.exports = syncSeed;
