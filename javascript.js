$( document ).ready(function() {
    let appID = "94bd8525986db57aa34cbcb264fb52c9";

    $(".query_btn").click(function(){

        var query_param = $(this).prev().val();

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
            for (i = 0; i < json.list.length; i + 8) {
                //if statement and indexOf are supposed to be key here according to stephen
                //Maybe instead try creating the cards as I loop the index
                // $(".weather_image").attr("src", "http://openweathermap.org/img/w/" + json.list[i].weather[0].icon + ".png");
                // $(".temperature").html(json.list[i].main.temp + "&#176F");
                // $(".humidity").html(json.list[i].main.humidity + "%");
                let cardTemplate = 
                `<div class="card">
                    <div class="card-body bg-primary text-white">
                        <h5 class="card-title forecastDate">${json.list[i].main.date}</h5>
                        <img class="weather_image" src="http://openweathermap.org/img/w/${json.list[i].weather[0].icon}.png" alt="Current Weather Image">
                        <p class="temperature">${json.list[i].main.temp}&#176F</p>
                        <p class="humidity">${json.list[i].main.humidity}%</p>
                    </div>
                </div>`
                $("#forecastDiv").append(cardTemplate);
            }
        });
    })

    // Optional Code for temperature conversion
    var fahrenheit = true;

    $("#convertToCelsius").click(function() {
        if (fahrenheit) {
            $("#temperature").text(((($("#temperature").text() - 32) * 5) / 9));
        }
        fahrenheit = false;
    });

    $("#convertToFahrenheit").click(function() {
        if (fahrenheit == false) {
            $("#temperature").text((($("#temperature").text() * (9/5)) + 32));
        }
        fahrenheit = true;

    });
    
});