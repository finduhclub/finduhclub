import { landingPage } from './landing.page';
import { homePage } from './home.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { listClubsPage } from './listclubs.page';
import { viewProfilePage } from './viewprofile.page';
import { editProfilePage } from './editprofile.page';
import { manageClubsPage } from './manageclubs.page';
import { manageProfilesPage } from './manageprofiles.page';
import { addClubsPage } from './addclubs.page';
import { changePasswordPage } from './changepassword.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

const credentialsAdmin = { username: 'admin@foo.com', password: 'changeme' };

/** New Credentials for one of the users after testing change password. */
const newCredentials = { username: 'john@foo.com', password: 'changedit' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work. Test home redirect.', async (testController) => {
  // For regular user
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await homePage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that list clubs page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListClubsPage(testController);
  await listClubsPage.isDisplayed(testController);
});

test('Test that view profile page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoViewProfilePage(testController);
  await viewProfilePage.isDisplayed(testController);
});

test('Test that manage clubs admin page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.gotoManageClubsPage(testController);
  await manageClubsPage.isDisplayed(testController);
});

test('Test that manage profiles admin page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.gotoManageProfilesPage(testController);
  await manageProfilesPage.isDisplayed(testController);
});

test('Test that edit profile page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoEditProfilePage(testController);
  await editProfilePage.isDisplayed(testController);
  await editProfilePage.editProfile(testController);
});

test('Test that add clubs admin page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentialsAdmin.username, credentialsAdmin.password);
  await navBar.gotoAddClubsPage(testController);
  await addClubsPage.isDisplayed(testController);
  await addClubsPage.addClub(testController);
});

test('Test that change password page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoEditProfilePage(testController);
  await editProfilePage.isDisplayed(testController);
  await editProfilePage.gotoChangePasswordPage(testController);
  await changePasswordPage.isDisplayed(testController);
  await changePasswordPage.changePassword(testController);
  await navBar.logout(testController);
  await navBar.gotoLandingPage(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, newCredentials.username, newCredentials.password);
  await navBar.isLoggedIn(testController, newCredentials.username);
  await homePage.isDisplayed(testController);
  await navBar.logout(testController);
  await navBar.gotoLandingPage(testController);
});

test('Restore the changed password', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, newCredentials.username, newCredentials.password);
  await navBar.gotoEditProfilePage(testController);
  await editProfilePage.isDisplayed(testController);
  await editProfilePage.gotoChangePasswordPage(testController);
  await changePasswordPage.isDisplayed(testController);
  await changePasswordPage.changePasswordBack(testController);
  await navBar.logout(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await homePage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
