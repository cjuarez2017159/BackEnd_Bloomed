import { Router } from "express";
import { check } from 'express-validator';
import { registerUser, getUser, updateUser, deleteUser } from "./user.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existenteEmail, existenteUsername } from "../helpers/db-validators.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    '/register',
    [
        check('nombre', 'The name is necesary').not().isEmpty(),
        check('apellido', 'Last name is necesary').not().isEmpty(),
        check('username', 'The username is necesary').not().isEmpty(),
        check('username').custom(existenteUsername),
        check('email', 'This is not a valid email').isEmail(),
        check('email').custom(existenteEmail),
        check('password', 'The password is necesary').not().isEmpty(),
        check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
        check('fechaNacimiento', 'The to know your age is necesary').not().isEmpty(),
        validarCampos
    ],
    registerUser
);

router.get(
    '/',
    validarJWT,
    getUser
);

router.put(
    '/settings/:id',
    [
        validarJWT,
        check('id', 'This is an invalid id').isMongoId(),
        validarCampos
    ],
    updateUser
);

router.delete(
    "/settings/:id",
    [
        validarJWT,
        check("id", "This is an invalid id").isMongoId(),
        validarCampos
    ],
    deleteUser
);

export default router;
