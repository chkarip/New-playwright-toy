import { test } from '../fixtures/myTest'



test('When I put my credentials I should login and see the account page', async ( { page, loginPage, accountPage }) => {
const email = process.env.TEST_EMAIL;
if (!email) throw new Error('TEST_EMAIL is not set');
const pass = process.env.TEST_PASS;
if (!pass) throw new Error('TEST_PASS is not set');

    await page.goto('/')
    await loginPage.login(email, pass);
    await accountPage.expectMyAccountVisible();

    await page.context().storageState({ path: 'playwright/.auth/user.json' });
})