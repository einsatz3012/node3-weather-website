const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geocode");

const app = express();

// Define paths for express config
const PUBLIC_DIRECTORY_PATH = path.join(__dirname, "../public");
const VIEWS_PATH = path.join(__dirname, "../templates/views");
const PARTIALS_PATH = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);
hbs.registerPartials(PARTIALS_PATH);

// Setup static directory to serve
app.use(express.static(PUBLIC_DIRECTORY_PATH));

app.get("", (req, res) => {
    res.render("index", { title: "Weather App", name: "Rushikesh" });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About me", name: "Rushikesh" });
});

app.get("/help", (req, res) => {
    res.render("help", { title: "Help Page", name: "Rushikesh" });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Rushikesh",
        errorMessage: "Help article not found",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address)
        return res.send({ error: "Please provide an address" });

    geoCode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) return res.send({ error });

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) return res.send({ error });
                res.send({
                    address: req.query.address,
                    location: location,
                    forecast: forecastData,
                });
            });
        }
    );
});

app.get("/product", (req, res) => {
    if (!req.query.search)
        return res.send({ error: "Please provide the search term" });
    console.log(req.query, req.params);
    res.send({});
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Rushikesh",
        errorMessage: "Page not found",
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
