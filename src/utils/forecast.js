const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=56eceaa9efef0f4f0be8912fe3832577&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) callback("Unable to connect to location service.");
        else if (body.error)
            callback("Unable to find location. Try another search.");
        else
            callback(
                undefined,
                `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} celsius out. It feels like ${body.current.feelslike} celsius out`
            );
    });
};

module.exports = forecast;
