import {  expect } from '@playwright/test'
import { test } from '../fixtures/myTest'


test('home page loads and shows product', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
    await expect(page.getByTestId('product-01M5AN4QVNRA9X0H9AF0PFKPEY')).toBeVisible();
});


