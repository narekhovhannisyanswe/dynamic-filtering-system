import ProductProvider from '@/features/product-catalog/context/ProductContext';
import ProductPage from '@/features/product-catalog/components/ProductPage';

export default function Home() {

  return (
    <ProductProvider>
      <ProductPage/>
    </ProductProvider>
  );

}
