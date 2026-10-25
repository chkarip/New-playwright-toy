import { Page, Locator ,expect } from '@playwright/test';

export default class AccountPage {
    readonly page: Page;
    
    readonly myAccountHeading: Locator;

    constructor(page: Page){
        this.page = page;

        //Locators
        this.myAccountHeading = this.page.getByRole('heading', { level: 1, name: 'My account'});
    }

    //actions
    public async expectMyAccountVisible(): Promise<void> {
        await expect(this.myAccountHeading).toBeVisible();
    }
}