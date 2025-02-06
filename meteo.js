const apiKey = "9da1832b525090888a4f7bfde3e24677";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const weatherCondition = {

    200 : "Orage avec pluie légère",
    201 : "Orage avec pluie",
    202 : "Orage avec de fortes pluie",
    210 : "Orage léger",
    211 : "Orage",
    212 : "Violent orage",
    221 : "Orage violent",
    230 : "Orage avec légère bruine",
    231 : "Orage avec bruine",
    232 : "Orage avec forte bruine",

    300 : "Bruine de faible intensité",
    301 : "Bruine",
    302 : "Bruine de forte intensité",
    310 : "Pluie fine et légère",
    311 : "Pluie fine",
    312 : "Pluie fine de forte intensité",
    313 : "Averse, pluie et bruine",
    314 : "Fortes averses, pluie et bruine",
    321 : "Arverse, bruine",

    500 : "Pluie légère",
    501 : "Pluie modérée",
    502 : "Pluie de forte intensité",
    503 : "Pluie très forte",
    504 : "Pluie extrême",
    511 : "Pluie verglaçante",
    520 : "Averse de faible intensité",
    521 : "Averse",
    522 : "Averse intense",
    531 : "Averse de forte intensité",

    600 : "Légère neige",
    601 : "Neige",
    602 : "Fortes chutes de neige",
    611 : "Neige moullié",
    612 : "Légère averse de neige fondue",
    613 : "Averse de neige fondue",
    615 : "Pluie légère et neige",
    616 : "Pluie et neige",
    620 : "Légère averse de neige",
    621 : "Averse de neige",
    622 : "Fortes averses de neige",

    701 : "Brume",
    711 : "Fumée",
    721 : "Brume",
    731 : "Tourbillons de sable/poussière",
    741 : "Brouillard",
    751 : "Sable",
    761 : "Poussière",
    762 : "Cendre volcanique",
    771 : "Rafales",
    781 : "Tornade",

    800 : "Ciel clair",
    801 : "Quelques nuages",
    802 : "Nuages éparse ",
    803 : "Nuages fréquent",
    804 : "Ciel couvert",

}
window.onload = function () {

    //récupération des donnée de ville
    async function getJson() {
        const response = await fetch("./conf.json");
        const data = await response.json();
        return data;
    }


    //Function to call Api

    async function callApi(apiCall) {
        const response = await fetch(apiCall);
        
        const data = await response.json();
        
        //assignement et traitement des variables de l'api 
        var icon = data.weather[0].icon;
        
        var weather = weatherCondition[data.weather[0].id];
        
        var temp =Math.round(data.main.feels_like - 273.15)
        
        var windSpeed = Math.round(data.wind.speed * 3.6)
        
        var humidity = data.main.humidity;
        
        var iconURL = "./img/" + icon + ".svg";
        
        //modification front
        document.getElementById("weatherIcon").src = iconURL;
        document.getElementById("weatherCondition").innerHTML = weather;
        document.getElementById("windSpeed").innerHTML = windSpeed + " K/H";
        document.getElementById("humidity").innerHTML = humidity + "%";
        document.getElementById("degree").innerHTML = temp + "°c";

    }

    function updateCall(apiCall) {
        //premier appel de l'API
        callApi(apiCall);
        
        //calacul du temps restant avant la prochaine heure
        var nextCall = new Date();
        nextCall.setHours(nextCall.getHours() + 1);
        nextCall.setMinutes(0);
        nextCall.setSeconds(0);

        var timeleft = nextCall - new Date();
        
        //2nd appel à l'heure pile puis un intervale d'une heure entre chaque appel
        setTimeout(() => {
            callApi(apiCall)
            setInterval(callApi, 3600000, apiCall);
        }, timeleft, apiCall);




    }



        async function main() {
            const dataCity = await getJson();
            const apiCall = apiUrl + dataCity.city + "," + dataCity.countryCode + "&appid=" + apiKey;
            updateCall(apiCall);
        }



        main()

}