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
// Salvar coordenadas no Google Sheets
saveButton.addEventListener('click', async () => {
  for (const dot of dots) {
    const quadra = prompt('Digite a quadra para a bolinha:');
    const lote = prompt('Digite o lote para a bolinha:');

    if (quadra && lote) {
      const x = parseInt(dot.style.left);
      const y = parseInt(dot.style.top);

      // Envia para o Google Sheets
      try {
        const response = await fetch(scriptUrl, {
          method: 'POST',
          body: JSON.stringify({ quadra, lote, x, y }),
          headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json(); // Processa a resposta JSON

        if (result.status === 'success') {
          alert('Coordenadas salvas com sucesso!');
          dot.classList.add('saved'); // Feedback visual ao salvar
        } else {
          alert('Erro ao salvar coordenadas: ' + result.message);
        }
      } catch (error) {
        alert('Erro ao salvar coordenadas: ' + error.message);
      }
    }
  }

  dots = []; // Limpa o array após salvar
});
  dots = []; // Limpa o array após salvar
});
