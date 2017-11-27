//--             GLOBAL VARIABLES       ------------
 var topics = ["Excited", "OMG", "Sad", "Scared", "Surprised", "Relieved"];


// Function for displaying topics data
function renderButtons() {
  //empty the div so duplicates buttons do not happen
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {

        var emotionButton = $("<button class='btn btn-info'>");
        emotionButton.attr("data-name", topics[i]);
        emotionButton.addClass("emotion");
        emotionButton.text(topics[i]);
        $("#buttons-view").append(emotionButton);
    }
    console.log('renderButtons function works!');
}

renderButtons();

//click event for buttons
$(document).on("click", ".emotion", function(){
  //prevents the page to reload when enter is pressed
  event.preventDefault();

  //clear gifs div to only have one set of gifs displayed
  $(".gifs").html("");
  var emotion = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response){
    console.log(response);
    for (var i=0; i < 10; i++) {
      var giphyDiv = $("<div class='display'>");
      var giphy = $("<img>");
      giphy.addClass("giphy");
      giphy.attr("src", response.data[i].images.fixed_height_still.url);
      giphy.attr("data-state", "still");
      giphy.attr("data-still", response.data[i].images.fixed_height_still.url);
      giphy.attr("data-animate", response.data[i].images.fixed_height.url);
      giphy.attr("alt", $(this).attr("data-name"));
      rating = $("<p>").text("Rating: " + response.data[i].rating);
      giphyDiv.append(giphy);
      giphyDiv.append(rating);
      
      $("#giphy-display").prepend(giphyDiv);   }
  })
});
//click evvent that changes animation state
$(document).on("click", ".giphy", function(){
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else{
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

//click event that adds new button after user input
$("#add-emotion").on("click", function(){
  event.preventDefault();
  var newEmotion = $("#emotion-input").val().trim();
  if (newEmotion === "") {
    alert("Please enter an emotion!");
  }else {
  topics.push(newEmotion);
  $("#emotion-input").val("");
  renderButtons();
}
});