const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/chart.js";
document.head.appendChild(script);

let covidChart;

async function getCovidData(){

const country =
document.getElementById("country").value;

const response = await fetch(
`https://disease.sh/v3/covid-19/countries/${country}`
);

const data = await response.json();

document.getElementById("flag").innerHTML = `
<img src="${data.countryInfo.flag}">
<h2>${data.country}</h2>
`;

document.getElementById("stats").innerHTML = `
<div class="card">
<h3>Total Cases</h3>
<p>${data.cases.toLocaleString()}</p>
</div>

<div class="card">
<h3>Recovered</h3>
<p>${data.recovered.toLocaleString()}</p>
</div>

<div class="card">
<h3>Deaths</h3>
<p>${data.deaths.toLocaleString()}</p>
</div>

<div class="card">
<h3>Active Cases</h3>
<p>${data.active.toLocaleString()}</p>
</div>

<div class="card">
<h3>Population</h3>
<p>${data.population.toLocaleString()}</p>
</div>

<div class="card">
<h3>Tests</h3>
<p>${data.tests.toLocaleString()}</p>
</div>
`;

if(covidChart){
covidChart.destroy();
}

covidChart = new Chart(
document.getElementById("chart"),
{
type:"bar",
data:{
labels:[
"Recovered",
"Active",
"Deaths"
],
datasets:[{
label:"COVID Statistics",
data:[
data.recovered,
data.active,
data.deaths
],
backgroundColor:[
"green",
"orange",
"red"
]
}]
},
options:{
responsive:true
}
}
);
}

// Default India
window.onload = () => {
getCovidData();
};