/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// @returns {Freelancer}
function makeFreeLancer() {
  const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
  const randomOccupation =
    OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const randomRate =
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) +
    PRICE_RANGE.min;

  return { name: randomName, occupation: randomOccupation, rate: randomRate };
}

console.log(makeFreeLancer());

const freelancers = Array.from({ length: NUM_FREELANCERS }, makeFreeLancer);

console.log(freelancers);

// @returns {number}
function getAverageRate(freelancers) {
  const totalRate = freelancers.reduce(
    (total, freelancer) => total + freelancer.rate,
    0
  );
  return totalRate / freelancers.length;
}

function FreelancerRow({ name, occupation, rate }) {
  const $tr = document.createElement("tr");
  $tr.innerHTML = `
    <td>${name}</td>
    <td>${occupation}</td>
    <td>${rate}</td>
    `;
  return $tr;
}

function FreelancerRows() {
  const $tbody = document.createElement("tbody");
  const $freelancers = freelancers.map(FreelancerRow);
  $tbody.replaceChildren(...$freelancers);
  return $tbody;
}

function AverageRate() {
  const $p = document.createElement("p");
  $p.textContent = `The average rate is $${getAverageRate(freelancers).toFixed(
    2
  )}.`;
  return $p;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Freelancer Forum</h1>
    <AverageRate></AverageRate>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Occupation</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody id="FreelancerRows"></tbody>
    </table>
  `;
  $app.querySelector("AverageRate").replaceWith(AverageRate());
  $app.querySelector("#FreelancerRows").replaceWith(FreelancerRows());
}

render();
