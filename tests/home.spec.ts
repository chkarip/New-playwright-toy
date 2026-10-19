import {test, expect} from '@playwright/test'


test('first check of the page', async ({page}) => {
 await page.goto('/');

 await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
 await expect(page.getByTestId('product-01M5AN4QVNRA9X0H9AF0PFKPEY')).toBeVisible();
});