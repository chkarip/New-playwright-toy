import {  expect } from '@playwright/test'
import CatalogPage from '../pages/Catalog.page';
import { test } from '../fixtures/myTest'

test('search the pliers items', async ({ page , catalogPage }) => {
    const itemName = 'pliers';
    await catalogPage.goto();
    await catalogPage.search(itemName);

    const resultslist = await catalogPage.getAllMatchedItems();
    expect(resultslist.length).toBeGreaterThan(0)

    for (const item of resultslist) {
        expect(item.toLowerCase()).toContain(itemName.toLowerCase());
    }
})


test('search with no matches that returns no products found message', async ({ page, catalogPage }) => {
    await catalogPage.search('nothing');

    await catalogPage.expectNoResultsMessage();

    await expect(catalogPage.productName).toHaveCount(0);
})

//Updated goal 5: search for a term, click the x reset button,
//  and the catalog shows the full list again.

test('The "x" button reset the list after search', async ({ page , catalogPage}) => {
    const itemName = 'pliers';

    await catalogPage.expectProductsVisible();
    const originalNames = await catalogPage.getProductNames();

    await catalogPage.search(itemName);
    await catalogPage.expectSearchCompleted();

    const searchedNames = await catalogPage.getProductNames();

    expect(originalNames).not.toEqual(searchedNames);
    await catalogPage.clickResetSearch();

    await expect(page.locator('[data-test="search-caption"]'))
        .toHaveCount(0);


    // Wait until the original product list is restored
    await expect.poll(
        async () => await catalogPage.getProductNames()
    ).toEqual(originalNames);


})
