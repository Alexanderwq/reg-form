import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import User from "../models/UserModel.js"
import jwt from 'jsonwebtoken'
import EmailCodes from "../models/EmailCodesModel.js";

dotenv.config()
const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) return res.status(500).json({})

        const user = await User.findOne({ email })
        if (!user) res.status(404).json({ message: 'Пользователь не найден' })

        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!isCorrectPassword) res.status(400).json({ message: 'Неправильный пароль' })

        const token = jwt.sign(
            {id: user._id, email: user.email },
            TOKEN_SECRET,
            { expiresIn: '30m'}
        )

        res.status(200).json({ user, token })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Произошла ошибка' })
    }
}

export const registration = async (req, res) => {
    const { userName, email, password, confirmPassword, confirmCode } = req.body

    try {
        const user = await User.findOne({ email });

        if (password !== confirmPassword) return res.status(400).json('Пароль подтвержден не верно')
        if (user) return res.status(400).json({ message: 'Пользователь уже зарегистрирован' })

        const hashedPassword = await bcrypt.hash(password, 12);

        const emailCodeList = await EmailCodes
            .find({ email })
            .sort({createdAt:-1})
            .limit(1)
        const lastEmailCode = emailCodeList[0];

        if (lastEmailCode.used) return res.status(400).json({ message: 'Код уже использован' })
        if (lastEmailCode.code !== confirmCode) return res.status(400).json({ message: 'Неверный код' })
        if (lastEmailCode.endTime < new Date()) return res.status(400).json({ message: 'Время кода истекло' })

        const createdUser = await User.create({
            userName,
            email,
            password: hashedPassword,
        })

        await EmailCodes.updateOne(lastEmailCode, { $set: { used: true }})

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

export const sendConfirmationCode = async (req, res) => {
    const codeDuration = 3;
    const sendLimitSeconds = 90;

    const { email } = req.body;

    if (!email) res.status(400).json({ error: 'Емейл не передан' })

    const foundRecords = await EmailCodes.find({ email })
    const dates = foundRecords
        .map(record => record.createdAt.getTime())

    if (dates.length !== 0) {
        const lastTime = dates.reduce((x, y) => Math.max(x, y))
        const currentTime = new Date().getTime()

        if (lastTime + (sendLimitSeconds * 1000) > currentTime) {
            return res.status(400).json({ error: 'Повторное подтверждение доступно через 90 секунд' })
        }
    }

    const randomNumber = Math.random().toString().slice(-4)
    const currentDate = new Date()
    const endTime = currentDate.setMinutes(currentDate.getMinutes() + codeDuration)

    await EmailCodes.create({
        email,
        code: randomNumber,
        used: false,
        endTime,
    })

    console.log(randomNumber);

    res.status(200).json({ success: true });
}