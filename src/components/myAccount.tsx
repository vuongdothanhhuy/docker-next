type MyAccountProps = {
    currUser: Object,
    isAuth: boolean,
    setIsAuth: Function,
    setIsFormShare: Function,
    setCurrUser: Function,
}

/**
 * My Account component.
 * @param currUser
 * @param isAuth
 * @param setIsAuth
 * @param setIsFormShare
 * @param setCurrUser
 * @constructor
 */
const MyAccount = ({currUser, isAuth, setIsAuth, setIsFormShare, setCurrUser}: MyAccountProps) => {
    const logout = async () => {
        const req = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: null
        })

        if (req.ok) {
            setCurrUser(null)
            setIsAuth(false)
        } else {
            alert('Cannot logout!')
        }
    }

    const shareFormToggle = () => {
        setIsFormShare(true)
    }

    if (currUser && isAuth) {
        return (<div className="my-account-wrapper" data-testid="myaccount-component">
            <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-2 items-center">
                <div className="w-full flex-auto text-right">
                    {/*@ts-ignore*/}
                    Welcome {currUser.email}
                </div>
                <div className="flex-auto">
                    <button type="button"
                            onClick={shareFormToggle}
                            className="w-max">
                        Share a movie
                    </button>
                </div>
                <div className="flex-auto">
                    <button type="button"
                            data-testid='logout-button'
                            onClick={logout}
                            className="w-max">
                        Logout
                    </button>
                </div>
            </div>
        </div>)
    }
    return null
}

export default MyAccount
