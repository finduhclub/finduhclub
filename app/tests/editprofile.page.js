import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#edit-profile';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  // /** Adds a club to the database. */
  // async editProfile(testController) {
  //   const name = 'Cool Club';
  //   const image = 'https://www.realmenrealstyle.com/wp-content/uploads/2023/06/Vanity-Glasses.jpg';
  //   const description = 'A cool club for very cool people.';
  //   const clubTime = 'Mondays: 3:00PM to 4:30PM';
  //   const clubEmail = 'coolkids808@example.com';
  //   await this.isDisplayed(testController);
  //   // Define new club
  //   await testController.typeText('#add-clubs-name-field', name);
  //   await testController.typeText('#add-clubs-image-field', image);
  //   await testController.typeText('#add-clubs-desc-field', description);
  //   await testController.typeText('#add-clubs-time-field', clubTime);
  //   await testController.typeText('#add-clubs-email-field', clubEmail);
  //   // Select 2 club types
  //   const InterestSelector = Selector('#add-clubs-interests-field div.form-check input');
  //   await testController.click(InterestSelector.nth(0));
  //   await testController.click(InterestSelector.nth(1));
  //
  //   await testController.click('#add-clubs-submit-btn input.btn.btn-primary');
  //   await testController.click(Selector('.swal-button--confirm'));
  // }
}

export const editProfilePage = new EditProfilePage();
