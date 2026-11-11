import { test, expect } from '@playwright/test';

test.describe('PlugWise Application', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/PlugWise/);
  });

  test('should display main heading', async ({ page }) => {
    await page.goto('/');
    const heading = page.getByRole('heading', { name: /PlugWise/i });
    await expect(heading).toBeVisible();
  });

  test('should display tagline', async ({ page }) => {
    await page.goto('/');
    const tagline = page.getByText(/Understand your energy/i);
    await expect(tagline).toBeVisible();
  });

  test('should display feature cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Track Consumption/i)).toBeVisible();
    await expect(page.getByText(/Estimate Costs/i)).toBeVisible();
    await expect(page.getByText(/What-if Simulator/i)).toBeVisible();
  });

  test('should display technology stack', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Technology Foundation/i)).toBeVisible();
    await expect(page.getByText('React 19')).toBeVisible();
    await expect(page.getByText('TypeScript 5.6')).toBeVisible();
  });
});
