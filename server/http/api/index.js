const { Router } = require('express');
const {
  models: { Product, Company, Offering },
} = require('../../db/models/index');

const apiRouter = Router();

// An example route that the client requests to check if the app is healthy.
apiRouter.get('/health', (req, res) => {
  res.send({
    message: 'Application is awake and healthy',
  });
});

// TODO: Does your api want more routes? Why not here?
apiRouter.get('/companies', async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.send(companies);
  } catch (e) {
    res.status(500).send(e);
  }
});

apiRouter.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
});

apiRouter.get('/offerings', async (req, res) => {
  try {
    const offerings = await Offering.findAll();
    res.send(offerings);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = apiRouter;
