import User from "./user.model.js";
import bcryptjs from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
        const { nombre, apellido, username, email, password,  fechaNacimiento } = req.body;
        const [day, month, year] = fechaNacimiento.split('/');// Convertir la fecha de nacimiento del formato DD/MM/YYYY a un objeto Date
        const birthDate = new Date(year, month - 1, day);
        const age = calculateAge(birthDate);// Calcular la edad del usuario
        if (age < 7) {
            return res.status(400).json({ msg: "Debes tener al menos 7 años para registrarte." });
        }

        const user = new User({nombre, apellido, username, email, password, edad: age, fechaNacimiento: birthDate});
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        await user.save();
        res.status(201).json({ msg: "User successfully created", user });
    } catch (error) {
        res.status(500).json({ msg: "Error creating user" });
    }
};

export const getUser = async (req = request, res = response) => {
    try {
        const { nombre, apellido, username, email, edad, fechaNacimiento } = req.query;
        const filter = {};
        if (nombre) filter.nombre = { $regex: nombre, $options: 'i' };
        if (apellido) filter.apellido = { $regex: apellido, $options: 'i' };
        if (username) filter.username = { $regex: username, $options: 'i' };
        if (email) filter.email = { $regex: email, $options: 'i' };
        if (edad) filter.edad = { $regex: edad, $options: 'i' };
        if (fechaNacimiento) filter.fechaNacimiento = { $regex: fechaNacimiento, $options: 'i' };
        const users = await User.find(filter);
        const total = users.length;
        res.status(200).json({ total, users });
    } catch (error) {
        res.status(500).json({ error: 'Error getting users' });
    }
}

export const updateUser = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, password, ...remain } = req.body;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (password) {
            const salt = bcryptjs.genSaltSync();
            remain.password = bcryptjs.hashSync(password, salt);
        }
        await User.findByIdAndUpdate(id, remain);
        const updatedUser = await User.findOne({ _id: id });
        res.status(200).json({ msg: 'User has been updated', user: updatedUser });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Error when updating user' });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { status: false });
        res.status(200).json({ msg: 'User has been disable', user })
    } catch (error) {
        res.status(500).json({ error: 'Error when deleting user' });
    }
}

const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};