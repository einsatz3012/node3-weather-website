const weatherForm = document.querySelector("form");
const textInput = document.querySelector("input[type=text]");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const address = textInput.value;

    console.log("Provided address: ", address);
    message1.textContent = "Loading...";
    message2.textContent = "";

    fetch("http://localhost:3000/weather?address=" + address)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message1.textContent = data.error;
                } else {
                    message1.textContent = data.location;
                    message2.textContent = data.forecast;
                }
                textInput.value = "";
            });
        })
        .catch((err) => (message1.textContent = err));
});
