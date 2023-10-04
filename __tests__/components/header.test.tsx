import '@testing-library/jest-dom'
import {act, render, screen} from "@testing-library/react";
import Header from "@/components/header";

describe('Header Component', () => {
    it('renders Header component in non-login state', async () => {
        await act(async () => render(<Header setCurrUser={jest.fn()} setIsAuth={jest.fn()} currUser={{}} isAuth={false}
                                             setIsFormShare={jest.fn()}/>))

        const header = screen.getByTestId('header-component')
        const login = screen.getByTestId('login-component')

        expect(header).toBeInTheDocument()
        expect(login).toBeInTheDocument()
    })

    it('renders Header component in logged-in state', async () => {
        await act(async () => render(<Header setCurrUser={jest.fn()} setIsAuth={jest.fn()}
                                             currUser={{email: 'tester@logged.in'}} isAuth={true}
                                             setIsFormShare={jest.fn()}/>))

        const header = screen.getByTestId('header-component')
        const login = screen.queryByTestId('login-component')
        const myaccount = screen.getByTestId('myaccount-component')
        const welcomeMsg = screen.getByText('Welcome tester@logged.in')

        expect(header).toBeInTheDocument()
        expect(login).not.toBeInTheDocument()
        expect(myaccount).toBeInTheDocument()
        expect(welcomeMsg).toBeInTheDocument()
    })
})
