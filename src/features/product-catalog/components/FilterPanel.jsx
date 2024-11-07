import { memo, useState, useEffect } from 'react';
import { useProducts } from '@/features/product-catalog/context/ProductContext';
import { SORT_OPTIONS } from '@/features/product-catalog/constants';
import useDebounce from '@/features/product-catalog/hooks/useDebounce';

const FilterInput = memo(
  function FilterInput({ label, value, onChange, type = 'text', id }) {
    const [localValue, setLocalValue] = useState(value);
    const debouncedValue = useDebounce(localValue, 500);

    // Reset localValue when value prop changes
    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    useEffect(() => {
      onChange(debouncedValue);
    }, [debouncedValue]);

    const handleChange = (e) => {
      const val = type === 'number' ? Number(e.target.value) : e.target.value;
      setLocalValue(val);
    };

    return (
      <div
        className="flex w-full flex-wrap items-center justify-between gap-2 rounded border border-gray-300 bg-gray-200 p-2 md:w-[49%] xl:w-full">
        <label className="flex-1 grow-[1]" htmlFor={id}>{label}</label>
        <input
          className="flex-1 grow-[3] rounded p-1 outline-none"
          value={localValue}
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
          type={type}
          name={id}
          id={id}
        />
      </div>
    );
  });

const SortSelect = memo(function SortSelect({ value, onChange }) {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2 rounded border border-gray-300 bg-gray-200 p-2 md:w-auto">
      <label className="flex-1" htmlFor="sort-by">Sort By</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 rounded p-[2px] text-xs outline-none"
        name="sort-by"
        id="sort-by"
      >
        <option value=""></option>
        {Object.values(SORT_OPTIONS).map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
});

export default function FilterPanel() {
  const {
    filters,
    handleNameChange,
    handleBrandChange,
    handleCategoryChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleMinRatingChange,
    sortBy,
    updateSortBy,
    resetAll,
  } = useProducts();

  const { name, category, brand, minRating, minPrice, maxPrice } = filters;

  const filterInputs = [
    { label: 'Name', value: name, onChange: handleNameChange, id: 'search-by-name' },
    { label: 'Brand', value: brand, onChange: handleBrandChange, id: 'search-by-brand' },
    { label: 'Category', value: category, onChange: handleCategoryChange, id: 'search-by-category' },
    { label: 'Min Rate', value: minRating, onChange: handleMinRatingChange, type: 'number', id: 'min-rating' },
    { label: 'Min Price', value: minPrice, onChange: handleMinPriceChange, type: 'number', id: 'min-price' },
    { label: 'Max Price', value: maxPrice, onChange: handleMaxPriceChange, type: 'number', id: 'max-price' },
  ];

  return (
    <div
      className="flex flex-1 flex-wrap gap-2 whitespace-nowrap rounded bg-gray-100 p-4 text-center shadow-xl xl:flex-col xl:gap-8 xl:rounded-xl">

      {filterInputs.map(input => (
        <FilterInput key={input.id} {...input} />
      ))}

      <SortSelect value={sortBy} onChange={updateSortBy}/>
        
      <button className="rounded border bg-blue-900 p-2 font-bold text-white" onClick={resetAll}>
                Reset All
      </button>
    </div>
  );
}
