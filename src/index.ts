import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas relacionadas a "Lojas"
app.get('/lojas', async (req, res) => {
  try {
    const lojas = await prisma.loja.findMany();
    res.json(lojas);
  } catch (error) {
    console.error('Erro ao obter lojas:', error);
    res.status(500).json({ error: 'Erro ao obter lojas.' });
  }
});

app.get('/lojas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const loja = await prisma.loja.findUnique({
      where: { id: parseInt(id) },
    });

    if (!loja) {
      return res.status(404).json({ error: 'Loja não encontrada.' });
    }

    res.json(loja);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

app.post('/lojas', async (req, res) => {
  const { nome, endereco } = req.body;
  try {
    const novaLoja = await prisma.loja.create({
      data: {
        nome: nome,
        endereco: endereco,
      },
    });
    res.status(201).json(novaLoja);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar a loja.' });
  }
});

app.put('/lojas/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, endereco } = req.body;

  try {
    const loja = await prisma.loja.update({
      where: { id: parseInt(id) },
      data: { nome: nome, endereco: endereco },
    });

    res.json(loja);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao atualizar a loja.' });
  }
});

app.delete('/lojas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.loja.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // Usando 204 No Content para exclusão bem-sucedida
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao excluir a loja.' });
  }
});

// Rotas relacionadas à "Frota"
app.get('/frota', async (req, res) => {
  try {
    const carros = await prisma.carro.findMany();
    res.json(carros);
  } catch (error) {
    console.error('Erro ao obter carros na frota:', error);
    res.status(500).json({ error: 'Erro ao obter carros na frota.' });
  }
});

// Adicione mais rotas relacionadas à frota conforme necessário

// Rota de tratamento para endpoint não encontrado
app.use((req, res, next) => {
  res.status(404);
  return res.json({
    success: false,
    payload: null,
    message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

// Inicialização do servidor
app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
);
