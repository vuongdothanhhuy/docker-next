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
        <div className="item-wrapper flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="preview-wrapper flex-auto basis-1/3">
                {/* Better to use Next/Image here */}
                <img src={`https://img.youtube.com/vi/${url}/hqdefault.jpg`} alt=""/>
            </div>
            <div className="description-wrapper basis-2/3">
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
