// scripts/data.js
// ES module responsible for fetching services.json
export async function fetchServices(url='./data/services.json'){
  try{
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch(err){
    console.error('Failed to load services:', err);
    return []; // graceful fallback
  }
}