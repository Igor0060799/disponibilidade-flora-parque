const map = document.getElementById('map');
const saveButton = document.getElementById('save-button');
let dots = []; // Array para armazenar todas as bolinhas criadas

// Criar uma bolinha arrastável
map.addEventListener('click', (e) => {
  const existingDot = dots.find(dot => {
    const dotX = parseInt(dot.style.left);
    const dotY = parseInt(dot.style.top);
    return Math.abs(dotX - e.offsetX) < 10 && Math.abs(dotY - e.offsetY) < 10;
  });

  if (existingDot) {
    alert('Já existe uma bolinha neste local!');
    return;
  }

  const dot = document.createElement('div');
  dot.classList.add('dot', 'available');
  dot.style.left = `${e.offsetX}px`;
  dot.style.top = `${e.offsetY}px`;
  map.appendChild(dot);

  // Permitir arrastar a bolinha
  dot.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const moveDot = (e) => {
      dot.style.left = `${e.offsetX}px`;
      dot.style.top = `${e.offsetY}px`;
    };
    map.addEventListener('mousemove', moveDot);
    map.addEventListener('mouseup', () => {
      map.removeEventListener('mousemove', moveDot);
    }, { once: true });
  });

  dots.push(dot); // Adiciona a bolinha ao array
});

// Salvar coordenadas de todas as bolinhas
saveButton.addEventListener('click', async () => {
  for (const dot of dots) {
    const quadra = prompt('Digite a quadra para a bolinha:');
    const lote = prompt('Digite o lote para a bolinha:');

    if (quadra && lote) {
      const x = parseInt(dot.style.left);
      const y = parseInt(dot.style.top);

      // Enviar dados para o Google Sheets
      await fetch('https://script.google.com/macros/s/AKfycbw0ahxjPzlGSSrRx56uak3FZXIvziv8M36YFhSunMt8ZBj1s2kIYkBVOSKC1Y_dAo_w/exec', {
        method: 'POST',
        body: JSON.stringify({ quadra, lote, x, y }),
        headers: { 'Content-Type': 'application/json' }
      });

      dot.classList.add('saved'); // Feedback visual ao salvar
    }
  }

  alert('Todas as coordenadas salvas!');
  dots = []; // Limpa o array após salvar
});
