import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const result = await axios.get("http://localhost:4001/products");
    console.log(result.data);
    setProducts(result.data.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    getProducts();
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-preview">
              <img
                src={product.image}
                alt={product.name}
                width="350"
                height="350"
              />
            </div>
            <div className="product-detail">
              <h1>Product name: {product.name}</h1>
              <h2>Product price: {product.price} Baht</h2>
              <p>Product description: {product.description}</p>
            </div>

            <button
              onClick={() => deleteProduct(product.id)}
              className="delete-button"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
