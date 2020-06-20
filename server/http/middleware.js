const express = require('express');
const path = require('path');

// A way to pass in a parameter in a .env file.
const whiteListedUrl = process.env.WHITELISTED_URL || '*';

// Allow CORS - this enables us to let other client applications not served from the same port communicate with us. This can be configured.
const customCORSMiddleware = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', whiteListedUrl);
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.set('Vary', 'Origin');

  next();
};

// TODO: You could add any middleware into here.
// Combine all the middleware in an array.
const standardMiddleware = [
  express.json(),
  customCORSMiddleware,
  express.static(path.join(__dirname, '../../dist')),
  express.static(path.join(__dirname, '../../client/template')),
];

// Put them all together into a single function.
const composeMiddleware = (app, middleware) => {
  middleware.forEach((m) => {
    app.use(m);
  });
};

module.exports = { composeMiddleware, standardMiddleware };
