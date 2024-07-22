import { Router } from 'express';
import { check } from 'express-validator';
import { postcomment, getComments, getCommentById, updateComment, deleteComment } from '../comment/comment.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
    '/',
    [
        validarJWT,
        check('comentario', 'El comentario es obligatorio').not().isEmpty(),
        check('publicationId', 'El ID de la publicación es obligatorio').not().isEmpty().isMongoId(),
        validarCampos
    ],
    postcomment
);

router.get(
        '/', 
        getComments
);

router.get(
    '/:id',
    [
        check('id', 'El ID del comentario es obligatorio y debe ser un ID válido de MongoDB').isMongoId(),
        validarCampos
    ],
    getCommentById
);

router.put(
    '/:id',
    [
        validarJWT,
        check('id', 'El ID del comentario es obligatorio y debe ser un ID válido de MongoDB').isMongoId(),
        check('comentario', 'El comentario es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateComment
);

router.delete(
    '/:id',
    [
        validarJWT,
        check('id', 'El ID del comentario es obligatorio y debe ser un ID válido de MongoDB').isMongoId(),
        validarCampos
    ],
    deleteComment
);

export default router;
