var $ideaTitleInput = $('.idea-title-input');
var $ideaBodyInput = $('.idea-body-input');
var $upvoteButton = $('.upvote-button');
var $downvoteButton = $('.downvote-button');

$('.save-idea-button').on('click', function(event) {
  createIdea();
  clearInputs();
  // storeIdeaList();
  event.preventDefault();
});
$('.idea-list').on('click', '.delete-button', deleteIdea);
$('.idea-list').on('click', '.upvote-button', upvote);
$('.idea-list').on('click', '.downvote-button', downvote);
$('.idea-list').on('blur', 'h2', editTitleText);
$('.idea-list').on('blur', 'p', editBodyText);

$(document).on('input', '.search-input', searchIdeas);
$(window).on('load', function() {
  loadIdeaList();
  displayIdeas();
});

function Idea(title, body) {
  this.id = Date.now();
  this.title = title || 'No title specified';
  this.body = body || 'No body specified';
};

function createIdea() {
  var ideaTitleInputValue = $ideaTitleInput.val();
  var ideaBodyInputValue = $ideaBodyInput.val();
  var newIdea = new Idea(ideaTitleInputValue, ideaBodyInputValue);
  var JSONNewIdea = JSON.stringify(newIdea);
  localStorage.setItem(newIdea.id, JSONNewIdea);
  prependIdea(newIdea.title, newIdea.body, newIdea.id);
};

function prependIdea(title, body, id) {
  $('.idea-list').prepend(`
    <div class="idea" id='${id}'>
      <h2 aria-label="Idea title" contenteditable="true">${title}</h2> 
      <img tabindex="0" role="button" aria-label="Delete idea" class="delete-button icon" src="icons/delete.svg">
      <p aria-label="Idea body" contenteditable="true">${body}</p>
      <div class="vote-container">
        <div class="vote-buttons-container">
          <img tabindex="0" role="button" aria-label="Increase quality" class="upvote-button icon" src="icons/upvote.svg">
          <img tabindex="0" role="button" aria-label="Decrease quality" class="downvote-button icon" src="icons/downvote.svg">
        </div>
        <p class="idea-quality-container">quality: <span class="idea-quality">swill</span></p>
      </div>  
      <hr>
    </div>
    `);
};

function storeIdeaList() {
  var ideaList = $('.idea-list').html();
  var JSONIdeaList = JSON.stringify(ideaList);
  localStorage.setItem('storedIdeaList', JSONIdeaList);
};

function loadIdeaList() {
  var retrievedIdeaList = localStorage.getItem('storedIdeaList');
  var parsedIdeaList = JSON.parse(retrievedIdeaList);
  $('.idea-list').prepend(parsedIdeaList);
};

function deleteIdea() {
  $(this).closest('.idea').remove();
  storeIdeaList();
}

function upvote() {
  var $qualityLevel = $(this).parentsUntil('.idea').find('.idea-quality').text();
  if ($qualityLevel === 'swill') {
    $(this).parentsUntil('.idea').find('.idea-quality').text('plausible');
  } else {
    $(this).parentsUntil('.idea').find('.idea-quality').text('genius');
  }
  storeIdeaList();
}

function downvote() {
  var $qualityLevel = $(this).parentsUntil('.idea').find('.idea-quality').text();
  if ($qualityLevel === 'genius') {
    $(this).parentsUntil('.idea').find('.idea-quality').text('plausible');
  } else {
    $(this).parentsUntil('.idea').find('.idea-quality').text('swill');
  }
  storeIdeaList();
};

function searchIdeas() {
  var searchValue = $(this).val().toLowerCase();
  $(".idea-list .idea").filter(function() {
  $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1)
  });
  storeIdeaList();
}

function clearInputs() {
  $ideaTitleInput.val('');
  $ideaBodyInput.val('');
}

function displayIdeas() {
  $('.idea').removeAttr('style');
}

function editTitleText() {
  var newText = $(this).text();
  console.log($(this));
  $(this).html(`${newText}`);
  storeIdeaList();
};

function editBodyText() {
  var newText = $(this).text();
  $(this).html(`${newText}`);
  storeIdeaList();
};

