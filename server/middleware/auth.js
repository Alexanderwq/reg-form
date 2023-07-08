import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const SECRET = process.env.SECRET;

const auth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]

    let decodeData;

    if(!token) res.status(401).json({ error: 'Нет токена' })

    try {
        decodeData = jwt.verify(token, SECRET)
        req.userId = decodeData?.id

        next()
    } catch (e) {
        res.status(403).json({ error: 'Доступ запрещен' })
    }
}

export default auth