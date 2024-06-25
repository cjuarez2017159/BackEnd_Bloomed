import mongoose, { Schema } from 'mongoose';

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    age: {
        type: String,
        required: [true, 'La edad es obligatoria']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    sexo: {
        type: String,
        required: [true, 'El sexo es obligatorio']
    },
    photo: {
        type: String,
        required: [true, 'La foto es obligatoria']
    }
});

export default mongoose.model('User', UserSchema)