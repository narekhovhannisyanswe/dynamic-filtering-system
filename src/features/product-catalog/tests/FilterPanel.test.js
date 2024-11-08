import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterPanel from '../components/FilterPanel';
import ProductProvider from '../context/ProductContext';
import { FILTER_INITIAL_STATE } from '@/features/product-catalog/constants/index.js';

describe('FilterPanel Component', () => {
  // Test filter components rendering
  test('renders all filter components correctly', () => {
    render(
      <ProductProvider>
        <FilterPanel />
      </ProductProvider>,
    );

    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('category-input')).toBeInTheDocument();
    expect(screen.getByTestId('brand-input')).toBeInTheDocument();
    expect(screen.getByTestId('rating-input')).toBeInTheDocument();
    expect(screen.getByTestId('min-price')).toBeInTheDocument();
    expect(screen.getByTestId('max-price')).toBeInTheDocument();
    expect(screen.getByTestId('sort-select')).toBeInTheDocument();
  });

  // Test filter logic and real-time updates
  test('updates filters in real-time when user inputs change', async () => {
    const user = userEvent.setup();

    render(
      <ProductProvider>
        <FilterPanel />
      </ProductProvider>,
    );

    // Test name filter
    const nameInput = screen.getByTestId('name-input');
    await act(async () => {
      await user.type(nameInput, 'test');
    });
    expect(nameInput.value).toBe('test');

    // Test category filter
    const categoryInput = screen.getByTestId('category-input');
    await act(async () => {
      await user.type(categoryInput, 'Electronics');
    });
    expect(categoryInput.value).toBe('Electronics');

    // Test brand filter
    const brandInput = screen.getByTestId('brand-input');
    await act(async () => {
      await user.type(brandInput, 'Lenovo');
    });
    expect(brandInput.value).toBe('Lenovo');

    // Test price range
    const minPrice = screen.getByTestId('min-price');
    const maxPrice = screen.getByTestId('max-price');
    await act(async () => {
      await user.type(minPrice, '100');
    });
    await act(async () => {
      await user.type(maxPrice, '500');
    } );
    expect(minPrice.value).toBe('100');
    expect(maxPrice.value).toBe('500');

    // Test rating filter
    const ratingInput = screen.getByTestId('rating-input');
    await act(async () => {
      await user.type(ratingInput, '6');
    });
    expect(ratingInput.value).toBe('6');
  });

  // Test sorting functionality
  test('applies sorting correctly', async () => {
    render(
      <ProductProvider>
        <FilterPanel />
      </ProductProvider>,
    );

    const sortSelect = screen.getByTestId('sort-select');

    // Test sorting by name
    await act(async () => {
      await userEvent.selectOptions(sortSelect, 'NAME');
    });
    expect(sortSelect.value).toBe('NAME');

    // Test sorting by price
    await act(async () => {
      await userEvent.selectOptions(sortSelect, 'PRICE');
    });
    expect(sortSelect.value).toBe('PRICE');

    // Test sorting by rating
    await act(async () => {
      await userEvent.selectOptions(sortSelect, 'RATING');
    });
    expect(sortSelect.value).toBe('RATING');
  });

  // Test filter reset functionality
  test('resets all filters when reset button is clicked', async () => {
    render(
      <ProductProvider>
        <FilterPanel />
      </ProductProvider>,
    );

    const resetButton = screen.getByTestId('reset-all');
    await act(async () => {
      await userEvent.click(resetButton);
    });

    expect(screen.getByTestId('name-input').value).toBe(FILTER_INITIAL_STATE.name);
    expect(screen.getByTestId('brand-input').value).toBe(FILTER_INITIAL_STATE.brand);
    expect(screen.getByTestId('category-input').value).toBe(FILTER_INITIAL_STATE.category);
    expect(Number(screen.getByTestId('min-price').value)).toBe(FILTER_INITIAL_STATE.minPrice);
    expect(Number(screen.getByTestId('max-price').value)).toBe(FILTER_INITIAL_STATE.maxPrice);
    expect(Number(screen.getByTestId('rating-input').value)).toBe(FILTER_INITIAL_STATE.minRating);
  });
});
