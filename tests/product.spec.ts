import { test } from '@playwright/test';
import CatalogPage from '../pages/Catalog.page';
import ProductPage from '../pages/Product.page';


test('Clicking on a product opens the correct one in product page', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);

    await catalogPage.goto();

    const firstProductName = await catalogPage.getFirstProductName();
    await catalogPage.clickProductItem(); //gets the first one 

    await productPage.expectProductName(firstProductName);

})


//Goal 4: the price on the product page matches the price on the catalog card.

// What to check: open a product from the catalog and confirm its price on the product page is the same one the catalog card showed.
// Page objects: add a price locator to ProductPage, and a way to read the first card’s price in CatalogPage.
// Rules:
// The two prices come in different formats, so make sure you compare the same thing.
// Take the catalog price before you click, as with the name.
// Use the first product, not a hard-coded one.
// No waitForTimeout.
// Done when: it passes 10/10 with --repeat-each=10, and you’ve seen it fail once on purpose.

test('the price of the product on the product page matches the one on the catalog card', async ({page}) => { 
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);

    await catalogPage.goto();

   const priceOnCatalog =  await catalogPage.getFirstProductPrice();
   await catalogPage.clickProductItem();
   await productPage.expectProductPrice(priceOnCatalog);

})