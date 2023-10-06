import {createMocks, MockResponse} from 'node-mocks-http'
import handler                     from '@/pages/api/logout'

describe('/api/logout', () => {
    it('logout ok', async () => {
        const {req, res} = createMocks({
                                           method: 'GET',
                                       }, {})

        const response: MockResponse<any> = await handler(req, res)
        expect(response.statusCode).toBe(200)
        expect(response.cookies['login_token']).not.toBeDefined()
        expect(await response._getJSONData()).toEqual({})
    })
})
