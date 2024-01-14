const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/lojas', async (req, res, next) => {
    try {
        const lojas = await prisma.loja.findMany();

        res.json(lojas);
    } catch (error) {
        next(error);
    }
});

// Rota para obter informações detalhadas de uma loja
router.get('/lojas/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const loja = await prisma.loja.findUnique({
            where: {
                id: parseInt(id, 10),
            },
            include: {
                carrosLoja: {
                    include: {
                        carro: true,
                    },
                },
            },
        });

        if (!loja) {
            res.status(404).json({ error: 'Not Found', msg: 'Loja not found' });
            return;
        }

        res.json(loja);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
