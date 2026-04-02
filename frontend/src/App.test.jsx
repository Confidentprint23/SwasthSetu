import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const MockedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<MockedApp />);
    expect(screen.queryByText(/loading/i) || screen.queryByText(/welcome/i)).toBeTruthy();
  });

  test('renders navbar', () => {
    render(<MockedApp />);
    const navbar = screen.getByRole('banner');
    expect(navbar).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<MockedApp />);
    const footer = screen.getByText(/SwasthSetu/i) || screen.getByText(/© 2025/i);
    expect(footer).toBeTruthy();
  });
});