$(document).ready(function(){

    var displayedButtons = ["Pride and Prejudice", "Clueless", "The Princess Bride", "Labyrinth"];

    function displayedImages(){

        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=eLytXjYSpY0EimIGxK7T02D182dJjW3R";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {

            for(var j = 0; j < limit; j++) {    

                var divImg = $("<div>");
                divImg.addClass("holder");
            
                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                divImg.append(image);

                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                divImg.append(pRating)

                $("#display-images").append(divImg);
            }
        });
    }

    function createButtons(){ 

        $("#display-buttons").empty();

        for (var i = 0; i < displayedButtons.length; i++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", displayedButtons[i]); 
            newButton.text(displayedButtons[i]); 
            $("#display-buttons").append(newButton); 
        }
    }

    function imgTransform() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#submitPress").on("click", function(){

        var input = $("#user-input").val().trim();
        form.reset();
        displayedButtons.push(input);
                
        createButtons();

        return false;
    })

    createButtons();

    $(document).on("click", "#input", displayedImages);
    $(document).on("click", ".gif", imgTransform);
});