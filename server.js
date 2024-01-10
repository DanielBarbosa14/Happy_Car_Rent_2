const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(bodyParser.json());

// Simulação de dados das lojas
const lojas = [
  { id: '1', nome: 'Loja A', endereco: 'Endereço da Loja A' },
  { id: '2', nome: 'Loja B', endereco: 'Endereço da Loja B' },
  // Adicione mais dados conforme necessário
];

// Rota para obter dados das lojas
app.get('/lojas', (req, res) => {
  res.json(lojas);
});

// Simulação de dados da frota
const frota = [
  { id: '1', modelo: 'Carro A', categoria: 'Utilitário', preco: 50 },
  { id: '2', modelo: 'Carro B', categoria: 'SUV', preco: 70 },
  // Adicione mais dados conforme necessário
];

// Rota para obter dados da frota com base nos filtros
app.get('/frota', (req, res) => {
  const { loja } = req.query;

  if (loja) {
    // Filtrar por loja, simulação
    const carrosFiltrados = frota.filter(carro => carro.loja === loja);
    res.json(carrosFiltrados);
  } else {
    // Sem filtro de loja, retorna toda a frota
    res.json(frota);
  }
});

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
