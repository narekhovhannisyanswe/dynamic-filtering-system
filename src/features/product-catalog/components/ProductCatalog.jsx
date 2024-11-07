import ProductCard from '@/features/product-catalog/components/ProductCard';
import { useProducts } from '@/features/product-catalog/context/ProductContext';

export default function ProductCatalog() {
  const { paginatedProducts } = useProducts();

  if (paginatedProducts.length === 0) {
    return <div className="flex-1 grow-[4] text-center text-2xl">No products found.</div>;
  }

  return (
    <ul className=" grid flex-1 grow-[4]  grid-cols-4 gap-4 md:grid-cols-8 xl:gap-8 2xl:grid-cols-12">
      {paginatedProducts.map(product => {
        return (
          <li className="col-span-full h-full md:col-span-4" key={`product-${product.id}`}>
            <ProductCard product={product}/>
          </li>
        );
      })}
    </ul>
  );
}