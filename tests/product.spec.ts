import CatalogPage from '../pages/Catalog.page';
import ProductPage from '../pages/Product.page';
import { test } from '../fixtures/myTest'


test('Clicking on a product opens the correct one in product page', async ({ page, catalogPage, productPage }) => {
    const firstProductName = await catalogPage.getFirstProductName();
    await catalogPage.clickProductItem();

    await productPage.expectProductName(firstProductName);
})

test('the price of the product on the product page matches the one on the catalog card', async ({ page , catalogPage, productPage}) => {
    const priceOnCatalog = await catalogPage.getFirstProductPrice();
    await catalogPage.clickProductItem();
    await productPage.expectProductPrice(priceOnCatalog);

})