'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  GENERATING_PRODUCTS_COUNT,
  FILTER_INITIAL_STATE,
  SORT_INITIAL_STATE,
  ITEMS_PER_PAGE,
} from '@/features/product-catalog/constants';
import { filterProducts, generateMockProducts, sortProducts } from '@/features/product-catalog/utils';
import usePersistedState from '@/features/product-catalog/hooks/usePersistedState';

const ProductContext = createContext(null);

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [filters, updateFilters] = usePersistedState('filters', FILTER_INITIAL_STATE);
  const [sortBy, updateSortBy] = usePersistedState('sortBy', SORT_INITIAL_STATE);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize mock products
  const memoizedMockProducts = useMemo(() => generateMockProducts(GENERATING_PRODUCTS_COUNT), []);

  // Memoize filtered and sorted products
  const processProducts = useCallback(() => {
    setIsLoading(true);
    const filteredProducts = filterProducts(memoizedMockProducts, filters);
    const sortedProducts = sortProducts(filteredProducts, sortBy);
    setProducts(sortedProducts);
    setIsLoading(false);
  }, [memoizedMockProducts, filters, sortBy]);

  // Initialize products on mount
  useEffect(() => {
    const timer = setTimeout(processProducts, 300);
    return () => clearTimeout(timer);
  }, [processProducts]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const totalPages = useMemo(() =>
    Math.ceil(products.length / ITEMS_PER_PAGE),
  [products],
  );

  useEffect(() => setCurrentPage(1), [filters, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filterHandlers = useMemo(() => ({
    handleNameChange: (name) => updateFilters({ ...filters, name }),
    handleBrandChange: (brand) => updateFilters({ ...filters, brand }),
    handleCategoryChange: (category) => updateFilters({ ...filters, category }),
    handleMinRatingChange: (minRating) => updateFilters({ ...filters, minRating }),
    handleMinPriceChange: (minPrice) => updateFilters({ ...filters, minPrice }),
    handleMaxPriceChange: (maxPrice) => updateFilters({ ...filters, maxPrice }),
  }), [filters, updateFilters]);

  const resetAll = useCallback(() => {
    updateFilters(FILTER_INITIAL_STATE);
    updateSortBy(SORT_INITIAL_STATE);
  }, [updateFilters, updateSortBy]);

  const value = useMemo(() => ({
    filters,
    ...filterHandlers,
    sortBy,
    updateSortBy,
    isLoading,
    resetAll,
    paginatedProducts,
    currentPage,
    totalPages,
    handlePageChange,
  }), [products, filters, filterHandlers, sortBy, updateSortBy, isLoading, resetAll]);

  return (<ProductContext.Provider value={value}>{children}</ProductContext.Provider>);
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
