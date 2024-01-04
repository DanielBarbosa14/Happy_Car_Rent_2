const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const express = require('express')

const prisma = new PrismaClient()
const app = express()

app.use(cors());
app.use(express.json())

app.get('/receitas', async (req, res) => {
    try {
      const receitas = await prisma.receita.findMany({
        include: {
          ingredientes: {
            include: {
              ingrediente: true,
            },
          },
        },
      });
  
      res.json(receitas);
    } catch (error) {
      console.error('Erro ao obter receitas:', error);
      res.status(500).json({ error: 'Erro ao obter receitas.' });
    }
  });

  app.patch('/api/receitas/:id/toggleFeito', async (req, res) => {
  const { id } = req.params;
  const { feito } = req.body;

  try {
    const receita = await prisma.receita.findUnique({
      where: { id: parseInt(id) },
    });

    if (!receita) {
      return res.status(404).json({ error: 'Receita não encontrada.' });
    }
    const updatedReceita = await prisma.receita.update({
      where: { id: parseInt(id) },
      data: { feito: feito },
    });

    res.json(updatedReceita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

app.use((req, res, next) => {
    res.status(404);
    return res.json({
        success: false,
        payload: null,
        message: `API SAYS: Endpoint not found for path: ${req.path}`,
    });
});

// #6
app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)