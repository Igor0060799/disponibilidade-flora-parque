const map = document.getElementById('map');
const refreshButton = document.getElementById('refresh-button');

// Função para buscar dados da planilha
async function fetchData() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw0ahxjPzlGSSrRx56uak3FZXIvziv8M36YFhSunMt8ZBj1s2kIYkBVOSKC1Y_dAo_w/exec');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return [];
  }
}

// Função para atualizar as bolinhas no mapa
function updateDots(data) {
  // Limpa as bolinhas antigas
  map.innerHTML = '';

  // Adiciona as novas bolinhas
  data.forEach(item => {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    // Define a cor da bolinha com base no status
    if (item.status === 'Disponível') dot.classList.add('available');
    else if (item.status === 'Vendido') dot.classList.add('sold');
    else if (item.status === 'Reservado') dot.classList.add('reserved');

    // Posiciona a bolinha no mapa
    dot.style.left = `${item.x}px`;
    dot.style.top = `${item.y}px`;

    // Adiciona a bolinha ao mapa
    map.appendChild(dot);
  });
}

// Atualiza o mapa ao carregar a página
fetchData().then(data => updateDots(data));

// Atualiza o mapa ao clicar no botão
refreshButton.addEventListener('click', () => {
  fetchData().then(data => updateDots(data));
});
