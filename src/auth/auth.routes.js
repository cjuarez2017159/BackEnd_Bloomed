import { Router } from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router()

router.post(
    '/login',
    [
        check('username', 'El nombre de usuario es necesario').not().isEmpty(),
        check('password', 'La contraseña es necesaria').not().isEmpty(),
        validarCampos,
    ], login)

export default router