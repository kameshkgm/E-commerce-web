
import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { AuthContext } from '../components/AuthContext';

const Products = () => {
  const { email } = useContext(AuthContext);
  const isAdmin = email === "admin@gmail.com";
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
    outOfStock: false,
  });
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:3500/products/");
      const products = await response.json();
      setData(products);
      setFilter(products);
      setLoading(false);
    };
    getProducts();
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      // Calculate the next ID value based on the existing data
      const nextId = data.length + 1;
      // Update the newProduct state with the next ID value
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        id: nextId.toString(), // Convert nextId to string
      }));
    }
  }, [data]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3500/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const addedProduct = await response.json();
      setData([...data, addedProduct]);
      setFilter([...filter, addedProduct]);
      setNewProduct({
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rating: { rate: 0, count: 0 },
        outOfStock: false,
      });
      setShowForm(false); // Hide the form after adding product
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleOutOfStock = async (id) => {
    try {
      const response = await fetch(`http://localhost:3500/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ outOfStock: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();
      const updatedProducts = data.map((product) =>
        product.id === id ? updatedProduct : product
      );
      setData(updatedProducts);
      setFilter(updatedProducts);
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  const handleInStock = async (id) => {
    try {
      const response = await fetch(`http://localhost:3500/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ outOfStock: false }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();
      const updatedProducts = data.map((product) =>
        product.id === id ? updatedProduct : product
      );
      setData(updatedProducts);
      setFilter(updatedProducts);
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  const showAddProductForm = () => {
    setShowForm(true); // Show the form when the button is clicked
  };

  // Rendered component for loading state
  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  // Filter products by category
  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  // Rendered component for displaying products
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Passive components")}
          >
            Passive components
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Active components")}
          >
            Active components
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Battery")}
          >
            Battery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Storage devices")}
          >
            Storage devices
          </button>
        </div>
        <div className="row">
          {filter.map((product) => (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100">
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">
                      ₹ {product.price}
                    </li>
                  </ul>
                  {product.outOfStock ? (
                    <div className="card-body text-danger">
                      Out of Stock
                      {isAdmin && (
                        <button
                          className="btn btn-success m-1"
                          onClick={() => handleInStock(product.id)}
                        >
                          Make in Stock
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="card-body">
                      <Link
                        to={"/product/" + product.id}
                        className="btn btn-dark m-1"
                      >
                        Buy Now
                      </Link>
                      {!product.outOfStock && (
                        <button
                          className="btn btn-dark m-1"
                          onClick={() => addProduct(product)}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  )}
                  {isAdmin && (
                    <div className="card-body">
                      <button
                        className="btn btn-warning m-1"
                        onClick={() => handleOutOfStock(product.id)}
                      >
                        Out of Stock
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        {isAdmin && (
          <div className="row justify-content-start mb-3">
            <div className="col-12">
              <button
                onClick={showAddProductForm}
                className="btn btn-primary"
              >
                Add New Product
              </button>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
        {showForm && isAdmin && (
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleAddProduct}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={newProduct.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                className="form-control"
                id="category"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                 required
                >
                <option value="">Select Category</option>
                 <option value="Passive components">Passive components</option>
                <option value="Active components">Active components</option>
                  <option value="Battery">Battery</option>
                      <option value="Storage devices">Storage devices</option>
                          </select>
                      </div>

                <div className="form-group">
                  <label htmlFor="image">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    name="image"
                    value={newProduct.image}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rating">Rating</label>
                  <input
                    type="text"
                    className="form-control"
                    id="rating"
                    name="rating"
                    value={newProduct.rating.rate}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        rating: { ...newProduct.rating, rate: e.target.value },
                      })
                    }
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
