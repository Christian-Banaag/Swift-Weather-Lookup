const form = document.querySelector(".input-section form");
const input = document.querySelector(".input-section input");
const errmsg = document.querySelector(".input-section .errmsg");
const list = document.querySelector(".output-section .cities");
const apiKey = "3ca235f6e7e67a867d4faa797f537ec3";

form.addEventListener("submit", e => {
  e.preventDefault();
  const listItems = list.querySelectorAll(".output-section .city");
  const inputVal = input.value;
  const unitType = document.getElementById('units').value

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=${unitType}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°${unitType === 'metric' ? 'C' : 'F'}</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      errmsg.textContent = "Error: City not found, please try again.";
    });

    errmsg.textContent = "";
  form.reset();
  input.focus();
});