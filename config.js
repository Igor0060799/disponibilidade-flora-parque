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
