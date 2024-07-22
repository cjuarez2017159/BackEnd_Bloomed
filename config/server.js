'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bcryptjs from 'bcryptjs';
import path from 'path';
import { dbConnection } from './mongo.js'

import Admin from '../src/admin/admin.model.js';
import userRoutes from '../src/user/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import publicationsRoutes from '../src/publications/publications.routes.js';
import foroRoutes from '../src/forum/forum.routes.js';
import respuestaRoutes from '../src/respuesta/respuesta.routes.js';
import videoRoutes from '../src/video/video.routes.js';
import commentRoutes from '../src/comment/comment.routes.js';


class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.userPath = '/bloomed/v1/user';
        this.authPath = '/bloomed/v1/auth';
        this.publicationsPath = '/bloomed/v1/public'
        this.foroPath = '/bloomed/v1/foro'
        this.respuestaPath = '/bloomed/v1/res'
        this.videoPath = '/bloomed/v1/videos'
        this.commentPath = '/bloomed/v1/comment'

        this.middlewares()
        this.conectarDB()
        this.routes()
        this.createDefaultAdmin()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
    }

    routes(){
        
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.publicationsPath, publicationsRoutes);
        this.app.use(this.foroPath, foroRoutes);
        this.app.use(this.respuestaPath, respuestaRoutes);
        this.app.use(this.videoPath, videoRoutes);
        this.app.use(this.commentPath, commentRoutes);

    }

    async createDefaultAdmin() {
        try {
            const admin = await Admin.findOne({});
            if (!admin) {
                const hashedPassword = await bcryptjs.hash('ADMINB', 10);
                await Admin.create({
                    username: 'ADMINB',
                    password: hashedPassword
                });
                console.log('Administrador predeterminado creado');
            }
        } catch (error) {
            console.error('Error al crear el administrador predeterminado:', error);
        }
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port)
        })
    }
}

export default Server;