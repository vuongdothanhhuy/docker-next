// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextApiRequest, NextApiResponse} from "next";
import {setCookie} from "cookies-next";
import crypto from "crypto";
import prisma from "@/helper/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        // Process a POST request
        const {email, password} = req.body
        if (email && password) {
            const result = await prisma.user.findFirst({
                where: {
                    email: email,
                }
            })
            let hashPwd = crypto.createHash('md5').update(password).digest('hex');
            if (result?.password === hashPwd) {
                //login ok
                // For simplicity, we use the whole User object as the token. Bad practice in real life,
                //  use something like JWT for this.
                setCookie('login_token', result, {
                    req,
                    res,
                    maxAge: 60 * 60 * 24,
                    httpOnly: true,
                    path: '/'
                })

                return res.status(201).json(result)
            }
            return res.status(403).json({})
        }
    }
    return res.status(400).json({})
}
