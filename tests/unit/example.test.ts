import { describe, it, expect } from 'vitest';

describe('Example Unit Test', () => {
  it('should pass basic arithmetic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should verify test environment is configured', () => {
    expect(true).toBeTruthy();
  });
});
