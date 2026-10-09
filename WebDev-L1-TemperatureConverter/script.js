const converterForm =
    document.getElementById("converterForm");

const temperatureInput =
    document.getElementById("temperature");

const fromUnit =
    document.getElementById("fromUnit");

const toUnit =
    document.getElementById("toUnit");

const convertButton =
    document.getElementById("convertButton");

const resetButton =
    document.getElementById("resetButton");

const swapButton =
    document.getElementById("swapButton");

const resultValue =
    document.getElementById("resultValue");

const resultSummary =
    document.getElementById("resultSummary");

const errorMessage =
    document.getElementById("errorMessage");

const unitNames = {
    C: "Celsius",
    F: "Fahrenheit",
    K: "Kelvin"
};


const unitSymbols = {
    C: "°C",
    F: "°F",
    K: "K"
};

function validateInput(value, unit) {

    if (value.trim() === "") {
        return "Please enter a temperature.";
    }

    if (!Number.isFinite(Number(value))) {
        return "Please enter a valid temperature.";
    }

    const temperature = Number(value);

    if (unit === "C" && temperature < -273.15) {
        return "Celsius temperature cannot be below -273.15°C.";
    }

    if (unit === "F" && temperature < -459.67) {
        return "Fahrenheit temperature cannot be below -459.67°F.";
    }

    if (unit === "K" && temperature < 0) {
        return "Kelvin temperature cannot be below 0 K.";
    }

    return "";
}

function formatResult(value) {

    return Number(value.toFixed(2)).toString();
}


function convertTemperature() {

    const inputValue =
        temperatureInput.value;

    const source =
        fromUnit.value;

    const target =
        toUnit.value;

    const validationError =
        validateInput(inputValue, source);


    errorMessage.textContent =
        validationError;

    if (validationError) {

        resultValue.textContent = "—";

        resultSummary.textContent =
            "Enter a valid temperature to continue.";

        return;
    }


    const value =
        Number(inputValue);


    let convertedValue;

    if (source === target) {

        convertedValue = value;
    }

    else if (
        source === "C" &&
        target === "F"
    ) {

        convertedValue =
            (value * 9 / 5) + 32;
    }

    else if (
        source === "F" &&
        target === "C"
    ) {

        convertedValue =
            (value - 32) * 5 / 9;
    }

    else if (
        source === "C" &&
        target === "K"
    ) {

        convertedValue =
            value + 273.15;
    }

    else if (
        source === "K" &&
        target === "C"
    ) {

        convertedValue =
            value - 273.15;
    }

    else if (
        source === "F" &&
        target === "K"
    ) {

        convertedValue =
            (value - 32) * 5 / 9 + 273.15;
    }

    else if (
        source === "K" &&
        target === "F"
    ) {

        convertedValue =
            (value - 273.15) * 9 / 5 + 32;
    }

    if (!Number.isFinite(convertedValue)) {

        errorMessage.textContent =
            "Unable to calculate the result.";

        resultValue.textContent = "—";

        resultSummary.textContent =
            "Please enter a valid temperature.";

        return;
    }

    if (
        target === "K" &&
        convertedValue < 0
    ) {

        errorMessage.textContent =
            "The resulting Kelvin temperature cannot be below 0 K.";

        resultValue.textContent = "—";

        resultSummary.textContent =
            "Please enter a higher temperature.";

        return;
    }

    if (
        Math.abs(convertedValue) < 0.000000001
    ) {

        convertedValue = 0;
    }

    const formattedInput =
        formatResult(value);

    const formattedResult =
        formatResult(convertedValue);


    resultValue.textContent =
        `${formattedResult} ${unitSymbols[target]}`;


    resultSummary.textContent =
        `${formattedInput} ${unitSymbols[source]} = ` +
        `${formattedResult} ${unitNames[target]}`;

    errorMessage.textContent = "";
}

function resetConverter() {

    temperatureInput.value = "";

    fromUnit.value = "C";

    toUnit.value = "F";


    resultValue.textContent = "—";


    resultSummary.textContent =
        "Enter a temperature and select your units to see the result.";


    errorMessage.textContent = "";

    temperatureInput.focus();
}

function swapUnits() {

    const currentFrom =
        fromUnit.value;

    fromUnit.value =
        toUnit.value;

    toUnit.value =
        currentFrom;

    if (
        temperatureInput.value.trim() !== ""
    ) {

        convertTemperature();
    }
}

converterForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        convertTemperature();
    }
);

convertButton.addEventListener(
    "click",
    convertTemperature
);

resetButton.addEventListener(
    "click",
    resetConverter
);

swapButton.addEventListener(
    "click",
    swapUnits
);

temperatureInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            convertTemperature();
        }
    }
);

temperatureInput.addEventListener(
    "input",
    function () {

        if (
            errorMessage.textContent !== ""
        ) {

            errorMessage.textContent = "";
        }
    }
);