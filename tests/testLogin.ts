import { test } from '../fixtures/myTest'

test.use({ storageState: 'playwright/.auth/user.json' });


test('a logged-in user can open the products page directly', async ({ page, accountPage }) => {
    // 1. open the products page
    // 2. check that the products page is shown
});