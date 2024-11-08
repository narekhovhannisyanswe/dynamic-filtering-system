import { render, screen, waitFor } from '@testing-library/react';
import ProductCatalog from '../components/ProductCatalog';
import ProductProvider from '../context/ProductContext';
import { ITEMS_PER_PAGE } from '../constants';

describe('ProductCatalog Component', () => {
  test('renders product catalog and transitions from loading to products', async () => {
    render(
      <ProductProvider>
        <ProductCatalog />
      </ProductProvider>,
    );

    expect(screen.getByText('No products found.')).toBeInTheDocument();

    await waitFor(() => {
      const productCards = screen.getAllByTestId('product-card');
      expect(productCards).toHaveLength(ITEMS_PER_PAGE);
    }, { timeout: 1000 });
  });

  test('displays correct product information in each card', async () => {
    render(
      <ProductProvider>
        <ProductCatalog />
      </ProductProvider>,
    );

    await waitFor(() => {
      const productCards = screen.getAllByTestId('product-card');
      const firstProduct = productCards[0];

      expect(firstProduct.querySelector('[data-testid="product-name"]')).toBeInTheDocument();
      expect(firstProduct.querySelector('[data-testid="product-brand"]')).toBeInTheDocument();
      expect(firstProduct.querySelector('[data-testid="product-category"]')).toBeInTheDocument();
      expect(firstProduct.querySelector('[data-testid="product-price"]')).toBeInTheDocument();
    }, { timeout: 1000 });
  });


  test('shows "No products found" when product list is empty', async () => {
    render(
      <ProductProvider>
        <ProductCatalog />
      </ProductProvider>,
    );

    expect(screen.getByText('No products found.')).toBeInTheDocument();
  });
});
