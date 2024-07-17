import mongoose, { Schema } from 'mongoose';

const CommentSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    photo: {
        type: String,
        required: [true, 'La foto es obligatoria']
    },
    date: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    }
});

export default mongoose.model('Comment', CommentSchema);
