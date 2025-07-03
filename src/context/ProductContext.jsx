import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem('products')) || [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length === 0) {
        const res = await axios.get('https://dummyjson.com/products');
        const localProducts = JSON.parse(localStorage.getItem('products')) || [];
        const merged = [...res.data.products, ...localProducts.filter(p => p.local)];
        setProducts(merged);
      }
    };
    fetchProducts();
  }, []);


  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: product.id || Date.now(), local: true }]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);