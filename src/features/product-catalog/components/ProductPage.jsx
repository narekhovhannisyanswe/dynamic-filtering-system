'use client';

import { useProducts } from '@/features/product-catalog/context/ProductContext';
import ProductCatalog from '@/features/product-catalog/components/ProductCatalog';
import FilterPanel from '@/features/product-catalog/components/FilterPanel';
import Spinner from '@/shared/components/Spinner';
import Pagination from '@/features/product-catalog/components/Pagination';

export default function ProductPage() {
  const { isLoading, currentPage, totalPages, handlePageChange } = useProducts();

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <>
      <div className="flex flex-col gap-4 py-4 xl:flex-row xl:gap-8 xl:py-8">
        <FilterPanel/>
        <ProductCatalog/>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
          
    </>
  );
}
