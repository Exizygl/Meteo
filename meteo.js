const apiKey = "9da1832b525090888a4f7bfde3e24677";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const weatherCondition = {

    200 : "orage avec pluie légère",
    201 : "orage avec pluie",
    202 : "orage avec de fortes pluie",
    210 : "orage léger",
    211 : "orage",
    212 : "violent orage",
    221 : "orage violent",
    230 : "orage avec légère bruine",
    231 : "orage avec bruine",
    232 : "orage avec forte bruine",

    300 : "bruine de faible intensité",
    301 : "bruine",
    302 : "bruine de forte intensité",
    310 : "pluie fine et légère",
    311 : "pluie fine",
    312 : "pluie fine de forte intensité",
    313 : "averse, pluie et bruine",
    314 : "fortes averses, pluie et bruine",
    321 : "arverse, bruine",

    500 : "pluie légère",
    501 : "pluie modérée",
    502 : "pluie de forte intensité",
    503 : "pluie très forte",
    504 : "pluie extrême",
    511 : "pluie verglaçante",
    520 : "averse de faible intensité",
    521 : "averse",
    522 : "averse intense",
    531 : "averse de forte intensité",

    600 : "légère neige",
    601 : "neige",
    602 : "fortes chutes de neige",
    611 : "neige moullié",
    612 : "légère averse de neige fondue",
    613 : "averse de neige fondue",
    615 : "pluie légère et neige",
    616 : "pluie et neige",
    620 : "légère averse de neige",
    621 : "averse de neige",
    622 : "fortes averses de neige",

    701 : "brume",
    711 : "fumée",
    721 : "brume",
    731 : "tourbillons de sable/poussière",
    741 : "brouillard",
    751 : "sable",
    761 : "poussière",
    762 : "cendre volcanique",
    771 : "rafales",
    781 : "tornade",

    800 : "ciel clair",
    801 : "quelques nuages",
    802 : "nuages éparse ",
    803 : "nuages fréquent",
    804 : "ciel vouvert",

}
window.onload = function () {


    async function getJson() {
        const response = await fetch("./conf.json");
        const data = await response.json();
        return data;
    }


    //Function to call Api

    async function callApi(apiCall) {
        const response = await fetch(apiCall);
        
        const data = await response.json();
        
        
        
        var icon = data.weather[0].icon;
        
        var weather = weatherCondition[data.weather[0].id];

        

        var temp =Math.round(data.main.feels_like + 273.15)
        
        var windSpeed = data.wind.speed
        
        var humidity = data.main.humidity;
        
        var iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        
        document.getElementById("weatherIcon").src = iconURL;

        document.getElementById("weatherCondition").innerHTML = weather;
        document.getElementById("windSpeed").innerHTML = windSpeed + " m/s";
        document.getElementById("humidity").innerHTML = humidity + "%";
        document.getElementById("degree").innerHTML = temp + "°c";

    }

    function updateCall(apiCall) {
        callApi(apiCall);

        var nextCall = new Date();



        nextCall.setHours(nextCall.getHours() + 1);
        nextCall.setMinutes(0);
        nextCall.setSeconds(0);

        var timeleft = nextCall - new Date();
        setTimeout(() => {
            callApi(apiCall)
            setInterval(callApi, 3600000, apiCall);
        }, timeleft, apiCall);




    }


  
        async function main() {

            const dataCity = await getJson();
            console.log(dataCity)
            const apiCall = apiUrl + dataCity.city + "," + dataCity.countryCode + "&appid=" + apiKey;

            // await callApi(apiCall);
            updateCall(apiCall);

        }



        main()
  
}