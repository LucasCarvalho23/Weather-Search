class WeatherSearch {

    constructor() {
        
        this.searchForm = document.querySelector ("#search-form-id")
        this.radioWeatherName = document.getElementsByName ("radio-weather-name")
        this.searchButton = document.querySelector ("#search-button-id")
        this.resultDiv = document.querySelector ("#result-id")
        this.resultLocation = document.querySelector ("#result-location-id")
        this.resultWeather = document.querySelector ("#result-weather-id")
        this.resultType = document.querySelector ("#result-type-id")
        this.image = document.querySelector ("#image-id")

        this.searchForm.focus()

        // RADIO SELECTED
        this.radioSelect()

        this.searchButton.addEventListener ("click", () => this.buttonSearchFunction())
    }


    // RADIO SELECTED

    radioSelect() {
        
        if (this.radioWeatherName[0].checked == true) {
            this.finalResult = 'Celsius'    
        } else if (this.radioWeatherName[1].checked == true) {
            this.finalResult = 'Fahrenheit'
        } else if (this.radioWeatherName[2].checked == true) {
            this.finalResult = 'Kelvin'
        }

    }


    //BUTTON SEARCH

    buttonSearchFunction() {
        this.converteLatLong = "http://api.openweathermap.org/geo/1.0/direct?q=" + this.searchForm.value + "&limit=5&appid=8db2ce0a2a8e6e44bc875ab7b9838481"

        this.transformAPI()

        console.log (this.finalResult)
    }

    
    // TRANSFORM LOCATION IN LATITUDE AND LONGITUDE 

    async transformAPI() {
        this.response = await fetch (this.converteLatLong)
        this.data = await this.response.json() 
        this.resultLocation.innerHTML = "Location: " + this.data[0].name
        this.latitude = this.data[0].lat
        this.longitude = this.data[0].lon
        this.resultAPI()
    }

    async resultAPI() {
        this.urlFinal = "https://api.openweathermap.org/data/2.5/weather?lat="+this.latitude+"&lon="+this.longitude+"&appid=8db2ce0a2a8e6e44bc875ab7b9838481"
        
        this.response2 = await fetch (this.urlFinal)
        this.data2 = await this.response2.json()
        
        this.transformTemp()

        this.resultWeather.innerHTML = 'Weather: ' + this.temperature + 'º'
        this.resultType.innerHTML = 'Description: ' + this.data2.weather[0].description

        this.functionImage()
    }

    transformTemp() {
        if (this.radioWeatherName[0].checked == true) {
            this.temperature = this.data2.main.temp - 273,15
        } else if (this.radioWeatherName[1].checked == true) {
            this.temperature = (this.data2.main.temp - 273,15) * 9/5 + 32
        } else if (this.radioWeatherName[2].checked == true) {
            this.temperature = this.data2.main.temp
        }

        this.temperature = this.temperature.toFixed(2)
    }

    functionImage() {

        this.dateToday = new Date()
        this.agora = this.dateToday.getHours()
        
        if (this.agora <= 17) {
            
            // Day

            if (this.data2.weather[0].description == "scattered clouds" || this.data2.weather[0].description == "clear sky") {
                this.image.src = "./image/dia-limpo.jpg"
            } else if (this.data2.weather[0].description == "overcast clouds" || this.data2.weather[0].description == "broken clouds") {
                this.image.src = "./image/dia-nublado.png"
            } else if (this.data2.weather[0].description == "light rain" || this.data2.weather[0].description == "moderate rain" || this.data2.weather[0].description == "drizzle") {
                this.image.src = "./image/dia-chuva.jfif"
            }

        } else if (this.agora > 18) {
            // Night
            if (this.data2.weather[0].description == "scattered clouds" || this.data2.weather[0].description == "clear sky") {
                this.image.src = "./image/noite-limpa.jpg"
            } else if (this.data2.weather[0].description == "overcast clouds" || this.data2.weather[0].description == "broken clouds") {
                this.image.src = "./image/noite-nublado.png"
            } else if (this.data2.weather[0].description == "light rain" || this.data2.weather[0].description == "moderate rain" || this.data2.weather[0].description == "drizzle") {
                this.image.src = "./image/noite-chuva.jpeg"
            }
        }

    }

}

const weatherSearch = new WeatherSearch()