const map = document.getElementById('map');
const refreshButton = document.getElementById('refresh-button');

// Função para buscar dados da planilha
async function fetchData() {
  const response = await fetch('https://script.google.com/macros/s/AKfycbw0ahxjPzlGSSrRx56uak3FZXIvziv8M36YFhSunMt8ZBj1s2kIYkBVOSKC1Y_dAo_w/exec');
  const data = await response.json();
  return data;
}

// Função para atualizar as bolinhas no mapa
function updateDots(data) {
  map.innerHTML = ''; // Limpa as bolinhas antigas

  data.forEach(item => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    
    if (item.status === 'Disponível') dot.classList.add('available');
    else if (item.status === 'Vendido') dot.classList.add('sold');
    else if (item.status === 'Reservado') dot.classList.add('reserved');

    dot.style.left = `${item.x}px`;
    dot.style.top = `${item.y}px`;

    map.appendChild(dot);
  });
}

// Atualizar ao carregar a página
fetchData().then(data => updateDots(data));

// Atualizar ao clicar no botão
refreshButton.addEventListener('click', () => {
  fetchData().then(data => updateDots(data));
});
