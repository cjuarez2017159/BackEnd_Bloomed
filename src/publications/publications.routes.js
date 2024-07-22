import { Router } from 'express';
import { check } from 'express-validator';
import { publicationsGet, publicationsPost, publicationsPut, getPublicationById } from '../publications/publicacion.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get(
    '/',
    [
        validarJWT,
    ],
    publicationsGet
);

router.get(
    '/:id',
    [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
    ],
    getPublicationById
);

router.post(
    '/publications',
    [
        validarJWT,
        check('namePublication', 'El nombre de la publicación es obligatorio').not().isEmpty(),
        check('author', 'El autor es obligatorio').not().isEmpty(),
        check('date', 'La fecha es obligatoria').isDate(),
        check('edad', 'La edad es obligatoria y debe ser +18 o -18').isIn(['+18', '-18']),
        check('comment', 'El comentario es obligatorio').not().isEmpty(),
    ],
    publicationsPost
);

router.put(
    '/publications/:id',
    [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('namePublication', 'El nombre de la publicación es obligatorio').optional().not().isEmpty(),
        check('author', 'El autor es obligatorio').optional().not().isEmpty(),
        check('date', 'La fecha es obligatoria').optional().isDate(),
        check('edad', 'La edad es obligatoria y debe ser +18 o -18').optional().isIn(['+18', '-18']),
        check('comment', 'El comentario es obligatorio').optional().not().isEmpty(),
    ],
    publicationsPut
);

export default router;