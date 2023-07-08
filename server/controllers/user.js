import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import User from "../models/UserModel.js"
import jwt from 'jsonwebtoken'

dotenv.config()
const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const registration = async (req, res) => {
    const { userName, email, password, confirmPassword } = req.body

    try {
        const user = await User.findOne({ email });

        if (password !== confirmPassword) return res.status(400).json('Пароль подтвержден не верно')
        if (user) return res.status(400).json({ message: 'Пользователь уже зарегистрирован' })

        const hashedPassword = await bcrypt.hash(password, 12);

        const createdUser = await User.create({
            userName,
            email,
            password: hashedPassword,
        })

        const token = jwt.sign(
            {id: createdUser._id, email: createdUser.email },
            TOKEN_SECRET,
            { expiresIn: '30m'}
        )

        res.status(200).json({ user: createdUser, token })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Произошла ошибка' })
    }
}