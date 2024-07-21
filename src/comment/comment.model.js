import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    comentario: {
        type: String,
        required: [true, 'El comentario es obligatorio']
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'La fecha es obligatoria']
    }
});

export default mongoose.model('Comment', CommentSchema);
