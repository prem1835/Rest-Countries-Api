const search_input = document.querySelector(".search-input");
const ul = document.querySelector(".countries-list");
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const country__details = document.querySelector(".country__details");
const wrapper = document.querySelector(".wrapper");
const darkMode = document.querySelector(".topbar__theme--switcher");
const bodyW = document.body;
const optionsList = document.querySelectorAll(".option");

let search_term = "";
let region_term = "";
let countries;

const fetchCountries = async () => {
  countries = await fetch("https://restcountries.eu/rest/v2/all").then((res) =>
    res.json()
  );
};

// Displaying the data
const showCountries = async () => {
  ul.innerHTML = "";

  await fetchCountries();

  countries
    .filter((country) =>
      country.name.toLowerCase().includes(search_term.toLocaleLowerCase())
    )
    .filter((country) => country.region.includes(region_term))
    .forEach((country) => {
      //   creating the structure
      const li = document.createElement("li");
      li.classList.add("country-item");

      const country_flag = document.createElement("img");
      country_flag.src = country.flag;
      country_flag.classList.add("country_flag");

      const div = document.createElement("div");
      div.classList.add("country__flag");

      const country_textbox = document.createElement("div");
      country_textbox.classList.add("country-textbox");

      const country_name = document.createElement("h3");
      country_name.innerText = country.name;
      country_name.classList.add("country-name");

      const country_population = document.createElement("h4");
      country_population.innerHTML = `Population: <span>${numberWithCommas(
        country.population
      )}</span>`;

      const country_region = document.createElement("h4");
      country_region.innerHTML = `Region: <span>${country.region}</span>`;

      const country_capital = document.createElement("h4");
      country_capital.innerHTML = `Capital: <span>${country.capital}</span>`;

      country_textbox.appendChild(country_name);
      country_textbox.appendChild(country_population);
      country_textbox.appendChild(country_region);
      country_textbox.appendChild(country_capital);
      div.appendChild(country_flag);

      li.appendChild(div);
      li.appendChild(country_textbox);

      ul.appendChild(li);

      li.addEventListener("click", (e) => {
        wrapper.classList.add("close");
        country__details.classList.remove("close");

        // creating details page

        country__details.innerHTML = `
        <button class='detail-btn'>&larr; Back</button>
        <div class="detail__row d-flex">
        <div class='coloumn1 coloumn'>
        <img class='detail__img' src='${country.flag}'></div>
        <div class='coloumn2 coloumn'>
        <div class='col2row1 d-flex'>
        <div class="col2row1col1">
        <h3 class='detail__heading'>${country.name}</h3>
        <p class='para'>Nativ Name: <span>${country.nativeName}</span></p>
        <p class='para'>Population: <span>${country.population}</span></p>
        <p class='para'>Region: <span>${country.region}</span></p>
        <p class='para'>Sub Region: <span>${country.subregion}</span></p>
        <p class='para'>Capital: <span>${country.capital}</span></p>
        </div>
        <div class="col2row1col2">
        <p class='para'>Top Level Domain: <span>${
          country.topLevelDomain
        }</span></p>
        <p class='para'>Currencies: <span>${country.currencies.map(
          (cur) => cur.name
        )}</span></p>
        <p class='para'>Languages: <span>${country.languages.map(
          (x) => x.name
        )}</span></p>
        </div>
        </div>
        </div>
        </div>
        `;
        const getBtn = document.querySelector(".detail-btn");
        getBtn.addEventListener("click", () => {
          wrapper.classList.remove("close");
          country__details.classList.toggle("close");
        });
      });
    });
};
showCountries();

search_input.addEventListener("input", (e) => {
  search_term = e.target.value;
  showCountries();
});

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

optionsList.forEach((o) => {
  o.addEventListener("click", () => {
    let value = o.querySelector("label").innerHTML;
    selected.innerHTML = value;
    optionsContainer.classList.remove("active");
    region_term = value;
    showCountries();
  });
});

darkMode.addEventListener("click", () => {
  bodyW.classList.toggle("dark-mode");
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
