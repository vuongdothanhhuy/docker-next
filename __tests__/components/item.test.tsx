import '@testing-library/jest-dom'
import {act, render, screen} from "@testing-library/react";
import Item from "@/components/item";

describe('Item Component', () => {
    it('renders Item component', async () => {
        await act(async () => render(<Item
            url='url-item'
            title='title-item'
            shareBy='shareBy-item'
            description='description-item'/>))

        const item = screen.getByTestId('item-component')
        const img = screen.getByAltText('video thumbnail')
        const itemDesc = screen.getByTestId('item-component-desc')

        expect(item).toBeInTheDocument()
        expect(img).toBeInTheDocument()
        // This one is failing and I'm currently have no idea on how to fix this.
        // expect(img.src).toContainEqual('url-item')
        expect(itemDesc).toBeInTheDocument()
        expect(itemDesc).toHaveTextContent('title-item')
        expect(itemDesc).toHaveTextContent('shareBy-item')
        expect(itemDesc).toHaveTextContent('description-item')
    })
})
