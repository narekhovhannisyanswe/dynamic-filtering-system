import { createContext, useState, useEffect, useContext } from 'react';

const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    categories: [], brands: [], pricingRange: { min: 0, max: 0 }, rating: 0,
  });

  const updateFilters = (updatedFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...updatedFilters }));
    localStorage.setItem('filters', JSON.stringify({ ...filters, ...updatedFilters }));
  };

  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');

    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);

  return (<FilterContext.Provider value={{ filters, updateFilters }}>
    {children}</FilterContext.Provider>);
}

export const useFilters = () => useContext(FilterContext);
