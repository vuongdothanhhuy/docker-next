import Header from "@/components/header";
import Main from "@/components/main";
import {NextRequest, NextResponse} from "next/server";
import {useState} from "react";
import {getCookie, hasCookie} from "cookies-next";

type HomeProps = {
    isLogin: boolean,
    user: Object,
}

/**
 * Home page
 *
 * @param isLogin
 * @param user
 * @constructor
 */
export default function Home({isLogin, user}: HomeProps) {
    /**
     * Use state for simplicity of this project.
     * In real, it's better to use things like Redux to manage state for the whole app.
     */
    const [currUser, setCurrUser] = useState(user)
    const [isAuth, setIsAuth] = useState(isLogin)
    const [isFormShare, setIsFormShare] = useState(false)

    return (
        <main className="container mx-auto m-4" data-testid="home-component">
            <Header isAuth={isAuth} setIsAuth={setIsAuth} currUser={currUser} setCurrUser={setCurrUser}
                    setIsFormShare={setIsFormShare}/>
            <Main isFormShare={isFormShare} setIsFormShare={setIsFormShare} isAuth={isAuth} currUser={currUser}/>
        </main>
    )
}

/**
 * SSR feature of Next.js. This is to populate the props for this Home page component before sending it back to client.
 *
 * @param req
 * @param res
 */
export const getServerSideProps = async ({req, res}: { req: NextRequest, res: NextResponse }) => {
    return {
        props: {
            isLogin: hasCookie('login_token', {req, res}),
            user: JSON.parse((getCookie('login_token', {req, res}) || null) as string) || {}
        }, // Will be passed to the page component as props
    }
}
