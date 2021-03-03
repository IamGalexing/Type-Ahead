const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const inputRef = document.querySelector(".search-form .search");
const resultListRef = document.querySelector(".suggestions");
const cities = [];

fetch(endpoint)
  .then((data) => data.json())
  .then((data) => cities.push(...data));

inputRef.addEventListener("keyup", markup);

function markup() {
  const citiesArr = findMatches(this.value, cities);

  const list = citiesArr
    .map((place) => {
      const regex = new RegExp(this.value, "gi");

      const cityName = place.city.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );

      return `<li>
        <span class='name'>${cityName}, ${stateName}</span>
        <span class='population'>${numberWithCommas(place.population)}</span>
        </li>
        `;
    })
    .join("");

  resultListRef.innerHTML = list;
}

function findMatches(input, cities) {
  return cities.filter((city) => {
    if (city.city.includes(input) || city.state.includes(input)) return city;
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
