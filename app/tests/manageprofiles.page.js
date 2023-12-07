import { Selector } from 'testcafe';

class ManageProfilesPage {
  constructor() {
    this.pageId = '#list-profiles-admin';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const manageProfilesPage = new ManageProfilesPage();
