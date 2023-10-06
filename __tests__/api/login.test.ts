import {createMocks, MockResponse} from 'node-mocks-http'
import handler                     from '@/pages/api/login'
import prisma                      from "@/helper/prisma";

describe('/api/login', () => {
    it('login ok - correct cred', async () => {
        prisma.user.findFirst = jest
            .fn().mockReturnValue({
                                      email: 'email@here.go',
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

        console.log('asdf', response._getJSONData())

        expect(response.statusCode).toBe(201)
        expect(await response._getJSONData())
            .toEqual({
                         email: 'email@here.go',
                         password: 'fc5e038d38a57032085441e7fe7010b0',
                     })
    })

    it('login not ok - wrong cred', async () => {
        prisma.user.findFirst = jest
            .fn().mockReturnValue(null);

        const {req, res} = createMocks({
                                           method: 'POST',
                                           body: {
                                               email: 'email@here.go',
                                               password: 'some_md5_hash',
                                           },
                                       }, {})

        const response: MockResponse<any> = await handler(req, res)
        expect(response.statusCode).toBe(403)
        expect(await response._getJSONData()).toEqual({})
    })

    it('login not ok - wrong http method', async () => {
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
