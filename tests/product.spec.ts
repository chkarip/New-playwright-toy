import CatalogPage from '../pages/Catalog.page';
import InventoryPage from '../pages/Inventory.page';
import { test } from '../fixtures/myTest'


test('Clicking on a product opens the correct one in product page', async ({ page, catalogPage, inventoryPage: productPage }) => {
    const firstProductName = await catalogPage.getFirstProductName();
    await catalogPage.clickProductItem();

    await productPage.expectProductName(firstProductName);
})

test('the price of the product on the product page matches the one on the catalog card', async ({ page , catalogPage, inventoryPage: productPage}) => {
    const priceOnCatalog = await catalogPage.getFirstProductPrice();
    await catalogPage.clickProductItem();
    await productPage.expectProductPrice(priceOnCatalog);

})