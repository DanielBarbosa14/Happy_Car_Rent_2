const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/cidade-atual/:lat/:lng', async (req, res, next) => {
    try {
        const { lat, lng } = req.params;
        const apiKey = 'sua_chave_do_google_maps';  // Substitua pela sua chave do Google Maps

        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
        );

        // Exemplo: Extrair nome da cidade da resposta da API
        const cidade = response.data.results[0].address_components.find(
            component => component.types.includes('locality')
        ).long_name;

        res.json({ cidade });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
