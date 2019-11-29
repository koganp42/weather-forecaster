$( document ).ready(function() {
     console.log(localStorage);
    $(".query_btn").click(function(){
        event.preventDefault();
        $("#forecastDiv").empty();
        //saving my api key to a variable
        let appID = "94bd8525986db57aa34cbcb264fb52c9";
        let query_param = $(this).prev().val();
        if ($(this).prev().attr("placeholder") == "City") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&units=imperial&APPID=" + appID;
            var forecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + query_param + "&units=imperial&APPID=" + appID;
        }

        $.getJSON(weather,function(json){
            console.log(json);
            $("#city").html(json.name);
            $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
            $("#temperature").html(json.main.temp + "&#176F");
            $("#humidity").html(json.main.humidity + "%");
            $("#wind_speed").html(json.wind.speed + " MPH");
        });
        $.getJSON(forecast,function(json){
            console.log(json);
            for(i = 0; i < json.list.length; i++){
                
                if(json.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                let dateDisplayVal = json.list[i].dt_txt.slice(0, 10);
                //Here I'm trying to use template literals to create a card for each data point I want and append those cards to my forecastDiv.
                    let cardTemplate = 
                    `<div class="card">
                        <div class="card-body text-black card-special bg-info">
                            <h5 class="card-title forecastDate">${dateDisplayVal}</h5>
                            <img class="weather_image" src="http://openweathermap.org/img/w/${json.list[i].weather[0].icon}.png" alt="Current Weather Image">
                            <p class="temperature">${json.list[i].main.temp}&#176F</p>
                            <p class="humidity">${json.list[i].main.humidity}%</p>
                        </div>
                    </div>`
                    $("#forecastDiv").append(cardTemplate);
            }
        }});
        //Here I need to make it so every time the search button is clicked, it will create a li, with the city searched saved as the text of the li. The li should also be a button that, once clicked, searches that city again. These should also be saved to local storage.
        //I'm creating an object that houses the search term that was just used and setting that to an array which is saved to local storage.
        
        let citySearchObject = {
            city: query_param
        };
        let searchHistoryArray = JSON.parse(localStorage.getItem("searchHistoryArray"));
        // if(searchHistoryArray.includes(citySearchObject.query_param) === true){
        //     return;
        // } else 
        console.log(searchHistoryArray);
        debugger;
        if(searchHistoryArray === null) {
            searchHistoryArray = [];
            searchHistoryArray.push(citySearchObject);
        } else if(searchHistoryArray.length === 5) {
            searchHistoryArray.pop();
            $("#searchHistoryList").empty();
            searchHistoryButtonCreator();
            searchHistoryArray.unshift(citySearchObject);
        } else {
            searchHistoryArray.unshift(citySearchObject);
        };
        localStorage.setItem("searchHistoryArray", JSON.stringify(searchHistoryArray));
        //The clickable list of prior searches. 
        let searchLi = $("<li>");
        let liButton = $("<button>");
        liButton.addClass("query_btn btn btn-white btn-sm");
        liButton.attr("type", "button");
        liButton.text(query_param);
        searchLi.html(liButton);
        $("#searchHistoryList").prepend(searchLi);
    })


    //Function that creates a button li for each object in the stored array.

    function searchHistoryButtonCreator(){
        let searchHistoryArray = JSON.parse(localStorage.getItem("searchHistoryArray"));
        for(i = 0; i < searchHistoryArray.length; i++){
            let searchLi = $("<li>");
            let liButton = $("<button>");
            liButton.attr("type", "button");
            liButton.addClass("query_btn btn btn-white btn-sm");
            liButton.text(searchHistoryArray[i].city);
            searchLi.html(liButton);
            $("#searchHistoryList").append(searchLi);
        }
    }

    // //calling the function above.
    searchHistoryButtonCreator();

    
});

//What's left to do :
//1. Make the search history buttons perform the same search when clicked.
//1a. Possibly re-arrange the list so that the button clicked will move to the first position.

//2. Have the search bar delete the fifth li when a new one is created. 
//2a. Ensure a new button isn't created if the same value is entered in the search bar.
