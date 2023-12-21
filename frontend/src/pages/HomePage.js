import Layout from "../components/Layout/Layout"
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Radio } from 'antd'
import { Prices } from "../components/Prices";
import { Memory } from "../components/Memory";
import { useNavigate } from "react-router-dom";
import '../styles/HomePage.css'
import { useCart } from "../context/Cart";
const HomePage = () => {

  // eslint-disable-next-line 
  const [products, setProducts] = useState([])
  const [radio, setRadio] = useState([]);
  const [memory, setMemory] = useState("");

  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false);

  const navigate = useNavigate()
  const [cart,setCart] = useCart()

  //get Total count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get('https://mobile-backend-taxn.onrender.com/api/v1/product/product-count')
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in getting category')
    }
  }

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page]);


  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://mobile-backend-taxn.onrender.com/api/v1/product/product-list/${page}`);
      setLoading(false);

      // setProducts([...products, ...data?.products]);
      setProducts((prevProducts) => {
        if (radio.length || memory) {
          return [...prevProducts, ...data?.products.filter(product => filterProduct(product))];
        }
        // If no filters, simply append new products
        return [...prevProducts, ...data?.products];
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };




  //getall products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://mobile-backend-taxn.onrender.com/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  useEffect(() => {
    if ( !radio.length || !memory) getAllProducts();
    // eslint-disable-next-line
  }, [ radio.length, memory]);

  useEffect(() => {
    if (radio.length || memory) filterProduct();
    // eslint-disable-next-line 
  }, [ radio, memory]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("https://mobile-backend-taxn.onrender.com/api/v1/product/product-filters", {
        radio,
        memory,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout>
      <div className="container-fluid row mt-3">
        <div className="col-md-2 filter-container">
          <h4 className="text-center filter-header">Filter By Memory</h4>
          <hr className="hr-line" />
          <div className="d-flex flex-column radio-group-container">
            <Radio.Group onChange={(e) => setMemory(e.target.value)}>
              {Memory?.map((p) => (
                <div key={p.value} className="radio-option">
                  <Radio value={p.value}>{p.label}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="price-filter-container">
            <h4 className="text-center filter-header">Filter By Price</h4>
            <hr className="hr-line" />
            <div className="d-flex flex-column radio-group-container">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id} className="radio-option">
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>

          <div className="reset-button-container">
            <hr className="hr-line" />
            <button className="btn btn-primary reset-button" onClick={() => window.location.reload()}>Reset Filters</button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">

            {products?.map((p) => (

              <div className="card m-2" style={{ width: "21rem" }}>
                <img
                  src={`https://mobile-backend-taxn.onrender.com/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  onClick={() => navigate(`/product/${p.slug}`)}
                  style={{ cursor: 'pointer' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">Price of product: <b>{p.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                  })}</b></p>
                  <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button
                    className="btn btn-secondary ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                  >
                    ADD TO CART
                  </button>

                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
          {console.log("Products Length:", products.length, "Total:", total)}
            {products.length!=0 && products && products.length < total && (
              < button className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1)
                }}

              >
                {loading ? "loading..." : "loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>


    </Layout>

  );
}

export default HomePage;