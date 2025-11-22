

// --- Configuration ---
const OPENWEATHER_API_KEY = '113d4f15c4486db0322f3ee8c7de8075';
const LAT = 6.64; //latitude
const LON = 3.323; //longitude
6.641068924301435, 3.3235731932535355
// Utility to set element text safely
function safeEl(id){ return document.getElementById(id); }



async function fetchWeather() {
  const card = safeEl('weather-current');
  const forecastEl = safeEl('forecast');
  if (!card) return;

  // 1. Fetch Current Weather
  try {
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const responseCurrent = await fetch(urlCurrent);
    if (!responseCurrent.ok) throw new Error('Current weather fetch failed');
    const dataCurrent = await responseCurrent.json();

    // 2. Fetch Forecast (5 Day / 3 Hour)
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const responseForecast = await fetch(urlForecast);
    if (!responseForecast.ok) throw new Error('Forecast fetch failed');
    const dataForecast = await responseForecast.json();

    renderWeather(dataCurrent, dataForecast, card, forecastEl);

  } catch (err) {
    console.error('fetchWeather error', err);
    card.innerHTML = '<span style="color:crimson">Unable to load weather. Check API Key.</span>';
  }
}

function renderWeather(currentData, forecastData, card, forecastEl) {
  // --- Render Current Weather ---
  // Note: standard API uses 'main.temp', not 'current.temp'
  const temp = Math.round(currentData.main.temp);
  const desc = currentData.weather[0].description;
  const icon = currentData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  card.innerHTML = `
    <div style="display:flex; align-items:center; gap:10px;">
        <img src="${iconUrl}" alt="${desc}" style="width:50px;height:50px;">
        <div>
            <div style="font-weight:700;font-size:1.1rem;">${temp}&deg;C</div>
            <div class="muted" style="text-transform:capitalize;">${desc}</div>
        </div>
    </div>
  `;

  // --- Render Forecast ---
  if (forecastEl) forecastEl.innerHTML = '';
  
  // The free forecast API returns data every 3 hours. 
  // We filter to get roughly one reading per day (e.g., near noon).
  const dailyForecast = forecastData.list.filter(reading => reading.dt_txt.includes("12:00:00")).slice(0, 3);

  dailyForecast.forEach(day => {
    const date = new Date(day.dt * 1000);
    const weekday = date.toLocaleDateString(undefined, { weekday: 'short' });
    const tempMax = Math.round(day.main.temp_max);
    const iconCode = day.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const el = document.createElement('div');
    el.className = 'card';
    el.style.minWidth = '100px';
    el.style.padding = '0.5rem';
    el.style.textAlign = 'center';
    el.innerHTML = `
        <div style="font-weight:700">${weekday}</div>
        <img src="${iconSrc}" alt="weather icon" style="width:40px;">
        <div class="muted">${tempMax}&deg;C</div>
    `;
    if (forecastEl) forecastEl.appendChild(el);
  });
}

// ... (Keep your loadSpotlights and event listener code at the bottom) ...

// --- Spotlights ---
async function loadSpotlights(){
  const container = safeEl('spotlights');
  if(!container) return;
  container.innerHTML = '<div class="muted">Loading spotlights...</div>';

  // Try a few likely paths for the JSON file so this works in different folder layouts
  const candidates = ['data/members.json','/data/members.json','chamber/data/members.json','/chamber/data/members.json'];
  let members = null;

  for(const path of candidates){
    try{
      const res = await fetch(path);
      if(!res.ok) continue;
      members = await res.json();
      break;
    }catch(e){
      // try next
    }
  }

  if(!members){
    container.innerHTML = '<div class="muted">Members file not found. Place members.json in a data/ folder relative to this page.</div>';
    return;
  }

  const normalized = members.map(m => ({
    companyName: m.name || m.companyName || 'Member',
    website: m.url || m.website || '#',
    logo: m.image || m.logo || '',
    membershipLevel: (typeof m.level !== 'undefined') ? String(m.level) : (m.membershipLevel || ''),
    phone: m.phone || m.phoneNumber || '',
    address: m.address || ''
  }));

  const candidatesList = normalized.filter(m => {
    const lvl = String(m.membershipLevel).toLowerCase();
    return ['gold','silver'].includes(lvl) || ['3','2'].includes(lvl);
  });

  if(candidatesList.length === 0){
    container.innerHTML = '<div class="muted">No gold or silver members available for spotlight.</div>';
    return;
  }

  // shuffle
  for (let i = candidatesList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidatesList[i], candidatesList[j]] = [candidatesList[j], candidatesList[i]];
  }

  const pick = candidatesList.slice(0,3);
  container.innerHTML = '';
  pick.forEach(m => {
    const card = document.createElement('div');
    card.className = 'card spot';
    // allow absolute or relative logo paths in JSON, fall back to placeholder
    const logoSrc = m.logo ? (m.logo.startsWith('http') || m.logo.startsWith('/') ? m.logo : `images/${m.logo}`) : 'images/placeholder.png';
    card.innerHTML = `\n      <img src="${logoSrc}" alt="${m.companyName} logo" onerror="this.src='images/placeholder.png'; this.style.objectFit='cover'">\n      <h4 style="margin:8px 0 4px 0">${m.companyName}</h4>\n      <div class=\"member-meta muted\">\n        <div><strong>Level:</strong> ${m.membershipLevel}</div>\n        <div><strong>Phone:</strong> ${m.phone}</div>\n        <div>${m.address}</div>\n        <div><a href="${m.website}" target="_blank" rel="noopener">Visit website</a></div>\n      </div>\n    `;
    container.appendChild(card);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();

  loadSpotlights();
});
