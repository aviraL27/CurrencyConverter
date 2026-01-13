const countryList = {
    USD: "US",
    INR: "IN",
    EUR: "EU",
    GBP: "GB",
    JPY: "JP",
    AUD: "AU",
    CAD: "CA"
};

const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");
const btn = document.getElementById("convert");
const result = document.getElementById("result");

for (let curr in countryList) {
    let option1 = document.createElement("option");
    option1.value = curr;
    option1.innerText = curr;
    fromSelect.append(option1);

    let option2 = document.createElement("option");
    option2.value = curr;
    option2.innerText = curr;
    toSelect.append(option2);
}

fromSelect.value = "USD";
toSelect.value = "INR";

function updateFlag(select, img) {
    let countryCode = countryList[select.value];
    img.src = `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
}

updateFlag(fromSelect, fromFlag);
updateFlag(toSelect, toFlag);

fromSelect.addEventListener("change", () => {
    updateFlag(fromSelect, fromFlag);
});

toSelect.addEventListener("change", () => {
    updateFlag(toSelect, toFlag);
});

btn.addEventListener("click", async () => {
    let amount = document.getElementById("amount").value;
    let from = fromSelect.value;
    let to = toSelect.value;

    const URL = `https://api.exchangerate-api.com/v4/latest/${from}`;
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data.rates[to];
    let finalAmount = amount * rate;

    result.innerText = `${amount} ${from} = ${finalAmount.toFixed(2)} ${to}`;
});
