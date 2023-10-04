// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextApiRequest, NextApiResponse} from "next";
import {deleteCookie} from "cookies-next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    deleteCookie('login_token', {req, res, path: '/'})
    return res.status(200).json({})
}
