"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, deleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const showStar = Boolean(currentUser);


  return $(`
      <li id="${story.storyId}">
      ${deleteBtn ? deleteBtnHTML() : ""};
      ${showStar ? starHTML(story, currentUser) : ""};
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function deleteBtnHTML(){
  return `<span class="trash"><i class="favS fa-trash-alt"></i></span>`;
}




function starHTML(story,user){
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "favS" : "favR";
  return `<span class="star"><i class="${starType} fa-star"></i></span>`;


}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// removing story/stories from page
async function deleteStory(evt){
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id")

 await storyList.removeStory(currentUser, storyId);

   putOwnStories();

}
$ownStories.on("click", ".trash", deleteStory);




// Making a new story
 async function submitStory(evt){
  console.debug("submitStory");
  evt.preventDefault();

  //getting data from form to add to story
  const title = $("#create-title").val();
  const author = $("#create-author").val();
  const url = $("#create-url").val();
  const username = currentUser.username;
  const storyData = {title, author, url, username};

  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story);
$allStoriesList.prepend($story);

$submitForm.slideUp("slow");
$submitForm.trigger("reset");

}

$submitForm.on("submit", submitStory)



function putOwnStories(){
  console.debug("putOwnStories");

  $ownStories.empty();

  if(currentUser.ownStories.length === 0){
   $ownStories.append("<h5>You have not posted any stories! Stories that you post will appear here!</h5>");
  }
  else{
    for(let story of currentUser.ownStories){
      const $story = generateStoryMarkup(story, true);
      $ownStories.append($story);
    }
  }
  $ownStories.show();
}


//************************Favorites****************************** */


//Adding favorited stories to own page

 function putFavoritesListOnPage(){

  console.debug("putFavoritesListOnPage")

  $favoritedStories.empty();

  if(currentUser.favorites.length === 0){
   $favoritedStories.append("<h5>You have no favorited stories! Your favorited stories will appear here!</h5>");
  }
  else{
    for(let story of currentUser.favorites){
      const $story = generateStoryMarkup(story);
      $favoritedStories.append($story);
    }
  }
}

  $favoritedStories.show();


  //Using star to toggle favorite on and off

   async function toggleFavorites(evt){
    console.debug("toggleFavorites");

    const $target = $(evt.target);
    const $closestLi = $target.closest("li");
    console.log($closestLi)
    const storyId = $closestLi.attr("id");
    const story =  storyList.stories.find(st => st.storyId ==  storyId);

    if($target.hasClass("favS")){
      await currentUser.removeFavorites(story);
      $target.closest("i").toggleClass("favS favR")
    }
    else{
      await currentUser.addFavorites(story);
      $target.closest("i").toggleClass("favS favR")
    }

  }

$storiesLists.on("click", ".star", toggleFavorites);