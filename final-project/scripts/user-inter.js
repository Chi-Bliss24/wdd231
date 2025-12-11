// scripts/user-inter.js
// UI utilities: modal, nav toggle, renderers
export function initNav(){
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const nav = document.getElementById('primary-nav');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  });
}


export function renderCards(items, container, onOpen){
  container.innerHTML = '';
  items.forEach(item=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>Duration:</strong> ${item.duration} &middot; <strong>Price:</strong> ${item.price}</p>
      <p>${item.excerpt}</p>
      <p><button class="btn" data-id="${item.id}">Details</button></p>
    `;
    container.appendChild(card);
  });
  container.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      const id = e.currentTarget.dataset.id;
      const item = items.find(it => String(it.id) === String(id));
      if (item && typeof onOpen === 'function') onOpen(item);
    });
  });
}

// simple accessible modal
export function openModal(root, contentHtml, opts={title:'Details'}){
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${opts.title}">${contentHtml}<p><button class="btn" id="close-modal">Close</button></p></div>`;
  root.appendChild(backdrop);
  const closeBtn = backdrop.querySelector('#close-modal');
  function close(){
    backdrop.remove();
    previousFocus?.focus();
  }
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', (e)=>{ if (e.target === backdrop) close(); });
  const previousFocus = document.activeElement;
  // simple focus trap: focus close button
  closeBtn.focus();
}