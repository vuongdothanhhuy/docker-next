import {createMocks, MockResponse} from 'node-mocks-http'
import handler                     from '@/pages/api/signup'
import prisma                      from "@/helper/prisma";

describe('/api/signup', () => {
    it('register ok - full cred', async () => {
        prisma.user.create = jest
            .fn().mockReturnValue({
                                      email: 'email@here.go',
                                      id: 4,
                                      password: 'fc5e038d38a57032085441e7fe7010b0', // this is
                                                                                    // the md5
                                                                                    // hash of
                                                                                    // "helloworld"
                                  });

        const {req, res} = createMocks({
                                           method: 'POST',
                                           body: {
                                               email: 'email@here.go',
                                               password: 'helloworld',
                                           },
                                       })

        const response: MockResponse<any> = await handler(req, res)

        expect(response.statusCode).toBe(201)
        expect(await response._getJSONData())
            .toMatchObject({
                               email: 'email@here.go',
                               password: 'fc5e038d38a57032085441e7fe7010b0',
                           })
    })

    it('register not ok - missing cred or duplicate cred', async () => {
        prisma.user.findFirst = jest
            .fn().mockReturnValue(null);
        const {req, res} = createMocks({
                                           method: 'POST',
                                           body: {
                                               email: 'email@here.go',
                                           },
                                       }, {})

        const response: MockResponse<any> = await handler(req, res)
        expect(response.statusCode).toBe(400)
        expect(await response._getJSONData()).toEqual({})
    })

    it('register not ok - wrong http method', async () => {
        const prisma = {
            user: {
                firstFind: jest.fn(),
            },
        }
        const {req, res} = createMocks({
                                           method: 'GET',
                                       }, {})

        const response: MockResponse<any> = await handler(req, res)
        expect(response.statusCode).toBe(400)
        expect(await response._getJSONData()).toEqual({})
    })
})
