import logo from './images/logo.png'
import header from './images/header.JPG'
import React, { useState, useEffect } from 'react';
import './index.css';
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
      let { data: skincare, error } = await supabase
      .from('skincare')
      .select('*')
      console.log('Skincare items:', skincare);
      if (error) {
        throw error;
      }
      setSkincareItems(skincare);
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
    <div>
      {/* Header section */}
      <header className="header bg-customYellow px-4 py-2 flex justify-between items-center border-b border-gray-200">
        <div className="logo">
          <img src={logo} alt="Logo" className="w-12" />
        </div>
        <div className="title-container w-full flex justify-center">
          <h1 className='imbue-title text-4xl font-bold'>BeautyHive</h1>
        </div>
      </header>
  
      {/* Introduction section */}
      <div className="intro-section bg-pink-100 flex overflow-hidden relative border-b-1 border-gray-200">
        <div className="intro-image flex items-center justify-center ml-4 w-1/2 py-6">
          <img src={header} alt="Header" className="rounded-lg w-full max-w-md" />
        </div>
        <div className="intro-content px-4 py-6 flex-grow flex flex-col justify-center text-center">
          <h2 className="one alice text-2xl font-semibold mb-4">Welcome to BeautyHive: Your One-Stop Beauty Destination!</h2>
          <p className="text-base text-gray-700 mb-4 font-serif">
            At BeautyHive, we've currated an extensive collection of the finest beauty products from repuatble brands that align with our values on quality, sustainability, and inclusivity. Effortlessy explore our vast array of beauty products. Whether you are searching for a specific product name or brand, our exhaustive list of products sourced from a renowned API has it all.
          </p>
          <h2 className="two alice text-2xl font-semibold mb-4 text-center">Where Makeup meets skincare.</h2>
          <p className="text-base text-gray-700 mb-4 font-serif">
            All products makeup and skincare related are based on up and coming trends so that you never miss out. Your jouney to beauty begins here!
          </p>
        </div>
      </div>

      {/* Makeup Products section */}
      <div className="makeup-section mt-2 bg-pink-100 relative border-b-1 border-gray-200 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="alice text-2xl font-semibold mb-4 flex justify-center">Makeup Products</h2>
          <p className="text-base text-gray-700 mb-4 font-serif flex text-center">
            Start searching for any products by name or brand and be able to choose which ever one you would like to purchase! (Ex: Lipstick, blush, concealer)
          </p>
          <div className="search-bar flex items-center mb-4 justify-center">
            <input
              type="text"
              placeholder="Search makeup products..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-3 py-2 border border-gray-300 rounded-md mr-2"
            />
            <button onClick={clearSearch} className="px-4 py-2 bg-blue-500 text-white rounded-md">Clear Search</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {searchTerm !== '' ? (
              filteredMakeupProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg p-3 shadow-md">
                  <a href={product.product_link} target="_blank" rel="noopener noreferrer">
                    <img src={product.image_link} alt={product.name} className="w-full h-auto rounded-md mb-2" />
                  </a>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-700 mb-2">Brand: {product.brand}</p>
                </div>
              ))
            ) : null}
          </div>
        </div>
      </div>

      {/* Skincare section */}
      <div className="skincare-section mt-2 bg-pink-100 py-3 px-4">
        <h2 className="alice text-2xl font-semibold mb-4 font-serif flex justify-center">Our Current Skincare Favorites...</h2>
        <p className="text-lg text-gray-700 mb-4 font-serif flex justify-center">
          Discover the latest skincare products that are trending right now.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {skincareItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg p-3 shadow-md">
              <h3 className="text-xl font-semibold font-serif">{item.product_name}</h3>
              <p className="text-sm text-gray-600 mt-2 font-serif">Brand: {item.brand_name}</p>
              <p className="text-sm text-gray-600 mt-2 font-serif">Shop At: {item.shop_at}</p>

            </div>
          ))}
        </div>
      </div>
  
      {/* Contact section */}
      <div className="contact-section mt-2 bg-pink-100 relative border-b-1 border-gray-200 py-6 px-4 bg-gray-100 text-center">
        <h2 className="alice text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-base text-gray-700 mb-2 font-serif">For any inquiries or assistance, feel free to reach out to us:</p>
        <ul className="text-base text-gray-700 font-serif">
          <li>Email: info@beautyhive.com</li>
          <li>Phone: +1 (123) 456-7890</li>
          <li>Address: 123 Beauty Avenue, Rhode, USA</li>
        </ul>
      </div>
  
      {/* Footer section */}
      <footer className="footer bg-customYellow px-4 py-1 flex justify-center items-center border-t border-gray-200">
        <p className="text-sm text-gray-700 font-serif">© 2024 BeautyHive USA,Inc. All rights reserved</p>
      </footer>
    </div>
  );
}
export default App;