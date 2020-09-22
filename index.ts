let currLocation = document.getElementById("location") as HTMLElement;
let temperature = document.getElementById("temp") as HTMLElement;
let tempType = document.getElementById("type") as HTMLElement;
let changeUnit = document.getElementById("change-unit") as HTMLElement;
let icon = document.getElementById("icon") as HTMLImageElement;
let weather = document.getElementById("weather") as HTMLElement;
let unit: string = "m"

const getPosition = (): Promise<any> => {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej)
    });
}

const api = async (val: string): Promise<any> => {
    const res: any = await fetch(val)
    const jsonRes: any = await res.json()
    temperature.innerHTML = jsonRes.current.temperature
    currLocation.innerHTML = `${jsonRes.location.name}, ${jsonRes.location.country}`
    icon.src = jsonRes.current.weather_icons[0]
    weather.innerHTML = jsonRes.current.weather_descriptions[0]
}

getPosition()
    .then((position): void => {
        const { latitude, longitude } = position.coords
        api(`http://api.weatherstack.com/current?access_key=fc815987202bc4433486b310e1805e20&query=${latitude},${longitude}&units=${unit}`)

        changeUnit.addEventListener("click", (): void => {
            tempType.innerHTML === "Celsius" ? tempType.innerHTML = "Fahrenheit" : tempType.innerHTML = "Celsius"
            unit = tempType.innerHTML === "Celsius" ? "m" : "f"
            api(`http://api.weatherstack.com/current?access_key=fc815987202bc4433486b310e1805e20&query=${latitude},${longitude}&units=${unit}`)
        });

    })
