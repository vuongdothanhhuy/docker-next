import {useState} from "react";

type LoginProps = {
    setCurrUser: Function,
    setIsAuth: Function,
}

/**
 * Login component
 *
 * @param setCurrUser
 * @param setIsAuth
 * @constructor
 */
const Login = ({setCurrUser, setIsAuth}: LoginProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // login() call when click on the button.
    const login = async () => {
        const req = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const reqValue = await req.json()

        if (req.ok) {
            /**
             * To keep everything simple in a constraint timeline, some decisions have been made:
             *  - When the API return ok, it means account is registered/login, and session is generated on BE.
             *  - On FE, we store the whole returned User obj to be used later. In real life, this is discouraged,
             *      and it must be implemented in a more properly way.
             *  - We have an "isAuth" bool var to tell whether we're logged in or not. In real life,
             *      it can be an SWR that constantly fetch status from the server, better!
             */
            setCurrUser(reqValue)
            setIsAuth(true)
        } else {
            alert('Cannot login!')
        }
    }

    // sign up for new account
    const signup = async () => {
        const req = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const reqValue = await req.json()

        if (req.ok) {
            /**
             * To keep everything simple in a constraint timeline, some decisions have been made:
             *  - When the API return ok, it means account is registered/login, and session is generated on BE.
             *  - On FE, we store the whole returned User obj to be used later. In real life, this is discouraged,
             *      and it must be implemented in a more properly way.
             *  - We have an "isAuth" bool var to tell whether we're logged in or not. In real life,
             *      it can be an SWR that constantly fetch status from the server, better!
             */
            setCurrUser(reqValue)
            setIsAuth(true)
        } else {
            alert('Cannot signup!')
        }
    }

    return (
        <div className="login-form-wrapper" data-testid="login-component">
            <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-2">
                <div className="w-full flex-1">
                    <div className="bg-white h-full flex border border-gray-200 rounded">
                        <input placeholder="Email"
                               type="email"
                               value={email}
                               onChange={e => setEmail(e.target.value)}
                               className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                    </div>
                </div>
                <div className="w-full flex-1">
                    <div className="bg-white h-full flex border border-gray-200 rounded">
                        <input placeholder="Password"
                               type="password"
                               value={password}
                               onChange={e => setPassword(e.target.value)}
                               className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                    </div>
                </div>
                <div className="w-max-fit">
                    <button type="button"
                            data-testid="login-button"
                            onClick={login}
                            className="p-1 px-2 bg-blue-500 w-full text-gray-800 border border-gray-200 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm sm:w-auto py-2.5 text-center">
                        Login
                    </button>
                    <button
                        data-testid="signup-button"
                        onClick={signup}
                        className="p-1 px-2 bg-amber-600 w-full text-gray-800 border border-gray-200 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm sm:w-auto py-2.5 text-center">
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
