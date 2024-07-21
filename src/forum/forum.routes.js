import { Router } from "express";
import { check } from "express-validator";

import{

    forumPost,
    forumGet

} from "./forum.controller.js"

const router = Router ();

router.get("/", forumGet);

router.post(
    "/forum",
    [
        check("tituloForo", "el forum es obligatorio").not().isEmpty(),
        check("contenido", "el contenido es obligatorio").not().isEmpty(),

    ],forumPost
)

export default router;