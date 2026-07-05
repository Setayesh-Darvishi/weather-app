// dark mode
const btnDarkMode = document.getElementById("btn-dark-mode");

btnDarkMode.addEventListener("click", function(){
    document.body.classList.toggle("dark-mode");
});

// weather section
const weatherApiTehran = "https://api.open-meteo.com/v1/forecast?latitude=35.6944&longitude=51.4215&current=temperature_2m,precipitation,rain,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code&start_date=2026-02-25&end_date=2026-03-04";
const weatherApiLahijan = "https://api.open-meteo.com/v1/forecast?latitude=37.2042&longitude=50.0092&current=temperature_2m,precipitation,rain,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code&start_date=2026-02-25&end_date=2026-03-04";
const weatherApiKish = "https://api.open-meteo.com/v1/forecast?latitude=26.5578&longitude=54.0194&current=temperature_2m,precipitation,rain,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code&start_date=2026-02-25&end_date=2026-03-04";

async function showWeather(url, tempID, windID, rainID) {
    try{
        const response = await fetch(url);
        const parse = await response.json();

        const temp = parse.current.temperature_2m;
        const wind = parse.current.wind_speed_10m;
        const rain = parse.current.rain;

        document.getElementById(tempID).innerText = temp + "°C";
        document.getElementById(windID).innerText = wind + "km/h";
        document.getElementById(rainID).innerText = rain + "mm";
    } catch(error) {
        console.log("there is a problem -> ",error);
    }
}

showWeather(weatherApiTehran, "temp-tehran", "wind-tehran", "rain-tehran");
showWeather(weatherApiLahijan, "temp-lahijan", "wind-lahijan", "rain-lahijan");
showWeather(weatherApiKish, "temp-kish", "wind-kish", "rain-kish");


// weather section more
const btnMore = document.querySelectorAll(".more-info");
const weatherBox = document.querySelector(".weather-box-more");

btnMore.forEach(function(btn){
    btn.addEventListener("click", function(e){
        //****important********

        // console.log(this);
        const cityName = e.target.dataset.city;  
        // console.log(cityName);
        const targetBox = document.getElementById(`details-${cityName}`);
        // console.log(targetBox);

        targetBox.classList.toggle("hide-box"); 

        async function getMoreInfo(url, windSpeedID, windDirectionId, windGustsID){
                try{
                    const response = await fetch(url);
                    const parse = await response.json();

                    const windSpeed = parse.current.wind_speed_10m;
                    const windGusts = parse.current.wind_direction_10m;
                    const windDirection = parse.current.wind_gusts_10m;

                    document.getElementById(windSpeedID).innerText = windSpeed + "km/h";
                    document.getElementById(windDirectionId).innerText = windDirection + "°";
                    document.getElementById(windGustsID).innerText = windGusts + "km/h";
                } catch(error) {
                    console.log("there is a problem -> ",error);
                }
            }

        getMoreInfo(weatherApiTehran, "wind-speed-tehran", "wind-direction-tehran", "wind-gusts-tehran");
        getMoreInfo(weatherApiLahijan, "wind-speed-lahijan", "wind-direction-lahijan", "wind-gusts-lahijan");
        getMoreInfo(weatherApiKish, "wind-speed-kish", "wind-direction-kish", "wind-gusts-kish");

        });

});