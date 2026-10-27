import { Page, Locator} from '@playwright/test'

export default class CartPage {
    readonly page: Page;

    readonly itemCart: Locator;

    constructor(page: Page){
        this.page = page;
        
        //Locator
        this.itemCart = this.page.getByRole('button', { name: 'Sauce Labs Backpack' } );
    }

    //actions
    public async verifyTheProductMatches(){

    }
}