import React, { useEffect, useState } from "react";
import { Products } from "./Products";
import { useAnimalContext } from "../../Context/AnimalContext";

export const ProductsContainer = ({ isAllAnimal }) => {
  const { productsData, maxProductsPages, updateProducts, currentProductPage, setCurrentProductPage } = useAnimalContext();


  useEffect(() => {
    setCurrentProductPage(1);
  }, [isAllAnimal]);

  const handleIncrementPage = () => {
    setCurrentProductPage((prev) => (prev += 1));
    updateProducts(currentProductPage + 1)
  };

  const handleDecrementPage = () => {
    setCurrentProductPage((prev) => (prev -= 1));
    updateProducts(currentProductPage - 1)
  };

  return (
    <Products
      products={productsData}
      handleIncrementPage={handleIncrementPage}
      handleDecrementPage={handleDecrementPage}
      currentPage={currentProductPage}
      maxPages={maxProductsPages}
    />
  );
};
