$( document ).ready(function() {
     console.log(localStorage);
    $(".query_btn").click(function(){
        event.preventDefault();
        
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
            //let jsonArray = json.list;
            //if(i = 0; i < jsonArray.length; i + 8) {
                //if statement and indexOf are supposed to be key here according to stephen
                //Maybe instead try creating the cards as I loop the index
                // $(".weather_image").attr("src", "http://openweathermap.org/img/w/" + json.list[0].weather[0].icon + ".png");
                // $(".temperature").html(json.list[0].main.temp + "&#176F");
                // $(".humidity").html(json.list[0].main.humidity + "%");

                //Here I'm trying to use template literals to create a card for each data point I want and append those cards to my forecastDiv.
            //     let cardTemplate = 
            //     `<div class="card">
            //         <div class="card-body bg-primary text-white">
            //             <h5 class="card-title forecastDate">${json.list[i].main.date}</h5>
            //             <img class="weather_image" src="http://openweathermap.org/img/w/${json.list[i].weather[0].icon}.png" alt="Current Weather Image">
            //             <p class="temperature">${json.list[i].main.temp}&#176F</p>
            //             <p class="humidity">${json.list[i].main.humidity}%</p>
            //         </div>
            //     </div>`
            //     $("#forecastDiv").append(cardTemplate);
            // }
        });
        //Here I need to make it so every time the search button is clicked, it will create a li, with the city searched saved as the text of the li. The li should also be a button that, once clicked, searches that city again. These should also be saved to local storage.
        //I'm creating an object that houses the search term that was just used and setting that to an array which is saved to local storage.
        
        let citySearchObject = {
            city: query_param
        };
        let searchHistoryArray = JSON.parse(localStorage.getItem("searchHistoryArray"));
        // if(searchHistoryArray.includes(citySearchObject.query_param) === true){
        //     return;
        // } else 
        
        if(searchHistoryArray === null) {
            searchHistoryArray = [];
            searchHistoryArray.push(citySearchObject);
        } else {
            searchHistoryArray.unshift(citySearchObject);
        };
        localStorage.setItem("searchHistoryArray", JSON.stringify(searchHistoryArray));
        //Here I'll create the list of prior searches and make them clickable. 
        let searchLi = $("<li>");
        let liButton = $("<button>");
        liButton.addClass("query_btn btn btn-white btn-sm");
        liButton.attr("type", "button");
        liButton.text(query_param);
        searchLi.html(liButton);
        $("#searchHistoryList").prepend(searchLi);
    })

    //saving my api key to a variable
    let appID = "94bd8525986db57aa34cbcb264fb52c9";

    //creating a function that will create a button li for each object in the stored array.

    function searchHistoryButtonCreator(){
        let searchHistoryArray = JSON.parse(localStorage.getItem("searchHistoryArray"));
        debugger;
        for(i = 0; i < searchHistoryArray.length; i++){
            let searchLi = $("<li>");
            let liButton = $("<button>");
            liButton.addClass("query_btn btn btn-white btn-sm");
            liButton.attr("type", "button");
            liButton.text(searchHistoryArray[i].city);
            searchLi.html(liButton);
            $("#searchHistoryList").prepend(searchLi);
        }
    }

    // //calling the function above.
    searchHistoryButtonCreator();
    
});