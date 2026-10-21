import {Page, Locator, expect} from '@playwright/test'


export default class ProductPage{
    readonly page: Page;
    readonly productName: Locator;



    constructor(page: Page){
        this.page = page;

        //Locators
        this.productName = this.page.getByRole('heading', {level: 1});
    }



    // actions
    public async verifyProductName(productName: string): Promise<void>{
        await expect(this.productName).toHaveText(productName);
    }
}