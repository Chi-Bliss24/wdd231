
// document.addEventListener('DOMContentLoaded', () => {
//   // Insert current year
//   const yearEl = document.getElementById('currentyear');
//   if (yearEl) {
//     yearEl.textContent = new Date().getFullYear();
//   }

//   // Insert last modified info
//   const lastEl = document.getElementById('lastModified');
//   if (lastEl) {
//     const raw = document.lastModified;
//     if (raw) {
//       // Try to parse into a Date and format using Africa/Lagos timezone
//       const parsed = new Date(raw);
//       if (!isNaN(parsed)) {
//         const opts = {
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric',
//         };
//         // Use the Africa/Lagos timezone for consistent display
//         const formatted = parsed.toLocaleString('en-GB', { ...opts, timeZone: 'Africa/Lagos' });
//         lastEl.textContent = `Last modified: ${formatted}`;
//       } else {
//         // If parsing fails, fall back to showing the raw string
//         lastEl.textContent = `Last modified: ${raw}`;
//       }
//     } else {
//       lastEl.textContent = 'Last modified: not available';
//     }
//   }
// });


// // Calculate and display wind chill if applicable
// let temperature = 10;   // °C
// let windSpeed = 12;    // km/h

// // Function to calculate wind chill (Environment Canada formula)
// function calculateWindChill(tempC, speedKmh) {
//   return (
//     13.12 +
//     0.6215 * tempC -
//     11.37 * Math.pow(speedKmh, 0.16) +
//     0.3965 * tempC * Math.pow(speedKmh, 0.16)
//   );
// }

// // Check if conditions are valid for calculation
// let windChillValue = "N/A";
// if (temperature <= 10 && windSpeed > 4.8) {
//   windChillValue = calculateWindChill(temperature, windSpeed).toFixed(1) + " °C";
// }

// // Display result in the page
// document.querySelector("#windchill").textContent = windChillValue;

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;