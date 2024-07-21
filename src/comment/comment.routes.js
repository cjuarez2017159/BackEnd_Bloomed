import { Router } from 'express';
import { check } from 'express-validator';
import { postcomment, getComments, getCommentById, updateComment, deleteComment } from '../comment/comment.controller.js';

const router = Router();

router.post(
    '/',
    [
        check('comentario', 'El comentario es obligatorio').not().isEmpty(),
        check('publicationId', 'El ID de la publicación es obligatorio').not().isEmpty().isMongoId(),
    ],
    postcomment
);

router.get('/', getComments);
router.get('/:id', getCommentById);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
