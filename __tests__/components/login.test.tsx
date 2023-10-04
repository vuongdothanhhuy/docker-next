import '@testing-library/jest-dom'
import {act, fireEvent, render, screen} from "@testing-library/react";
import Login from "@/components/login";
import fetchMock from "jest-fetch-mock";

describe('Login Component', () => {
    it('renders Login component', async () => {
        await act(async () => render(<Login setCurrUser={jest.fn()} setIsAuth={jest.fn()}/>))

        const login = screen.getByTestId('login-component')

        expect(login).toBeInTheDocument()
    })

    it('can receive input', async () => {
        await act(async () => render(<Login setCurrUser={jest.fn()} setIsAuth={jest.fn()}/>))

        const login = screen.getByTestId('login-component')
        expect(login).toBeInTheDocument()

        const inputEmail = screen.getByPlaceholderText('Email')
        expect(inputEmail).toHaveValue('')
        fireEvent.change(inputEmail, {
            target: {value: 'tester@login.fail'}
        })
        expect(inputEmail).toHaveValue('tester@login.fail')

        const inputPassword = screen.getByPlaceholderText('Password')
        expect(inputPassword).toHaveValue('')
        fireEvent.change(inputEmail, {
            target: {value: '1234'}
        })
        expect(inputEmail).toHaveValue('1234')
    })

    describe('Test login functionality', () => {
        beforeEach(() => {
            fetchMock.resetMocks();
        });

        it('can receive input and call login api', async () => {
            fetchMock.mockResponseOnce(JSON.stringify({
                id: 1,
                email: 'tester@login.attempt',
            }), {
                status: 201
            });

            await act(async () => render(<Login setCurrUser={jest.fn()} setIsAuth={jest.fn()}/>))

            const login = screen.getByTestId('login-component')
            expect(login).toBeInTheDocument()

            const inputEmail = screen.getByPlaceholderText('Email')
            fireEvent.change(inputEmail, {
                target: {value: 'tester@login.attempt'}
            })

            const inputPassword = screen.getByPlaceholderText('Password')
            fireEvent.change(inputPassword, {
                target: {value: '1234'}
            })

            const loginBtn = screen.getByTestId('login-button')
            fireEvent.click(loginBtn)

            expect(fetchMock.mock.calls.length).toEqual(1)
            expect(fetchMock.mock.calls[0][0]).toEqual('/api/login')
            expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
        })

        it('can login ok', async () => {
            fetchMock.mockResponseOnce(JSON.stringify({
                id: 1,
                email: 'tester@login.attempt',
            }), {
                status: 201
            });

            const setCurrUserMock = jest.fn()
            const setIsAuthMock = jest.fn()

            await act(async () => render(<Login setCurrUser={setCurrUserMock}
                                                setIsAuth={setIsAuthMock}/>))

            const login = screen.getByTestId('login-component')
            expect(login).toBeInTheDocument()

            const inputEmail = screen.getByPlaceholderText('Email')
            fireEvent.change(inputEmail, {
                target: {value: 'tester@login.attempt'}
            })

            const inputPassword = screen.getByPlaceholderText('Password')
            fireEvent.change(inputPassword, {
                target: {value: '1234'}
            })

            const loginBtn = screen.getByTestId('login-button')
            fireEvent.click(loginBtn)

            expect(fetchMock.mock.calls.length).toEqual(1)
            expect(fetchMock.mock.calls[0][0]).toEqual('/api/login')
            expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
            expect(JSON.parse(fetchMock.mock.calls[0][1]?.body as string)).toHaveProperty('email', 'tester@login.attempt')
        })

        it('throw alert when login not ok', async () => {
            fetchMock.mockResponseOnce(JSON.stringify({}), {status: 400})

            await act(async () => render(<Login setCurrUser={jest.fn()} setIsAuth={jest.fn()}/>))

            const login = screen.getByTestId('login-component')
            expect(login).toBeInTheDocument()

            const inputEmail = screen.getByPlaceholderText('Email')
            fireEvent.change(inputEmail, {
                target: {value: 'tester@login.attempt'}
            })

            const inputPassword = screen.getByPlaceholderText('Password')
            fireEvent.change(inputPassword, {
                target: {value: '1234'}
            })

            const loginBtn = screen.getByTestId('login-button')
            fireEvent.click(loginBtn)

            expect(fetchMock.mock.calls.length).toEqual(1)
            expect(fetchMock.mock.calls[0][0]).toEqual('/api/login')
            expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
        })
    })
})
