import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import User from "../models/UserModel.js"
import jwt from 'jsonwebtoken'
import EmailCodes from "../models/EmailCodesModel.js";
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()
const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const getAuthStatus = async (req, res) => {
    return res.status(200).json({ authorization: true })
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) return res.status(500).json({})

        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!isCorrectPassword) return res.status(400).json({ message: 'Неправильный пароль' })

        const token = jwt.sign(
            {id: user._id, email: user.email },
            TOKEN_SECRET,
            { expiresIn: '30m'}
        )

        return res.status(200).json({ user, token })
    } catch (e) {
        return res.status(500).json({ message: 'Произошла ошибка' })
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

export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.userId)

    if (user) {
        return res.status(200)
            .json({
                userName: user.userName,
                email: user.email,
            });
    } else {
        return res.status(404);
    }
}

export const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.userId)

    let { userName, email, password, confirmPassword} = req.body;

    userName = userName || user.userName
    email = email || user.email

    if (password || confirmPassword) {
        if (password !== confirmPassword) return res.status(500).json({})

        user.password = await bcrypt.hash(password, 12)
    }

    user.userName = userName
    user.email = email

    const updatedUser = await user.save();

    return res.status(200).json({ user: updatedUser })
}

export const uploadProfilePhoto = async (req, res) => {
    const URL_IMG = __dirname + '/../uploads/photos'
    const ext = req.files.file.name
        .split('.')
        .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
        .slice(1)
        .join('.')

    const hashedName = (Math.random() + 1).toString(36).substring(7);

    if (ext !== 'png' && ext !== 'jpg') return res.status(500).json({})

    await req.files.file.mv( URL_IMG + '/' + hashedName + '.' + ext)
    res.end(req.files.file.name)

    return res.status(200).json({})

}