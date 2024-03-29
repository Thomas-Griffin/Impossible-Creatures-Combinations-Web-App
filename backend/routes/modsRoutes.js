const express = require('express');
const router = express.Router();
const ModService = require('../services/modService');
const modService = new ModService();

router.get('/', function (request, response) {
    modService.getMods().then(mods => {
            response.json(mods);
        }
    );
});

router.get('/name/:name', function (request, response) {
    modService.getModsByName(request.params.name).then(mod => {
            response.json(mod);
        }
    );
});

module.exports = router;
