// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import ytdl from "ytdl-core";
import prisma from "@/helper/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET': {
            const result = await prisma.item.findMany({
                include: {
                    shareBy: true
                },
                orderBy: {
                    id: 'desc'
                }
            })

            //remap the obj to process the shareBy
            result.map((item: any) => {
                item.shareBy = item.shareBy.map((item: {
                    email: any
                }) => item.email).join(';')
                return item
            })

            return res.status(201).json(result)
        }
        case 'PUT': {
            const {
                url,
                shareBy,
            } = req.body

            try {
                const {urlParsed, titleParsed, descriptionParsed} = await ytdl.getBasicInfo(url).then(info => {
                    return {urlParsed: info.videoDetails.videoId, titleParsed: info.videoDetails.title, descriptionParsed: info.videoDetails.description?.substring(0, 255)}
                })
                const result = await prisma.item.upsert({
                    where: {
                        // @ts-ignore
                        url: urlParsed
                    },
                    update: {
                        title: titleParsed,
                        description: descriptionParsed,
                    },
                    create: {
                        title: titleParsed,
                        // @ts-ignore
                        url: urlParsed,
                        shareBy: {
                            connect: [{email: shareBy}]
                        },
                        // @ts-ignore
                        description: descriptionParsed,
                    }
                })
                return res.status(201).json(result)
            } catch (e) {
                return res.status(400).json(e)
            }
        }
        default: {
            return res.status(400).json({})
        }
    }
}
