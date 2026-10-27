import { Page, Locator, expect } from '@playwright/test'


export default class InventoryPage {
    readonly page: Page;

    readonly productContainer: Locator;

    readonly productName: Locator;
    readonly productAddButton: Locator;
    readonly productPrice: Locator;

    constructor(page: Page) {
        this.page = page;

        //Locators
        this.productContainer = this.page.getByTestId('inventory-item');

        this.productName = this.page.getByRole('button');
        this.productAddButton = this.page.getByRole('button', { name: 'Add to cart' });
        this.productPrice = this.page.getByTestId('inventory-item-price'); 
    }


    //helper 
    private card(productName: string): Locator{
        return this.productContainer.filter({ hasText: productName });
    }

    // actions
    public async getProductName(input: string): Promise<Locator>{
        return this.productName.getByText(input);
    }

    public async clickProductAddButton(productName: string): Promise<void> {
    const product =  this.card(productName);
    await product.locator(this.productAddButton).click();
    }

    public async getProductPrice(productName: string): Promise<string> {
    const product = this.card(productName);
    return product.locator(this.productPrice).innerText();
    }
}
