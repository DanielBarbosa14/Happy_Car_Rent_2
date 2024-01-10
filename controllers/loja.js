const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Método para obter todas as lojas
exports.getAllLojas = async (req, res) => {
    try {
        const response = await prisma.loja.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
};

// Método para obter uma loja pelo ID
exports.getLojaById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await prisma.loja.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Not Found', msg: 'Loja not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
};

// Método para criar uma nova loja
exports.createLoja = async (req, res) => {
    const { nome, endereco } = req.body;
    try {
        const loja = await prisma.loja.create({
            data: {
                nome: nome,
                endereco: endereco,
            },
        });
        res.status(201).json(loja);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};

// Método para atualizar uma loja pelo ID
exports.updateLoja = async (req, res) => {
    const { nome, endereco } = req.body;
    const id = req.params.id;
    try {
        const loja = await prisma.loja.update({
            where: {
                id: Number(id),
            },
            data: {
                nome: nome,
                endereco: endereco,
            },
        });
        res.status(200).json(loja);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};

// Método para excluir uma loja pelo ID
exports.deleteLoja = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.loja.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(204).send(); // Usando 204 No Content para exclusão bem-sucedida
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};
