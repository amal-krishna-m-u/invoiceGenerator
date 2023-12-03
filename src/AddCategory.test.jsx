// AddCategory.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddCategory from './AddCategory';

test('renders Add Category component', () => {
  render(<AddCategory />);
  expect(screen.getByText('Add Category')).toBeInTheDocument();
});

test('handles category input changes', () => {
  render(<AddCategory />);
  const categoryInput = screen.getByPlaceholderText('Category Name');
  fireEvent.change(categoryInput, { target: { value: 'New Category' } });
  expect(categoryInput).toHaveValue('New Category');
});

test('handles GST input changes', () => {
  render(<AddCategory />);
  const gstInput = screen.getByPlaceholderText('Category GST (%)');
  fireEvent.change(gstInput, { target: { value: '10' } });
  expect(gstInput).toHaveValue('10');
});

test('handles Add Category button click', () => {
  const mockAddCategory = jest.fn();
  render(<AddCategory onAddCategory={mockAddCategory} />);
  const addCategoryButton = screen.getByText('Add Category');
  fireEvent.click(addCategoryButton);
  expect(mockAddCategory).toHaveBeenCalled();
});
