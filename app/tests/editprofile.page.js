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

  /** Edits the profile of the user. */
  async editProfile(testController) {
    const name = 'Cool Dude';
    const image = 'https://www.realmenrealstyle.com/wp-content/uploads/2023/06/Vanity-Glasses.jpg';

    await this.isDisplayed(testController);
    // Add new information
    await testController.typeText('#edit-profile-name-field', name, { replace: true });
    await testController.typeText('#edit-profile-image-field', image, { replace: true });
    // Select interests
    const InterestSelector = Selector('#edit-profile-interests-field');
    await testController.click(InterestSelector);
    const interestOption = InterestSelector.find('option');
    await testController
      .click(InterestSelector)
      .click(interestOption.withText('Fraternity/Sorority'))
      .expect(InterestSelector.value).eql('Fraternity/Sorority');
    // Select club
    const ClubSelector = Selector('#edit-profile-clubs-field');
    await testController.click(ClubSelector);
    const ClubOption = ClubSelector.find('option');
    await testController
      .click(ClubSelector)
      .click(ClubOption.withText('Accounting Club'))
      .expect(ClubSelector.value).eql('Accounting Club');

    // Submit Info
    await testController.click('#edit-profile-update input.btn.btn-primary');
  }
}

export const editProfilePage = new EditProfilePage();
