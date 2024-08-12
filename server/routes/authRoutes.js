import express from 'express';

import { login } from '../controllers/loginconfig.js';
import { register } from '../controllers/registerconfig.js';
import { stringify } from 'querystring';

const router = express.Router();






router.post('/login', login);

router.post('/register',register);


router.post('/write', (req, res) => {
    if (req.body) {
        const data = stringify(req.body);
        console.log(data); 
        res.send(data); 
    } else {
        res.status(400).send('No data provided.'); 
    }
});






export default router;
