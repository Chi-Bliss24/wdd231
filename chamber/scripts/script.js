// script.js - fetch members and display as grid or list

// Footer dates
document.addEventListener('DOMContentLoaded', () => {
  const lm = new Date(document.lastModified);
  document.getElementById('lastModified').textContent = 'Last Modified: ' + lm.toLocaleString();
  document.getElementById('copyright').textContent = new Date().getFullYear();

});


const url = 'data/members.json';
const cards = document.querySelector('#cards');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

async function getMembers(){
  try{
    const res = await fetch(url);
    const data = await res.json();
    displayMembers(data);
  } catch(err){
    console.error('Fetch error:', err);
    cards.innerHTML = '<p>Unable to load directory data.</p>';
  }
}

function displayMembers(members){
  cards.innerHTML = ''; // clear
  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('card');
    // build inner HTML
    card.innerHTML = `
      <img class="logo-small" src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <div>
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p class="desc">${member.description || ''}</p>
        <p><a href="${member.url}" target="_blank" rel="noopener">${member.url}</a></p>
      </div>
    `;
    cards.appendChild(card);
  });
}

// Toggle functions
function setGridView(){
  cards.classList.remove('list');
  cards.classList.add('grid');
  gridBtn.setAttribute('aria-pressed','true');
  listBtn.setAttribute('aria-pressed','false');
}

function setListView(){
  cards.classList.remove('grid');
  cards.classList.add('list');
  gridBtn.setAttribute('aria-pressed','false');
  listBtn.setAttribute('aria-pressed','true');
}

// Event listeners
gridBtn.addEventListener('click', setGridView);
listBtn.addEventListener('click', setListView);

getMembers();