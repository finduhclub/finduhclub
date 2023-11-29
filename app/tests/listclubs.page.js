import { Selector } from 'testcafe';

class ListClubsPage {
  constructor() {
    this.pageId = '#list-clubs';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const listClubsPage = new ListClubsPage();
