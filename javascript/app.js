$(document).ready(function () {

    // starting the superhero array
    var topics = ["Superman", "Catwoman", "Batman", "Wonder Woman"];

    //display the gifs and information
    function displayGifs() {
        var supHero = $(this).attr("data-name");
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + supHero + "&limit=10&api_key=1Z1iJvsoiDao72O3mdWqCaTmBa2kFZ7c";

        //ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            //storing the rating details
            
            var rating = response.data[0].rating;
            
            //creating an element to dispaly rating
            
            var pRating = $("<p>").text("Rating: " + rating);
            
            //display the rating
            
            $("#display-gifs").append(pRating);

            //retrieving the url for the image
            
            var gifURL = response.data[0].images.fixed_width_small_still.url;
            
            // creating an element to hold the image
            
            // var gif = $("<img>").attr("src= " + gifURL);
            var gif = $("<img src=" + gifURL + ">");
                // in need to add an "alt"
                // i need to figure out how to loop through the object
                // i need to 
            
            // appending the images
            
            $("#display-gifs").prepend(gif);


            //putting new character info above the rest
            $("#display-gifs").prepend(characterDiv);
        });
    }

    
    //function to create buttons
    function renderButtons() {
        //Delete buttons prior to adding new information
        $("#display-buttons").empty();
        //Loop through the array of topics
        for (var i = 0; i < topics.length; i++) {
            //generate buttons
            var B = $("<button>");
            //add class so that bootstrap will render red buttons
            B.addClass("btn btn-danger superhero-button");
            //adding an attribute for the click-functions to be added later
            B.attr("data-name", topics[i]);
            //initial button text
            B.text(topics[i]);
            //appending the new buttons to the DOM
            $("#display-buttons").append(B);

        }
    }

    //Function handles when add superhero button is clicked
    $("#add-superhero").on("click", function(event){
        event.preventDefault();
        var additionalSuperhero = $("#superhero-input").val().trim();
        topics.push(additionalSuperhero);
        renderButtons();
    })


    //Adding a click event listener to all elements with a class superhero-button
    $(document).on("click", ".superhero-button", displayGifs);
    
    //Calling the function to display the intital buttons on the page
    renderButtons();
});