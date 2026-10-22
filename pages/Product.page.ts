import {Page, Locator, expect} from '@playwright/test'


export default class ProductPage{
    readonly page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;



    constructor(page: Page){
        this.page = page;

        //Locators
        this.productName = this.page.getByRole('heading', {level: 1});
        this.productPrice = this.page.getByLabel('unit-price'); // better with TestId though because label might change later for accesibility 
    }



    // actions
    public async expectProductName(productName: string): Promise<void> {
        await expect(this.productName).toHaveText(productName);
    }

    public async expectProductPrice(productPrice: string): Promise<void> {
        await expect(this.productPrice).toHaveText(productPrice);
    }
}