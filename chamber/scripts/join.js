// join.js — fills timestamp and handles modal interactions
// Fill hidden timestamp (ISO) when page loads
(function(){
  function setTimestamp(){
    const ts = document.getElementById('timestamp');
    if(ts) ts.value = new Date().toISOString();
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // Modal helpers
  function openModal(modal){
    modal.setAttribute('aria-hidden','false');
    // trap focus to the dialog
    const focusable = modal.querySelector('[tabindex], button, a, input, textarea, select') || modal.querySelector('.dialog');
    if(focusable) focusable.focus();
    document.addEventListener('keydown', escHandler);
  }
  function closeModal(modal){
    modal.setAttribute('aria-hidden','true');
    document.removeEventListener('keydown', escHandler);
  }
  function escHandler(e){ if(e.key === 'Escape') document.querySelectorAll('.modal[aria-hidden="false"]').forEach(m=>closeModal(m)); }

  document.addEventListener('DOMContentLoaded', function(){
    setTimestamp();

    // wire up more info links
    document.querySelectorAll('.more').forEach(a=>{
      a.addEventListener('click', function(e){
        e.preventDefault();
        const target = a.dataset.target;
        const modal = document.getElementById(target);
        if(modal) openModal(modal);
      });
    });

    // wire up modal close buttons and clicking outside dialog
    document.querySelectorAll('.modal').forEach(modal=>{
      const btn = modal.querySelector('.close');
      if(btn) btn.addEventListener('click', ()=>closeModal(modal));
      modal.addEventListener('click', (e)=>{
        if(e.target === modal) closeModal(modal);
      });
    });

    // ensure keyboard navigation order: form fields then cards
    const form = document.getElementById('joinForm');
    if(form){
      const focusable = form.querySelectorAll('input,select,textarea,button');
      if(focusable.length) focusable[0].focus();
    }
  });
})();

 // read required fields from querystring and render them
    function safe(text){ return String(text||'').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
    document.addEventListener('DOMContentLoaded', ()=>{
      const params = new URLSearchParams(window.location.search);
      const firstName = params.get('firstName');
      const lastName = params.get('lastName');
      const email = params.get('email');
      const mobile = params.get('mobile');
      const organization = params.get('organization');
      const timestamp = params.get('timestamp');

      const summary = document.getElementById('summary');
      if(!summary) return;

      summary.innerHTML = `
        <dl>
          <dt><strong>First name</strong></dt><dd>${safe(firstName)}</dd>
          <dt><strong>Last name</strong></dt><dd>${safe(lastName)}</dd>
          <dt><strong>Email</strong></dt><dd>${safe(email)}</dd>
          <dt><strong>Mobile phone</strong></dt><dd>${safe(mobile)}</dd>
          <dt><strong>Business / Organization</strong></dt><dd>${safe(organization)}</dd>
          <dt><strong>Form submitted at</strong></dt><dd>${safe(timestamp)}</dd>
        </dl>
      `;

      const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();
    });
