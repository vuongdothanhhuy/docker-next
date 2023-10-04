import '@testing-library/jest-dom'
import {act, render, screen} from "@testing-library/react";
import Home from "@/pages";

describe('Home', () => {
    it('renders home page with login/register component', async () => {
        await act(async () => render(<Home isLogin={false} user={{}}/>))

        const wrapper = screen.getByTestId('home-component')
        const header = screen.getByTestId('header-component')
        const login = screen.getByTestId('login-component')
        const main = screen.getByTestId('main-component')

        expect(wrapper).toBeInTheDocument()
        expect(header).toBeInTheDocument()
        expect(login).toBeInTheDocument()
        expect(main).toBeInTheDocument()
    })

    it('renders home page with myaccount component', async () => {
        await act(async () => render(<Home isLogin={true} user={{email: 'tester@tester.de'}}/>))

        const wrapper = screen.getByTestId('home-component')
        const header = screen.getByTestId('header-component')
        const login = screen.queryByTestId('login-component')
        const myaccount = screen.getByTestId('myaccount-component')
        const myaccountEmailUser = screen.getByText('Welcome tester@tester.de')
        const main = screen.getByTestId('main-component')

        expect(wrapper).toBeInTheDocument()
        expect(header).toBeInTheDocument()
        expect(login).not.toBeInTheDocument()
        expect(myaccount).toBeInTheDocument()
        expect(myaccountEmailUser).toBeInTheDocument()
        expect(main).toBeInTheDocument()
    })
})
