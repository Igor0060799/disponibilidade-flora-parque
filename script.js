// Importe as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBkg7c0CM6Ru7TgSTHO1rw-pYRaN222-Kg",
  authDomain: "disponibilidade-flora-parque.firebaseapp.com",
  databaseURL: "https://disponibilidade-flora-parque-default-rtdb.firebaseio.com/",
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

// Função para atualizar as bolinhas no mapa
function updateDots(data) {
  const map = document.getElementById('map');
  map.innerHTML = ''; // Limpa as bolinhas antigas

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

// Carregar coordenadas do Firebase
function loadData() {
  const lotesRef = ref(database, 'lotes');
  onValue(lotesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      updateDots(Object.values(data));
    }
  }, (error) => {
    console.error('Erro ao carregar dados:', error);
  });
}

// Atualiza o mapa ao carregar a página
loadData();

// Atualiza o mapa ao clicar no botão
const refreshButton = document.getElementById('refresh-button');
refreshButton.addEventListener('click', () => {
  loadData();
});
