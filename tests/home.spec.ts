import {test, expect} from '@playwright/test'


test('first check of the page', async ({page}) => {
 await page.goto('/');

 await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
});