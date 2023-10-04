import '@testing-library/jest-dom'
import {act, fireEvent, render, screen} from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import Share from "@/components/share";

describe('Share Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('renders Share component when not login', async () => {
        await act(async () => render(<Share
            currUser={{}}
            isAuth={false}
            setIsFormShare={jest.fn()}
        />))

        const share = screen.queryByTestId('share-component')
        expect(share).not.toBeInTheDocument()
    })

    it('renders Share component and share something', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}));

        await act(async () => render(<Share
            currUser={{email: 'here@test.di'}}
            isAuth={true}
            setIsFormShare={jest.fn()}
        />))

        const share = screen.getByTestId('share-component')
        expect(share).toBeInTheDocument()

        const input = screen.getByPlaceholderText('Youtube URL...')
        fireEvent.change(input, {
            target: {value: 'https://www.youtube.com/watch?v=l9-KNJTc_UU'}
        })

        const submitBtn = screen.getByTestId('submit-button')
        fireEvent.click(submitBtn)

        expect(fetchMock.mock.calls.length).toEqual(1)
        expect(fetchMock.mock.calls[0][0]).toEqual('/api/item')
        expect(fetchMock.mock.calls[0][1]?.method).toEqual('PUT')
    })
})
