import { Page, Locator ,expect } from '@playwright/test';

export default class AccountPage {
    readonly page: Page;
    
    readonly myAccountHeading: Locator;

    constructor(page: Page){
        this.page = page;

        //Locators
        this.myAccountHeading = this.page.getByText('Swag Labs');
    }

    //actions
    public async expectMyAccountVisible(): Promise<void> {
        await expect(this.myAccountHeading).toBeVisible();
    }
}