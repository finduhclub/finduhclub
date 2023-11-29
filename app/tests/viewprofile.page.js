import { Selector } from 'testcafe';

class ViewProfilePage {
  constructor() {
    this.pageId = '#view-profile';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const viewProfilePage = new ViewProfilePage();
