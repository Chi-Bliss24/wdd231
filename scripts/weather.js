// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// define the API URL with your city ID and API key
// steps to follow:
// Declare a const variable named "url" and assign it a valid URL string as given in the openweathermap api documentation that was presented above and bookmarked.
// const url = 'https://api.openweathermap.org/data/2.5/___________';
// Use the Current Weather API named 'weather'.
// Start a query string with the "?" character as shown in the examples.
// Use a & between each key/value pair in the query string in these next steps.
// Specify the latitude and longitude of Trier, Germany using the information you have gathered and the examples provided.
// Set the units to imperial: "units=imperial" or to metric: "units=metric"
// Provide your API key: "appid=[enter your key here]"


const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=113d4f15c4486db0322f3ee8c7de8075';


async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data); // uncommented
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

apiFetch();


function displayResults(data) {
  // 1. Format the temperature to show zero decimal points
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;
  
  // 2. Build the image source URL
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  
  // 3. Get the description
  let desc = data.weather[0].description;
  
  // 4. Set the image attributes
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  
  // 5. Set the figcaption
  captionDesc.textContent = `${desc}`;
}