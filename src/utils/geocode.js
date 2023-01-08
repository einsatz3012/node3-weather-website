const request = require("request");

const geoCode = (address, callback, limit = 1) => {
    const geoURL = `http://api.positionstack.com/v1/forward?access_key=254121173b9e99efae98c08fbc33f06c&query=${encodeURIComponent(
        address
    )}&limit=${limit}`;

    request({ url: geoURL, json: true }, (error, { body }) => {
        if (error) callback("Unable to connect to location service.");
        else if (body.error || !body.data[0])
            callback("Unable to find location. Try another search.");
        else
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label,
            });
    });
};

module.exports = geoCode;
