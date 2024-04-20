import logo from './images/logo.png'
import React, { useState, useEffect } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios'; 
import { supabase } from './supabaseClient';

function App() {
  const [skincareItems, setSkincareItems] = useState([]);
  const [makeupProducts, setMakeupProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSkincareItems();
  }, []);
  
  useEffect(() => {
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const clearSearch = () => {
    setSearchTerm('');
  };
  const filteredMakeupProducts = makeupProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <body>
    <div>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="title-container">
          <h1 className='imbue-title'>BeautyHive</h1>
        </div>
      </header>
  
      <div className="content">
        <h2>Makeup Products</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search makeup products..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={clearSearch}>Clear Search</button>
        </div>
        <ul>
          {searchTerm !== '' ? (
            filteredMakeupProducts.map(product => (
              <li key={product.id}>
                <p>Product Name: {product.name}</p>
                <p>Brand: {product.brand}</p>
                {/* Render other makeup product details */}
              </li>
            ))
          ) : (
            <p>Please enter a search term to find makeup products (brand or product name ONLY).</p>
          )}
        </ul>
      </div>
    </div>
    </body>
  );  
}


export default App;