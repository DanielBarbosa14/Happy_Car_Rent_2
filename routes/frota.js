const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/frota', async (req, res, next) => {
    try {
        const { loja } = req.query;

        let carros;

        if (loja) {
            carros = await prisma.carroLoja.findMany({
                where: {
                    lojaId: parseInt(loja, 10),
                },
                include: {
                    carro: true,
                },
            });
        } else {
            carros = await prisma.carro.findMany();
        }

        res.json(carros);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
