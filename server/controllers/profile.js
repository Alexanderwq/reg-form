import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const user = await User.findById(req.userId)
    const URL_IMG = __dirname + '/../uploads/photos'
    const ext = req.files.file.name
        .split('.')
        .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
        .slice(1)
        .join('.')

    const hashedName = (Math.random() + 1).toString(36).substring(7) + '.' + ext;

    if (ext !== 'png' && ext !== 'jpg') return res.status(500).json({})

    await req.files.file.mv(URL_IMG + '/' + hashedName)

    user.img = hashedName
    await user.save()

    return res.status(200).json({ img: hashedName })
}

export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.userId)

    if (user) {
        return res.status(200)
            .json({
                userName: user.userName,
                email: user.email,
                img: user.img
            });
    } else {
        return res.status(404);
    }
}