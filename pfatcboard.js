const airports = {
    "EFKT": {
        name: "Kittila Airport",
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
        name: "Southhampton Airport",
        frequencies: [
            "EGHI_TWR 118.2 MHz",
            "EGHI_APP 122.725 MHz"
        ],
        charts: [
            "Ground Movement"
        ]
    },
    "EGKK": {
        name: "London Gatwick Airport",
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
        name: "Gran Canaria Airport",
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
        name: "In memory of Boa Vista Rabil/Aristides Pereira International Airport",
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
        name: "Menorca Airport",
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
        name: "Tivat Airport",
        frequencies: [
            "LYTV_TWR 118.0 MHz",
            "LYTV_APP 118.0 MHz"
        ],
        charts: [
            "Ground Movement",
            "SIDs 14 & 32",
            "STARs 14 & 32"
        ]
    },
    "MDPC": {
        name: "Punta Cana International Airport",
        frequencies: [
            "MDPC_DEL 121.650 MHz",
            "MDPC_GND 121.9 MHz",
            "MDPC_TWR 118.8 MHz",
            "MDPC_APP 119.750 MHz",
            "MDCS_CTR 124.3 MHz",
        ],
        charts: [
            "Ground Movement",
            "Apron"
        ]
    },
    "MDAB": {
        name: "Arroyo Barril Airport",
        frequencies: [
            "MDAB_TWR 118.450 MHz"
        ],
        charts: [
            "Ground Movement"
        ]
    }
};

let currentAirport = "EGKK";
let chartIndex = 0;

const airportSelect = document.querySelector("#airportSelect");
const airportNameText = document.querySelector("#airportName");
const weatherText = document.querySelector("#weather");
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

    airportNameText.innerHTML = airports[currentAirport].name;

    const frequencies = airports[currentAirport].frequencies;
    frequencyContainer.innerHTML = "";
    for(const frequency of frequencies) {
        frequencyContainer.innerHTML += "<div>" + frequency + "</div>";
    }

    updateMetar();
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

function updateMetar() {
    console.log("Updating METAR");
    fetch("https://metar.vatsim.net/metar.php?id=" + currentAirport).then(response => {
        return response.text();
    }).then(metar => {
        const metarSplit = metar.split(" ");
        weatherText.innerHTML = metarSplit[1].slice(2, 8);
        for(const part of metarSplit) {
            if(part.endsWith("KT"))
                weatherText.innerHTML += " " + part.slice(0, 3) + "/" + part.slice(3, 5);
            if(part.startsWith("Q"))
                weatherText.innerHTML += " " + part;
        }
    });
}

airportChange();
setInterval(updateMetar, 60000);
