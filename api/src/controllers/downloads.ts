import express from 'express'
import jwt from 'jsonwebtoken'
import { predefinedUserUUIDs } from '../database/helpers/ids'

const router = express.Router()

router.get('/:id', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', 'attachment; filename=PhotonMedia.zip')

    try {
        let userInfo

        if (process.env.NODE_ENV === 'test') {
            userInfo = {
                id: predefinedUserUUIDs[0]
            }
        }
        else {
            jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET as string)
            userInfo = jwt.decode(req.cookies.accessToken) as { id: string }
        }

        res.download(`downloads/${req.params.id}`, 'PhotonMedia.zip')
    }
    catch {
        res.statusCode = 403
        res.send()
        next()
    }
})

export default router
