import { Router } from 'express';
import { check } from 'express-validator';
import { publicationsGet, publicationsPost, publicationsPut, getPublicationById } from '../publications/publicacion.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
    '/publications',
    [
        check('namePublication', 'El nombre de la publicación es obligatorio').not().isEmpty(),
        check('author', 'El autor es obligatorio').not().isEmpty(),
        check('descripcion','La descripcion es obligatoria').not().isEmpty(),
        check('date', 'La fecha es obligatoria').isDate(),
        check('edad', 'La edad es obligatoria y debe ser +18 o -18').not().isEmpty(),
    ],
    publicationsPost
);

router.get(
    '/',
    [
    ],
    publicationsGet
);

router.get(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
    ],
    getPublicationById
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