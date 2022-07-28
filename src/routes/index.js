const { Router } = require('express');

const router = Router();

router.get('/test', (req, res) => {
    const data = ({
        name: 'AR',
        website: 'listas microservicio'
    });
    res.json(data);
});  

module.exports = router;
