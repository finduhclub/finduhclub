import { Selector } from 'testcafe';

class ChangePasswordPage {
  constructor() {
    this.pageId = '#change-password';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Edits the password of the user. */
  async changePassword(testController) {
    const oldPassword = 'changeme';
    const newPassword = 'changedit';

    await this.isDisplayed(testController);
    // Add new information
    await testController.typeText('#old-password-field', oldPassword, { replace: true });
    await testController.typeText('#new-password-field', newPassword, { replace: true });

    // Submit Info
    await testController.click('#change-password-submit input.btn.btn-primary')
      .wait(1000);
  }

  /** Restores the password of the user. */
  async changePasswordBack(testController) {
    const oldPassword = 'changedit';
    const newPassword = 'changeme';

    await this.isDisplayed(testController);
    // Add new information
    await testController.typeText('#old-password-field', oldPassword, { replace: true });
    await testController.typeText('#new-password-field', newPassword, { replace: true });

    // Submit Info
    await testController.click('#change-password-submit input.btn.btn-primary')
      .wait(1000);
  }
}

export const changePasswordPage = new ChangePasswordPage();
