import InventoryPage from '../pages/Inventory.page';
import { test } from '../fixtures/myTest'
import {expect } from '@playwright/test'


test('Clicking on a product add button adds it to the cart', async ({ page, inventoryPage , loginPage, accountPage}) => {
   //go to the page
   //specifically click the add button to a item 
   const email = process.env.TEST_EMAIL;
    if (!email) throw new Error('TEST_EMAIL is not set');
    const pass = process.env.TEST_PASS;
    if (!pass) throw new Error('TEST_PASS is not set');

    await page.goto('/')
    await loginPage.login(email, pass);
    await accountPage.expectMyAccountVisible();

    await page.context().storageState({ path: 'playwright/.auth/user.json' });
   const itemName = 'Sauce Labs Backpack';

   await inventoryPage.clickProductAddButton(itemName);
   
   await expect(page.getByRole('button', {name: '1'})).toContainText('1');
})

test('the price of the product on the product page matches the one on the catalog card', async ({ page , inventoryPage, }) => {
    const priceOnCatalog = await catalogPage.getFirstProductPrice();
    await catalogPage.clickProductItem();
    await productPage.expectProductPrice(priceOnCatalog);

})