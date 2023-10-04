import '@testing-library/jest-dom'
import {act, fireEvent, render, screen} from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import MyAccount from "@/components/myAccount";

describe('MyAcount Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('renders MyAccount component when not login', async () => {
        await act(async () => render(<MyAccount
            currUser={{}}
            isAuth={false}
            setIsAuth={jest.fn()}
            setIsFormShare={jest.fn()}
            setCurrUser={jest.fn()}
        />))

        const myaccount = screen.queryByTestId('myaccount-component')
        expect(myaccount).not.toBeInTheDocument()
    })

    it('renders MyAccount component when logged-in', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}));

        await act(async () => render(<MyAccount
            currUser={{email: 'test@here.di'}}
            isAuth={true}
            setIsAuth={jest.fn()}
            setIsFormShare={jest.fn()}
            setCurrUser={jest.fn()}
        />))

        const myaccount = screen.getByTestId('myaccount-component')
        expect(myaccount).toBeInTheDocument()
        expect(myaccount).toHaveTextContent('Welcome test@here.di')

        const logoutBtn = screen.getByTestId('logout-button')
        fireEvent.click(logoutBtn)

        expect(fetchMock.mock.calls.length).toEqual(1)
        expect(fetchMock.mock.calls[0][0]).toEqual('/api/logout')
        expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
    })
})
