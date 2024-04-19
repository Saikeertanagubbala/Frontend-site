import React, { useState, useEffect } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios'; 
import { supabase } from './supabaseClient';


function App() {
  const [skincareItems, setSkincareItems] = useState([]);
  const [makeupProducts, setMakeupProducts] = useState([]);

  useEffect(() => {
    fetchSkincareItems();
    fetchMakeupProducts();
  }, []);

  const fetchSkincareItems = async () => {
    try {
      let { data, error } = await supabase.from('skincare').select('*');
      if (error) {
        throw error;
      }
      setSkincareItems(data);
    } catch (error) {
      console.error('Error fetching skincare items:', error.message);
    }
  };
  const fetchMakeupProducts = async () => {
    try {
      const response = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json');
      setMakeupProducts(response.data);
    } catch (error) {
      console.error('Error fetching makeup products:', error.message);
    }
  };

  return (
		<div>
      <h1>Skincare Items</h1>
      <ul>
        {skincareItems.map(item => (
          <li key={item.id}>
            <p>Product Name: {item.product_name}</p>
            <p>Brand: {item.brand_name}</p>
            <p>Shop At: {item.shop_at}</p>
            {/* Render other skincare item details */}
          </li>
        ))}
      </ul>

      <h1>Makeup Products</h1>
      <ul>
        {makeupProducts.map(product => (
          <li key={product.id}>
            <p>Product Name: {product.name}</p>
            <p>Brand: {product.brand}</p>
            {/* Render other makeup product details */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;   