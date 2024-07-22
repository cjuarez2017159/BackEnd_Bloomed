import { Router } from 'express';
import { check } from 'express-validator';
import { getVideos, getVideoById, createVideo, updateVideo, deleteVideo } from '../video/video.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get(
    '/',
    [
        validarJWT,
    ],
    getVideos
);

router.get(
    '/:id',
    [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
    ],
    getVideoById
);

router.post(
    '/video',
    [
        validarJWT,
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('url', 'La URL es obligatoria').not().isEmpty(),
    ],
    createVideo
);

router.put(
    '/video/:id',
    [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('title', 'El título es obligatorio').optional().not().isEmpty(),
        check('url', 'La URL es obligatoria').optional().not().isEmpty(),
    ],
    updateVideo
);

router.delete(
    '/:id',
    [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
    ],
    deleteVideo
);

export default router;
