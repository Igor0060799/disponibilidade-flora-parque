const map = document.getElementById('map');
const saveButton = document.getElementById('save-button');
let currentDot = null;

// Criar uma bolinha arrastável
map.addEventListener('click', (e) => {
  if (currentDot) return;

  currentDot = document.createElement('div');
  currentDot.classList.add('dot', 'available');
  currentDot.style.left = `${e.offsetX}px`;
  currentDot.style.top = `${e.offsetY}px`;
  map.appendChild(currentDot);

  // Permitir arrastar a bolinha
  currentDot.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const moveDot = (e) => {
      currentDot.style.left = `${e.offsetX}px`;
      currentDot.style.top = `${e.offsetY}px`;
    };
    map.addEventListener('mousemove', moveDot);
    map.addEventListener('mouseup', () => {
      map.removeEventListener('mousemove', moveDot);
    }, { once: true });
  });
});

// Salvar coordenadas
saveButton.addEventListener('click', async () => {
  const quadra = prompt('Digite a quadra:');
  const lote = prompt('Digite o lote:');

  if (quadra && lote && currentDot) {
    const x = parseInt(currentDot.style.left);
    const y = parseInt(currentDot.style.top);

    // Enviar dados para o Google Sheets (usando Google Apps Script)
    await fetch('https://script.google.com/macros/s/AKfycbw0ahxjPzlGSSrRx56uak3FZXIvziv8M36YFhSunMt8ZBj1s2kIYkBVOSKC1Y_dAo_w/exec', {
      method: 'POST',
      body: JSON.stringify({ quadra, lote, x, y }),
      headers: { 'Content-Type': 'application/json' }
    });

    alert('Coordenadas salvas!');
    currentDot = null;
  }
});
