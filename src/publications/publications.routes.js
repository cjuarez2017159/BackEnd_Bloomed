import { Router } from 'express';
import { check } from 'express-validator';
import { publicationsGet,publicationsPost,publicationsPut,getPublicationById } from '../publications/publicacion.controller.js';

const router = Router();

router.post(
    '/publications',
    [
        check('namePublication', 'El nombre de la publicación es obligatorio').not().isEmpty(),
        check('author', 'El autor es obligatorio').not().isEmpty(),
        check('date', 'La fecha es obligatoria').isDate(),
        check('edad', 'La edad es obligatoria y debe ser +18 o -18').isIn(['+18', '-18']),
        check('idComment', 'El id de comentario es obligatorio').not().isEmpty().isMongoId(),
    ],
    publicationsPost
);

router.get(
    '/publications',
    publicationsGet
);

router.get(
    '/publications/:id',
    getPublicationById
);

router.put(
    '/publications/:id',
    [
        check('namePublication', 'El nombre de la publicación es obligatorio').optional().not().isEmpty(),
        check('author', 'El autor es obligatorio').optional().not().isEmpty(),
        check('date', 'La fecha es obligatoria').optional().isDate(),
        check('edad', 'La edad es obligatoria y debe ser +18 o -18').optional().isIn(['+18', '-18']),
        check('idComment', 'El id de comentario es obligatorio').optional().isMongoId(),
    ],
    publicationsPut
);

export default router;
