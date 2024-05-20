const airports = {
    "EFKT": {
        frequencies: [
            "EFKT_GND 120.8 MHz",
            "EFKT_TWR 119.7 MHz",
            "EFKT_APP 118.950 MHz"
        ],
        charts: [
            "Ground Movement",
            "SIDs 34",
            "STARs 34"
        ]
    },
    "EGHI": {
        frequencies: [
            "EGHI_TWR 118.2 MHz",
            "EGHI_APP 122.725 MHz"
        ],
        charts: [
            "Ground Movement"
        ]
    },
    "EGKK": {
        frequencies: [
            "EGKK_DEL 121.955 MHz",
            "EGKK_GND 121.805 MHz",
            "EGKK_TWR 124.230 MHz",
            "EGKK_F_APP 126.825 MHz",
            "LON_S_CTR 129.430 MHz"
        ],
        charts: [
            "Ground Movement",
            "SIDs 26L",
            "STARs 26L"
        ]
    },
    "GCLP": {
        frequencies: [
            "GCLP_DEL 125.0 MHz",
            "GCLP_GND 121.7 MHz",
            "GCLP_TWR 118.3 MHz",
            "GCLP_GCA_APP 124.3 MHz"
        ],
        charts: [
            "Ground Movement",
            "SIDs 03L & 03R",
            "SIDs 21L & 21R",
            "STARs 03L & 03R",
            "STARs 21L & 21R"
        ]
    },
    "GVBA": {
        frequencies: [
            "GVBA_TWR 118.9 MHz"
        ],
        charts: [
            "Ground Movement",
            "SIDs 03 & 21",
            "STARs 03 & 21"
        ]
    },
    "LEMH": {
        frequencies: [
            "LEMH_GND 121.750 MHz",
            "LEMH_TWR 118.2 MHz",
            "LEMH_APP 119.650 MHz"
        ],
        charts: [
            "Ground Movement",
            "SIDs 01",
            "STARs 01"
        ]
    },
    "LYTV": {
        frequencies: [
            "LYTV_TWR 118.0 MHz",
            "LYTV_APP 118.0 MHz"
        ],
        charts: [
            "Ground Movement",
            "SIDs 14 & 32",
            "STARs 14 & 32"
        ]
    }
};

let currentAirport = "EGKK";
let chartIndex = 0;

const airportSelect = document.querySelector("#airportSelect");
const frequencyContainer = document.querySelector("#frequencyContainer");
const chartDisplay = document.querySelector("#chartDisplay > img");

for(const airport of Object.keys(airports)) {
    var option = document.createElement("option");
    option.innerHTML = airport;
    airportSelect.appendChild(option);
}
airportSelect.selectedIndex = Object.keys(airports).indexOf(currentAirport);

function airportChange() {
    currentAirport = airportSelect.options[airportSelect.selectedIndex].text;
    chartIndex = 0;
    chartDisplay.src = "charts/" + currentAirport + "/" + airports[currentAirport].charts[chartIndex] + ".png";

    const frequencies = airports[currentAirport].frequencies;
    frequencyContainer.innerHTML = "";
    for(const frequency of frequencies) {
        frequencyContainer.innerHTML += "<div>" + frequency + "</div>";
    }
}

function nextChart() {
    chartIndex++;
    if(chartIndex > airports[currentAirport].charts.length - 1)
        chartIndex = 0;

    chartDisplay.src = "charts/" + currentAirport + "/" + airports[currentAirport].charts[chartIndex] + ".png";
}

function previousChart() {
    chartIndex--;
    if(chartIndex < 0)
        chartIndex = airports[currentAirport].charts.length - 1;

    chartDisplay.src = "charts/" + currentAirport + "/" + airports[currentAirport].charts[chartIndex] + ".png";
}

airportChange();