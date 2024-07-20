import { Schema, model } from 'mongoose'

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'The name is required']
    },
    apellido: {
        type: String,
        required: [true, 'Last name is required']
    },
    username: {
        type: String,
        required: [true, 'The username is required']
    },    
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
    },
    edad: {
        type: String,
        required: [true, 'Age is required']
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'The App needs to know your age'],
    },
    status: {
        type: Boolean,
        default: true
    }
})

export default model('User', UserSchema)
