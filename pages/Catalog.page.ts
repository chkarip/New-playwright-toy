import { Page, Locator, expect } from '@playwright/test'


export default class CatalogPage {
    readonly page: Page;

    readonly searchInput: Locator;
    readonly submitButton: Locator;
    readonly searchResults: Locator;
    readonly headerSearchedFor: Locator;
    readonly productName: Locator;
    readonly productNotFound: Locator;




    constructor(page: Page) {
        this.page = page;

        //locators
        this.searchInput = this.page.getByPlaceholder('Search');
        this.submitButton = this.page.getByTestId('search-submit');
        this.searchResults = this.page.getByTestId('search_completed');
        this.headerSearchedFor = this.page.getByTestId('search-caption');
        this.productName = this.page.getByTestId('product-name');
        this.productNotFound = this.page.getByText('There are no products found.');

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
        await this.expectHeaderSearchedForIsVisible();
        await expect(this.productName.first()).toBeVisible();
        return await this.getProductName();
    }

    public async expectNoResultsMessage(): Promise<void> {
        await expect(this.productNotFound).toBeVisible();
    }

    public async getProductName(): Promise<string[]> {
        const names = await this.productName.allTextContents();
        return names.map(name => name.trim());
    }

    public async getFirstProductName(): Promise<string> {
        const firstProductName = await this.productName.first();
        await expect(firstProductName).toBeVisible();
        const name = await firstProductName.innerText();
        return name.trim();
    }

    public async clickProductItem(): Promise<void> {
        await this.productName.first().click();
    }

}