const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Método para obter todos os carros na frota
exports.getAllCarros = async (req, res) => {
    try {
        const response = await prisma.carro.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
};

// Método para obter um carro pelo ID
exports.getCarroById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await prisma.carro.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Not Found', msg: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
};

// Método para criar um novo carro na frota
exports.createCarro = async (req, res) => {
    const { modelo, categoria, preco, lojaId } = req.body;
    try {
        const carro = await prisma.carro.create({
            data: {
                modelo: modelo,
                categoria: categoria,
                preco: preco,
                lojaId: lojaId,
            },
        });
        res.status(201).json(carro);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};

// Método para atualizar um carro na frota pelo ID
exports.updateCarro = async (req, res) => {
    const { modelo, categoria, preco, lojaId } = req.body;
    const id = req.params.id;
    try {
        const carro = await prisma.carro.update({
            where: {
                id: Number(id),
            },
            data: {
                modelo: modelo,
                categoria: categoria,
                preco: preco,
                lojaId: lojaId,
            },
        });
        res.status(200).json(carro);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};

// Método para excluir um carro na frota pelo ID
exports.deleteCarro = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.carro.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(204).send(); // Usando 204 No Content para exclusão bem-sucedida
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};
