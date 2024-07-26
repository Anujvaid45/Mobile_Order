import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import '../styles/welcome.css';

const Welcome = () => {
  return (
    <Layout>
      <div>

        {/* Hero Section */}
        <section id="home">
          <div className="hero-content">
            <h1>Welcome to व्यापार</h1>
            <p>
              Explore a world of innovation and excellence. Discover amazing
              products and services tailored to suit your needs.
            </p>
            <Link to="/products">
              <button>Explore Products</button>
            </Link>
          </div>
        </section>

        {/* Featured Products Section */}
        <section id="products">
          <h2 style={{color:'white'}}>Featured Products</h2>
          <br />
          <div className="featured-products">
            {/* Add featured product cards or images here */}
            <div className="product-card">
              <img src="/images/apple-iphone-15.jpg" alt="Product 1"  style={{cursor:'pointer'}}/>
              <h3>apple-iphone-15</h3>
            </div>
            <div className="product-card">
              <img src="/images/apple-iphone-15-pro-max.jpg" alt="Product 2"  style={{cursor:'pointer'}}/>
              <h3>apple-iphone-15-pro-max</h3>
            </div>
            <div className="product-card">
              <img src="/images/apple-iphone-14-pro.jpg" alt="Product 3"  style={{cursor:'pointer'}}/>
              <h3>apple-iphone-14-pro</h3>
            </div>
            <div className="product-card">
              <img src="images/samsung-galaxy-s23-fe.jpg" alt="Product 3" style={{cursor:'pointer'}}/>
              <h3>samsung-galaxy-s23</h3>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Welcome;
