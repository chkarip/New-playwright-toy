import { Page, Locator, expect } from '@playwright/test'


export default class CatalogPage {
    readonly page: Page;

    readonly searchInput: Locator;
    readonly submitButton: Locator;
    readonly searchResults: Locator;
    readonly headerSearchedFor: Locator;
    readonly productName: Locator;
    readonly productNotFound: Locator;

    readonly productPrice: Locator;
    readonly resetSearch: Locator;
    readonly signInButton: Locator;



    constructor(page: Page) {
        this.page = page;

        //locators
        this.searchInput = this.page.getByPlaceholder('Search');
        this.submitButton = this.page.getByTestId('search-submit');
        this.searchResults = this.page.getByTestId('search_completed');
        this.headerSearchedFor = this.page.getByTestId('search-caption');
        this.productName = this.page.getByTestId('product-name');
        this.productNotFound = this.page.getByText('There are no products found.');

        this.productPrice = this.page.getByTestId('product-price');
        this.resetSearch = this.page.getByRole('button', { name: 'X ', exact: true });
        this.signInButton = this.page.getByRole('link', { name: 'Sign in' });
    }

    //actions
    public async goto(): Promise<void> {
        await this.page.goto('/');
    }

    public async fillSearchInput(input: string): Promise<void> {
        await this.searchInput.fill(input)
    }

    public async clickSubmitButton(): Promise<void> {
        await this.submitButton.click();
    }

    public async search(input: string): Promise<void> {
        await this.fillSearchInput(input);
        await this.clickSubmitButton();
    }

    public async expectHeaderSearchedForIsVisible(): Promise<void> {
        await expect(this.headerSearchedFor).toBeVisible();
    }

    public async getAllMatchedItems(): Promise<string[]> {
        await this.expectSearchCompleted();
        await this.expectHeaderSearchedForIsVisible();
        await expect(this.productName.first()).toBeVisible();
        return await this.getProductNames();
    }

    public async expectNoResultsMessage(): Promise<void> {
        await expect(this.productNotFound).toBeVisible();
    }

    public async getProductNames(): Promise<string[]> {
        const names = await this.productName.allTextContents();
        return names.map(name => name.trim());
    }

    public async expectProductsVisible(): Promise<void> {
        await expect(this.productName.first()).toBeVisible();
    }

    public async expectSearchCompleted(): Promise<void> {
        await expect(this.searchResults).toBeVisible();
    }

    public async getFirstProductName(): Promise<string> {
        const firstProductName = this.productName.first();
        await expect(firstProductName).toBeVisible();
        const name = await firstProductName.innerText();
        return name.trim();
    }

    public async getFirstProductPrice(): Promise<string> {
        const firstProductPrice = this.productPrice.first()
        await expect(firstProductPrice).toBeVisible();
        const price = await firstProductPrice.innerText();
        return price.trim().replace('$', '');
    }

    public async clickProductItem(): Promise<void> {
        await this.productName.first().click();
    }

    public async clickResetSearch(): Promise<void> {
        await this.resetSearch.click();
    }

    public async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    }

}