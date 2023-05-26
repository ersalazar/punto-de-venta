//@ts-nocheck
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Item, SaleItem } from '../interfaces/Sale.ts';
import { getProducts } from '../firebase/ProductsFirebase.tsx';
import { getServices } from '../firebase/ServicesFirebase.tsx';
import { Select } from '@mui/material';


function ProductDropdown() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string>('');
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const fetchProducts = async () => {
      const products = (await getProducts()).docs;
      const services = (await getServices()).docs;
  
      const productsAndServices = products.concat(services);
      const productsId = products.map((product) => product.id);
  
      const salesItems = productsAndServices.map((item) => ({
        id: item.id,
        name: item.data().name,
        type: productsId.includes(item.id) ? 'product' : 'service'
      }));
  
      setProducts(salesItems);
    };
  
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedProductId(event.target.value);
    };
  
    return (
      <div>
        <label htmlFor="productDropdown">Select a product:</label>
        <select
          id="productDropdown"
          value={selectedProductId}
          onChange={handleSelectChange}
        >
          <option value="">Select an option</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        {selectedProductId && <p>Selected product ID: {selectedProductId}</p>}
      </div>
    );
  }
  
  export default ProductDropdown;
