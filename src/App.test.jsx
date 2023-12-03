import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home link', () => {
  render(<App />);
  const homeLink = screen.getByText(/Home/i);
  expect(homeLink).toBeInTheDocument();
});

test('renders add category link', () => {
  render(<App />);
  const addCategoryLink = screen.getByText(/Add Category/i);
  expect(addCategoryLink).toBeInTheDocument();
});

// Add more tests as needed for other components and functionality
