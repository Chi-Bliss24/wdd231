import { places } from '../data/places.mjs';

// discover.js — builds the 8 cards, accessible modals, and handles visit messages
(function(){
  const grid = document.getElementById('discoverGrid');
  const visitorEl = document.getElementById('visitorMessage');
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Accessible Modal System =====
  function createModal(place){
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('aria-hidden','true');

    const dialog = document.createElement('div');
    dialog.className = 'modal-dialog';
    dialog.setAttribute('role','dialog');
    dialog.setAttribute('aria-modal','true');
    dialog.setAttribute('aria-labelledby', `title-${place.id}`);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.setAttribute('aria-label','Close dialog');
    closeBtn.textContent = '×';

    const title = document.createElement('h2');
    title.id = `title-${place.id}`;
    title.textContent = place.name;

    const img = document.createElement('img');
    img.src = place.image;
    img.alt = place.name + ' photo';

    const addr = document.createElement('address');
    addr.textContent = place.address;

    const desc = document.createElement('p');
    desc.textContent = place.description;

    dialog.append(closeBtn, title, img, addr, desc);
    overlay.appendChild(dialog);

    function open(){
      document.body.appendChild(overlay);
      overlay.setAttribute('aria-hidden','false');
      closeBtn.focus();
      document.addEventListener('keydown', escHandler);
    }

    function close(){
      overlay.setAttribute('aria-hidden','true');
      document.removeEventListener('keydown', escHandler);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }

    function escHandler(e){ if(e.key === 'Escape') close(); }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e=>{ if(e.target === overlay) close(); });

    return { open };
  }

  // ===== Build Cards =====
  function makeCard(place, areaName){
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.area = areaName;

    const title = document.createElement('h2');
    title.textContent = place.name;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = place.image;
    img.alt = place.name + ' photo';
    figure.appendChild(img);

    const addr = document.createElement('address');
    addr.textContent = place.address;

    const desc = document.createElement('p');
    desc.textContent = place.description;

    const btn = document.createElement('button');
    btn.textContent = 'Learn more';

    btn.addEventListener('click', ()=> {
      const modal = createModal(place);
      modal.open();
    });

    card.append(figure, title, addr, desc, btn);
    return card;
  }

  const areaNames = ['a','b','c','d','e','f','g','h'];
  places.forEach((p, idx)=>{
    const area = areaNames[idx];
    const card = makeCard(p, area);
    grid.appendChild(card);
  });

  // ===== LocalStorage Visit Message =====
  const key = 'discover_last_visit';
  const now = Date.now();
  const last = localStorage.getItem(key);

  if(!last){
    visitorEl.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const diffDays = Math.floor((now - parseInt(last,10)) / (1000*60*60*24));
    if(diffDays < 1) visitorEl.textContent = 'Back so soon! Awesome!';
    else if(diffDays === 1) visitorEl.textContent = 'You last visited 1 day ago.';
    else visitorEl.textContent = `You last visited ${diffDays} days ago.`;
  }

  try{ localStorage.setItem(key, String(now)); }catch(e){}

})();
