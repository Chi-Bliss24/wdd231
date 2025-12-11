// js/main.js — entry module
import { fetchServices } from './data.js';
import { initNav, renderCards, openModal } from './user-inter.js';

document.addEventListener('DOMContentLoaded', async ()=>{
  initNav();
  // set years
  document.getElementById('year')?.textContent = new Date().getFullYear();
  document.getElementById('year2')?.textContent = new Date().getFullYear();
  document.getElementById('year3')?.textContent = new Date().getFullYear();

  const services = await fetchServices();

  // Render featured on home (first 3)
  const featuredRoot = document.getElementById('featured-list');
  if (featuredRoot){
    const featured = services.slice(0,3).map(s=>({
      id: s.id, title: s.title, duration: s.duration, price: s.price, excerpt: s.description.slice(0,120)+'...'
    }));
    renderCards(featured, featuredRoot, (item)=>{
      const modalRoot = document.getElementById('modal-root');
      if (modalRoot) openModal(modalRoot, `<h2>${item.title}</h2><p>${item.excerpt}</p><p><strong>Price:</strong> ${item.price}</p>`);
    });
  }

  // Render all services on services page
  const serviceList = document.getElementById('service-list');
  if (serviceList){
    const mapped = services.map(s=>({id:s.id, title:s.title, duration:s.duration, price:s.price, excerpt:s.description.slice(0,140)}));
    renderCards(mapped, serviceList, (item)=>{
      const modalRoot = document.getElementById('modal-root');
      if (modalRoot) openModal(modalRoot, `<h2>${item.title}</h2><p>${item.excerpt}</p><p><strong>Duration:</strong> ${item.duration}</p><p><strong>Price:</strong> ${item.price}</p>`);
    });
  }

  // Booking page: load saved preference
  const savePrefBtn = document.getElementById('save-pref');
  if (savePrefBtn){
    const sel = document.getElementById('package');
    // populate from storage
    const saved = localStorage.getItem('sunnytrail_pref_package');
    if (saved) sel.value = saved;
    savePrefBtn.addEventListener('click', ()=>{
      localStorage.setItem('sunnytrail_pref_package', sel.value);
      alert('Preference saved locally.');
    });
  }

  // simple search example: filter services by energy level (demonstrates array methods)
  // NOTE: for demonstration we will store last filter in localStorage and reapply
  const lastFilter = localStorage.getItem('sunnytrail_last_filter');
  if (lastFilter && serviceList){
    const filtered = services.filter(s => s.energy === lastFilter);
    if (filtered.length) renderCards(filtered, serviceList, (item)=> openModal(document.getElementById('modal-root'), `<h2>${item.title}</h2><p>${item.excerpt}</p>`));
  }
});