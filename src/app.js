const express = require('express');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Função para obter a cidade atual usando as coordenadas GPS
async function getCidadeAtual(lat, lng) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`
    );

    const cidade = response.data.results[0].formatted_address;
    return cidade;
  } catch (error) {
    console.error('Erro ao obter cidade atual:', error.message);
    return null;
  }
}

// Rota para a página "Início"
app.get('/', async (req, res) => {
  
  const { lat, lng } = req.query;

  if (lat && lng) {
    const cidadeAtual = await getCidadeAtual(lat, lng);
    res.json({ cidadeAtual });
  } else {
    res.status(400).json({ error: 'Coordenadas GPS ausentes' });
  }
});

// Rota para a página "Lojas"
app.get('/lojas', async (req, res) => {
  try {
    const lojas = await prisma.loja.findMany();
    res.json(lojas);
  } catch (error) {
    console.error('Erro ao obter dados das lojas:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para a página "Frota"
app.get('/frota', async (req, res) => {
  try {
    const { loja } = req.query;
    let carros;

    if (loja) {
      carros = await prisma.frota.findMany({
        where: { loja: loja },
      });
    } else {
      carros = await prisma.frota.findMany();
    }

    res.json(carros);
  } catch (error) {
    console.error('Erro ao obter dados da frota:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
