import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('App Integration Test', () => {
  it('should render PlugWise heading', () => {
    render(<App />);
    expect(screen.getByText('PlugWise')).toBeInTheDocument();
  });

  it('should render tagline', () => {
    render(<App />);
    expect(screen.getByText(/Understand your energy/i)).toBeInTheDocument();
  });

  it('should display Phase 0 completion notice', () => {
    render(<App />);
    expect(screen.getByText(/Phase 0: Foundation Complete/i)).toBeInTheDocument();
  });
});
