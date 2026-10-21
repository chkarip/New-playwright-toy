import { test, expect } from '@playwright/test'
import CatalogPage from '../pages/Catalog.page';

test('search the pliers items', async ({ page }) => {
    const itemName = 'pliers';
    const catalogPage = new CatalogPage(page);
    await catalogPage.goto();
    await catalogPage.search(itemName);

    const resultslist = await catalogPage.getAllMatchedItems();
    expect(resultslist.length).toBeGreaterThan(0)

    for (const item of resultslist) {
        expect(item.toLowerCase()).toContain(itemName.toLowerCase());
    }
})


test('search with no matches that returns no products found message', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    await catalogPage.goto();
    await catalogPage.search('nothing');

    await catalogPage.expectNoResultsMessage();

    await expect(catalogPage.productName).toHaveCount(0);
})

