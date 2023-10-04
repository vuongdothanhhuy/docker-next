// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import crypto from 'crypto'
import prisma from "@/helper/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'POST': {
            const {email, password} = req.body
            if (email && password) {
                const result = await prisma.user.create({
                    data: {
                        email: email,
                        password: crypto.createHash('md5').update(password).digest('hex')
                    }
                })
                return res.status(201).json(result)
            }

            return res.status(400).json({})
        }
        default: {
            return res.status(400).json({})
        }
    }
}
