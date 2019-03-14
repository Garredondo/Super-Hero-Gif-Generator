$(document).ready(function () {
    
    // starting the superhero array
    var topics = ["Superman", "Catwoman", "Batman", "Wonder Woman"];

    //display the gifs and rating information
    function displayGifs() {
        var supHero = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + supHero + "&limit=10&api_key=1Z1iJvsoiDao72O3mdWqCaTmBa2kFZ7c";

        //ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // creating characterDiv to hold both the image and rating of each gif
            var characterDiv = $("<div id='container'>");
            // =================================== 
            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                    //retrieving the urls for the image (still/animated)
                    // animated version
                var gifURL = results[i].images.downsized.url;
                    // still version
                var gifStillURL = results[i].images.downsized_still.url;
                
                var gif = $("<img src='" + gifStillURL + "'data-animate='" + gifURL + "'data-still='" + gifStillURL + "'>");
                // adding a class to reference when I create an on-click event for all the gifs the program generates
                gif.addClass("generated-gif");

                characterDiv.append(gif);
                // ===== Rating ==== storing the rating details
                var rating = results[i].rating;
                //creating an element to dispaly rating      
                var pRating = $("<p>").text("Rating: " + rating);
                // appending the rating to the charcterDiv because I could not append to the image
                characterDiv.append(pRating);
                
                // appending the images
                $("#display-gifs-here").prepend(characterDiv);
            }
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

    // function to add superhero button is clicked
    $("#add-superhero").on("click", function (event) {
        event.preventDefault();
        var additionalSuperhero = $("#superhero-input").val().trim();
    
        // this ensures that the function will only run if the user has input a string 
        if(additionalSuperhero === ""){
            console.log("Add a Superhero!");
        } else {
            topics.push(additionalSuperhero);
            renderButtons();
        }
        
    })


    // adding a click event listener to all elements with a class superhero-button 
    $(document).on("click", ".superhero-button", displayGifs);

    // event for when you click something with the class .generated-gif in the display-gifs-here section... the function should run
    $("#display-gifs-here").on("click", ".generated-gif", function(){
        // gives the gives an attibute of  "state" when clicked
        var state = $(this).attr("data-state");
        // if the state is still...
        if (state === "still"){
            // change the source URL to the animated version
            $(this).attr("src", $(this).attr("data-animate"));
            // change the state to animate
            $(this).attr("data-state", "animate");
        }
        else {
            // change the source URL to still version
            $(this).attr("src", $(this).attr("data-still"));
            // change the state to still
            $(this).attr("data-state", "still");
        }
    })

    //Calling the function to display the intital buttons on the page
    renderButtons();
});