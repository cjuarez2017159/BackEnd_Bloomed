import { Router } from 'express';
import { check } from 'express-validator';
import { respuestaPost } from './respuesta.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.post('/respuestas/:foroId', 
    [
        check("contenido", "El contenido es obligatorio").not().isEmpty(),
    ], 
    respuestaPost
);

export default router;
