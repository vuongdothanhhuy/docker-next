import '@testing-library/jest-dom'
import {act, render, screen} from "@testing-library/react";
import Main from "@/components/main";
import fetchMock from "jest-fetch-mock";

describe('Main Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('renders Main component when not login', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([
            {
                title: 'Check out Prisma with Next.js',
                url: 'eQlaPV1SNL4',
                shareBy: 'test@here.id',
                like: 12,
                dislike: 22,
                description: 'Lorem Ipsum'
            },
            {
                title: 'Check out Prisma with Next.js',
                url: 'eQlaPV1SNL4',
                shareBy: 'test@here.id',
                like: 12,
                dislike: 22,
                description: 'Lorem Ipsum'
            }
        ]), {
            status: 201
        });

        await act(async () => render(<Main
            isFormShare={false}
            setIsFormShare={jest.fn()}
            isAuth={false}
            currUser={{}}
        />))

        const main = screen.getByTestId('main-component')
        expect(main).toBeInTheDocument()

        const items = screen.getAllByTestId('item-component')
        expect(items[0]).toBeInTheDocument()
        expect(items.length).toEqual(2)
    })

    it('renders Main component when logged-in', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([
            {
                title: 'Check out Prisma with Next.js',
                url: 'eQlaPV1SNL4',
                shareBy: 'test@here.id',
                like: 12,
                dislike: 22,
                description: 'Lorem Ipsum'
            },
            {
                title: 'Check out Prisma with Next.js',
                url: 'eQlaPV1SNL4',
                shareBy: 'test@here.id',
                like: 12,
                dislike: 22,
                description: 'Lorem Ipsum'
            }
        ]), {
            status: 201
        });

        await act(async () => render(<Main
            isFormShare={false}
            setIsFormShare={jest.fn()}
            isAuth={true}
            currUser={{}}
        />))

        const main = screen.getByTestId('main-component')
        expect(main).toBeInTheDocument()

        const items = screen.getAllByTestId('item-component')
        expect(items[0]).toBeInTheDocument()
        expect(items.length).toEqual(2)
    })

    it('renders Main component when in sharing mode', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([
            {
                title: 'Check out Prisma with Next.js',
                url: 'eQlaPV1SNL4',
                shareBy: 'test@here.id',
                like: 12,
                dislike: 22,
                description: 'Lorem Ipsum'
            },
            {
                title: 'Check out Prisma with Next.js',
                url: 'eQlaPV1SNL4',
                shareBy: 'test@here.id',
                like: 12,
                dislike: 22,
                description: 'Lorem Ipsum'
            }
        ]), {
            status: 201
        });

        await act(async () => render(<Main
            isFormShare={true}
            setIsFormShare={jest.fn()}
            isAuth={true}
            currUser={{email: 'some@one.here'}}
        />))

        const main = screen.getByTestId('main-component')
        expect(main).toBeInTheDocument()

        const share = screen.getByTestId('share-component')
        expect(share).toBeInTheDocument()
    })
})
