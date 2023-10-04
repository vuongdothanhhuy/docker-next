import Image from 'next/image'

type ItemProps = {
    url: string,
    title: string,
    shareBy: string,
    description: string,
}

/**
 * Item component to display shared video.
 *
 * @param url
 * @param title
 * @param shareBy
 * @param description
 * @constructor
 */
const Item = ({
                  url,
                  title,
                  shareBy,
                  description
              }: ItemProps) => {
    return (
        <div className="item-wrapper flex flex-col md:flex-row justify-center items-center gap-8"
             data-testid='item-component'>
            <div className="preview-wrapper flex-auto basis-1/3">
                <Image
                    src={`https://img.youtube.com/vi/${url}/hqdefault.jpg?randomhash=${Math.random()}`}
                    alt="video thumbnail"
                    width={300}
                    height={150}
                />
            </div>
            <div className="description-wrapper basis-2/3" data-testid='item-component-desc'>
                <div className="font-bold text-red-500">{title}</div>
                <div>Shared by {shareBy}</div>
                <div>
                    Description: <br/>
                    <span className="ml-4">{description}</span>
                </div>
            </div>
        </div>
    )
}

export default Item
