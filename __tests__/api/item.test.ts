import {createMocks, MockResponse} from 'node-mocks-http'
import handler                     from '@/pages/api/item'
import prisma                      from "@/helper/prisma";
import ytdl                        from "ytdl-core";

describe('/api/item', () => {
    it('get item ok', async () => {
        prisma.item.findMany = jest
            .fn().mockReturnValue([{
                title: 'Check out Prisma with Next.js',
                url: 'eQlaPV1SNL4',
                shareBy: [{
                    email: 'some@one.here',
                    id: 11,
                    password: 'hash',
                }],
                like: 12,
                dislike: 22,
                description: 'Lorem Ipsum',
            }])

        const {req, res} = createMocks({
                                           method: 'GET',
                                       })

        const response: MockResponse<any> = await handler(req, res)

        expect(response.statusCode).toBe(201)
        expect(await response._getJSONData()).toHaveLength(1)
        expect(await response._getJSONData()[0])
            .toMatchObject({
                               title: 'Check out Prisma with Next.js',
                               url: 'eQlaPV1SNL4',
                               shareBy: 'some@one.here',
                               like: 12,
                               dislike: 22,
                               description: 'Lorem Ipsum',
                           })
    });

    it('create item ok', async () => {
        prisma.item.upsert = jest
            .fn().mockReturnValue([{
                title: 'Check out Prisma with Next.js',
                url: 'eQlaPV1SNL4',
                shareBy: [{
                    email: 'some@one.here',
                    id: 11,
                    password: 'hash',
                }],
                like: 12,
                dislike: 22,
                description: 'Lorem Ipsum',
            }])

        const {req, res} = createMocks({
                                           method: 'PUT',
                                           body: {
                                               url: 'eQlaPV1SNL4',
                                               shareBy: 'some@one.here',
                                           },
                                       })

        const response: MockResponse<any> = await handler(req, res)

        expect(response.statusCode).toBe(201)
        expect(await response._getJSONData()).toHaveLength(1)
        expect(await response._getJSONData()[0])
            .toMatchObject({
                               title: 'Check out Prisma with Next.js',
                               url: 'eQlaPV1SNL4',
                               shareBy: [{
                                   email: 'some@one.here',
                                   id: 11,
                                   password: 'hash',
                               }],
                               like: 12,
                               dislike: 22,
                               description: 'Lorem Ipsum',
                           })
    });

    it('create item not ok - wrong format', async () => {
        prisma.item.upsert = jest
            .fn().mockReturnValue(new Error('mock_error'))
        ytdl.getBasicInfo = jest.fn().mockImplementation(() => Promise.reject(new Error('something went wrong')))

        const {req, res} = createMocks({
                                           method: 'PUT',
                                           body: {
                                               url: 'wrong_url',
                                               shareBy: 'some@one.here',
                                           },
                                       })

        const response: MockResponse<any> = await handler(req, res)
        console.log(response._getJSONData())
        expect(response.statusCode).toBe(400)
        expect(await response._getJSONData())
            .toMatchObject({})
    });

    it('create item not ok - wrong http method', async () => {
        prisma.item.create = jest
            .fn().mockReturnValue(null);
        const {req, res} = createMocks({
                                           method: 'UPDATE',
                                       }, {})

        const response: MockResponse<any> = await handler(req, res)
        expect(response.statusCode).toBe(400)
        expect(await response._getJSONData()).toEqual({})
    })
})
