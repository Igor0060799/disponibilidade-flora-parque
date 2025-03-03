<script type="module">
  // Importe as funções necessárias do Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

  // Configuração do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyBkg7c0CM6Ru7TgSTHO1rw-pYRaN222-Kg",
    authDomain: "disponibilidade-flora-parque.firebaseapp.com",
    projectId: "disponibilidade-flora-parque",
    storageBucket: "disponibilidade-flora-parque.firebasestorage.app",
    messagingSenderId: "69048295836",
    appId: "1:69048295836:web:46a1c707dc05039c0d6859",
    measurementId: "G-5MC5EGDMDH"
  };

  // Inicialize o Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app); // Inicializa o Realtime Database
</script>
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
