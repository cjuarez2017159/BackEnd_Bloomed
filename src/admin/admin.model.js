import mongoose, { Schema } from 'mongoose';

const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
});

export default mongoose.model('Admin', AdminSchema);
