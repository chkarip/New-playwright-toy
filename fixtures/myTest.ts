import { test as base } from '@playwright/test'
import CatalogPage from '../pages/Catalog.page'
import ProductPage from '../pages/Product.page'
import LoginPage from '../pages/Login.page'
import AccountPage from '../pages/Account.page'

type MyFixtures = {
    catalogPage: CatalogPage;
    productPage: ProductPage;
    loginPage: LoginPage;
    accountPage: AccountPage;

}

export const test = base.extend<MyFixtures>({
    catalogPage: async ({ page }, use) => {
        const catalogPage = new CatalogPage(page);
        await catalogPage.goto();
        await use(catalogPage)
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page))
    },
    loginPage: async({page}, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage);
    },
    accountPage: async ({page}, use ) => {
        await use(new AccountPage(page));
    }

})