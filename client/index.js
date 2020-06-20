import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Route, HashRouter, Link, Switch, Redirect } from 'react-router-dom';
import Axios from 'axios';

const Companies = ({ products, companies, offerings }) => {
  const processed = companies.map((company) => {
    return {
      ...company,
      offered: offerings
        .filter((offering) => offering.companyId === company.id)
        .map((offering) => {
          return {
            ...offering,
            product: products.find(
              (product) => product.id === offering.productId
            ),
          };
        }),
    };
  });
  return (
    <ul>
      {processed.map((company) => (
        <li key={company.id}>
          <h2>{company.name}</h2>
          Offering:
          <ul>
            {company.offered.map((offer) => (
              <li key={offer.id}>
                {' '}
                {offer.product.name} at {offer.price} (suggestedPrice:{' '}
                {offer.product.suggestedPrice})
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
const Products = ({ products, companies, offerings }) => {
  const processed = products.map((product) => {
    return {
      ...product,
      offered: offerings
        .filter((offering) => offering.productId === product.id)
        .map((offering) => {
          return {
            ...offering,
            company: companies.find(
              (company) => company.id === offering.companyId
            ),
          };
        }),
    };
  });
  return (
    <ul>
      {processed.map((product) => (
        <li key={product.id}>
          <h2>{product.name}</h2> ${product.suggestedPrice}
          <div>{product.description}</div>
          Offered By: {product.offered.length}
          <ul>
            {product.offered.map((offer) => (
              <li key={offer.id}>
                {' '}
                {offer.company.name} at {offer.price}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

const Nav = ({ companies, products, path }) => {
  const links = [
    { to: 'companies', text: `Companies (${companies.length})` },
    { to: 'products', text: `Products (${products.length})` },
  ];
  return (
    <nav>
      <h1 id="title">ACME OFFERINGS * REACT API</h1>
      <div>
        {links.map((link, idx) => (
          <Link
            className={path.slice(1) === link.to ? 'selected' : ''}
            key={idx}
            to={link.to}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </nav>
  );
};

const API = '/api/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      products: [],
      offerings: [],
    };
  }

  componentDidMount() {
    Promise.all(
      ['companies', 'products', 'offerings'].map((entity) =>
        Axios.get(`${API}${entity}`)
      )
    )
      .then((responses) => responses.map((response) => response.data))
      .then(([companies, products, offerings]) =>
        this.setState({ companies, products, offerings })
      );
  }

  render() {
    const { companies, products, offerings } = this.state;
    return (
      <HashRouter>
        <Route
          render={({ location }) => (
            <Nav
              path={location.pathname}
              products={products}
              companies={companies}
            />
          )}
        />
        <Switch>
          <Route
            path="/products"
            render={() => (
              <Products
                products={products}
                offerings={offerings}
                companies={companies}
              />
            )}
          />
          <Route
            path="/companies"
            render={() => (
              <Companies
                products={products}
                offerings={offerings}
                companies={companies}
              />
            )}
          />
          <Redirect to="/companies" />
        </Switch>
      </HashRouter>
    );
  }
}

const app = document.querySelector('#app');
render(<App />, app);
