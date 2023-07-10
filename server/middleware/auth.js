import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const auth = async (req, res, next) => {
    const token = req.headers.authorization

    let decodeData;

    if(!token) return res.status(401).json({ error: 'Нет токена' })

    try {
        decodeData = jwt.verify(token, TOKEN_SECRET)
        req.userId = decodeData?.id

        return next()
    } catch (e) {
        return res.status(403).json({ error: 'Доступ запрещен' })
    }
}

export default auth