import {mutate} from "swr";
import {useState} from "react";

type ShareProps = {
    setIsFormShare: Function,
    isAuth: boolean,
    currUser: Object,
}

/**
 * Share component.
 *
 * @param setIsFormShare
 * @param isAuth
 * @param currUser
 * @constructor
 */
const Share = ({setIsFormShare, isAuth, currUser}: ShareProps) => {
    const [url, setUrl] = useState('')

    const share = async () => {
        if (!isAuth) return alert('Not login! Cannot share video')

        const req = await fetch('/api/item', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                // @ts-ignore
                shareBy: currUser.email
            })
        })

        if (req.ok) {
            setIsFormShare(false)
            await mutate('/api/item')
        } else {
            alert('Cannot share!')
        }
    }

    if (isAuth && currUser) {
        return (<div className="md:w-1/2 mx-auto" data-testid='share-component'>
            <div className="relative z-0 w-full mb-6">
                <input type="text" name="floating_text" id="floating_text"
                       value={url}
                       onChange={e => setUrl(e.target.value)}
                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       placeholder="Youtube URL..." required/>
                <label htmlFor="floating_text"
                       className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Share
                    a Youtube video...</label>
            </div>

            <button
                type="button"
                data-testid='submit-button'
                onClick={share}>Share
            </button>
        </div>)
    }
    return null
}

export default Share
