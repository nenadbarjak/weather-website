const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/e156089a932cf3064c1b9da294a9abbc/${latitude},${longitude}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temp = body.currently.temperature
            const chance = body.currently.precipProbability
            const summary = body.daily.data[0].summary

            callback(undefined, `${summary} It is currently ${temp} degrees out. There is ${chance}% chance of rain.`)
        }
    })
}

module.exports = forecast