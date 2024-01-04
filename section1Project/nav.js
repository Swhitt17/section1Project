"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);


/** Show create story on click on "submit" */
function navCreateStory(evt){
  console.debug("navCreateStory", evt);
  hidePageComponents();
  $submitForm.show();
}
$submitStory.on("click", navCreateStory);

/** Show list of favorited stories */

function navFavorites(evt){
  console.debug("navFavorites", evt);
  hidePageComponents();
 putFavoritesListOnPage();
 $favoritedStories.show();

}
$body.on("click", "#nav-favorites", navFavorites);


function navOwnStories(evt){
  console.debug("navOwnStories", evt);
  hidePageComponents();
  putOwnStories();
  $ownStories.show();
}
$body.on("click","#nav-own-stories", navOwnStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** Show user profile page on click on username */
function navProfile(evt){
  console.debug("navProfile", evt);
  hidePageComponents();
  $userProfile.show();

}
$navUserProfile.on("click", navProfile);



/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
