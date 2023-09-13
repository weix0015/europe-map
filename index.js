let countryColor;
const country_info = document.querySelector( '#country_info' );
const flag = country_info.querySelector( '#flag' );
const country_name = country_info.querySelector( '#country_name' );
const is_member_of_un = country_info.querySelector( '#is_member_of_un' );
const currencies = country_info.querySelector( '#currencies' );
const capitals = country_info.querySelector( '#capitals' );
const borders = country_info.querySelector( '#borders' );

/**
 * Handles the mouseover event on a country element.
 * Changes the fill color of the country element to 'lightblue'.
 * Fetches country data from the API and updates the country_info element with the data.
 * Displays the country flag, name, UN membership, currencies, capitals, and borders.
 * Logs any errors that occur during the process.
 * 
 * @param {Event} event - The mouseover event object.
 */

// async function is used to use await, you can only use await in async functions
async function countryMouseoverHandler(event) {
  try {
    // Change the fill color of the country element to 'lightblue'
    event.target.style.fill = 'lightblue';

    // Remove the 'hidden' class from the country_info element
    country_info.classList.remove('hidden');

    // Get the country code from the event target's id
    const countryCode = event.target.id;

    // Fetch country data from the API
    const response = await fetch(`https://countries.plaul.dk/api/countries/${countryCode}`);
    const country_data = await response.json();

    // Update the flag element with the country's flag image source
    flag.src = country_data.flag;

    // Update the country_name element with the country's name
    country_name.innerText = 'Country: ' + country_data.name?.common ?? 'unknown';

    // Update the is_member_of_un element with the country's UN membership status
    is_member_of_un.innerText = 'Member of UN: ' + (country_data.unMember ? 'Yes' : 'No');

    // Update the currencies element with the country's currencies
    currencies.innerText = 'Currencies: ' + Object.entries(country_data.currencies)
      .map(([currency_name, currency_info]) => `${currency_name} (${currency_info?.symbol})`)
      .join(', ');

    // Update the capitals element with the country's capitals
    capitals.innerText = 'Capitals: ' + country_data.capital.join(', ');

    // Update the borders element with the country's borders
    borders.innerText = 'Borders: ' + country_data.borders.join(', ');
  } catch (error) {
    // Log any errors that occur during the process
    console.error('Error:', error);
  }
}


/**
 * Handles the mouseout event for the country element.
 * @param {Event} event - The mouseout event object.
 */
function countryMouseoutHandler(event) {
  // Reset the fill color of the country element to the default color.
  event.target.style.fill = countryColor;

  // Hide the country info element.
  country_info.classList.add('hidden');
}


/**
 * Registers click event handlers for Europe country paths.
 * @param {Array} europe_countries_paths - Array of Europe country paths.
 */
function registerClickHandlers(europe_countries_paths) {
  // Set the default country color if there are any paths
  if (europe_countries_paths.length > 0) {
    countryColor = europe_countries_paths[0].style.fill;
  }

  // Add mouseover and mouseout event listeners to each country path
  for (const europe_country_path of europe_countries_paths) {
    europe_country_path.addEventListener('mouseover', countryMouseoverHandler);
    europe_country_path.addEventListener('mouseout', countryMouseoutHandler);
  }
}

// Wait until SVG is loaded
const europe_countries_map = document.querySelector( '#europe_countries_map' );
europe_countries_map.addEventListener(
  'load',
  () => {
    const paths = europe_countries_map.contentDocument.querySelectorAll( 'g path' );
    registerClickHandlers( paths );
  }
);

// questions & answers

// for of vs in ?
// for is used to iterate over the values of iterable objects like arrays and strings
// in is used  looking at all the properties of an object and doing something with each property

// map() ?
// lets you change each item in a list (array) and make a new list with those changes.

// Object.entries() ?
// takes an object and returns an array of [key, value] pairs

// arrow functions ?
// a function expression with no name, can be used instead of a named function

// async / await ?
// async marks a function as asynchronous, and await waits for promises to resolve before continuing.

// contentDocument ?
// it is used to change the content inside an <iframe> or <object> element

// ?. operator ?
// optional chaining operator it returns the value of the property if it exists, otherwise it returns undefined

// ?? operator ?
// null coalescing operator it is used to choose a default value when a variable is null or undefined.
// it returns the left-hand side value unless it's null or undefined, otherwise it returns the right-hand side value.
