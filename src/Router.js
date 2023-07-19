import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "./Components/ProductList";
import Product from "./Components/Product";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
}

export default Router;
