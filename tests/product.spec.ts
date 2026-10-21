import { test, Page } from '@playwright/test';
import CatalogPage from '../pages/Catalog.page';
import ProductPage from '../pages/Product.page';


test('Clicking on a product opens the corect one in product page', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);

    await catalogPage.goto();

    const firstProductName = await catalogPage.getFirstProductName();
    await catalogPage.clickProductItem(); //gets the first one 

    await productPage.verifyProductName(firstProductName);

})