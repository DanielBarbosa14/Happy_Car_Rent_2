const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
    try {
        const response = await prisma.loja.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
};

exports.getById = async (req, res) => {
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
            res.status(404).json({ error: 'Not Found', msg: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
};

exports.create = async (req, res) => {
    const { nome } = req.body;
    try {
        const loja = await prisma.loja.create({
            data: {
                nome: nome,
            },
        });
        res.status(201).json(categoria);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};

exports.update = async (req, res) => {
    const { nome } = req.body;
    const id = req.params.id;
    try {
        const categoria = await prisma.categoria.update({
            where: {
                id: Number(id),
            },
            data: {
                nome: nome,
            },
        });
        res.status(200).json(categoria);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.categoria.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(204).send(); // Using 204 No Content for successful deletion
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};
