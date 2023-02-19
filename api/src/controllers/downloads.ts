import express from 'express'
import jwt from 'jsonwebtoken'
import { predefinedUserUUIDs } from '../database/helpers/ids'
import { getEnv } from '../../env'

const router = express.Router()
const env = getEnv()

router.get('/:id', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', 'attachment; filename=PhotonMedia.zip')

    try {
        let userInfo

        if (parseInt(env.API_CREDENTIALS || '1', 10)) {
            userInfo = {
                id: predefinedUserUUIDs[0]
            }
        }
        else {
            jwt.verify(req.cookies.accessToken, env.JWT_SECRET as string)
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
