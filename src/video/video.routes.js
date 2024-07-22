import { Router } from 'express';
import { check } from 'express-validator';
import { getVideos, getVideoById, createVideo, updateVideo, deleteVideo } from '../video/video.controller.js';

const router = Router();

router.get(
    '/',
    [
    ],
    getVideos
);

router.get(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
    ],
    getVideoById
);

router.post(
    '/video',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('url', 'La URL es obligatoria').not().isEmpty(),
    ],
    createVideo
);

router.put(
    '/video/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('title', 'El título es obligatorio').optional().not().isEmpty(),
        check('url', 'La URL es obligatoria').optional().not().isEmpty(),
    ],
    updateVideo
);

router.delete(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
    ],
    deleteVideo
);

export default router;
