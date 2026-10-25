import { Page, Locator } from '@playwright/test'


export default class LoginPage {
    readonly page: Page;

    readonly emailInput: Locator;
    readonly passInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        //Locators 
        this.emailInput = this.page.getByRole('textbox', { name: 'Email address' });
        this.passInput = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', {name: 'Login'});



    }

    //actions

    public async fillEmailInput(input: string): Promise<void> {
        await this.emailInput.fill(input);
    }

    public async fillPassInput(input: string): Promise<void> {
        await this.passInput.fill(input);
    }

    public async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    public async login(email: string, password: string): Promise<void> {
        await this.fillEmailInput(email);
        await this.fillPassInput(password);
        await this.clickLoginButton();
    }
}