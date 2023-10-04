import useFetch from "@/helper/useFetch";
import Item from "@/components/item";
import Share from "@/components/share";

type MainProps = {
    isFormShare: boolean,
    setIsFormShare: Function,
    isAuth: boolean,
    currUser: Object,
}

/**
 * This is Main component to house the list of Item and the Share form.
 *
 * @param isFormShare
 * @param setIsFormShare
 * @param isAuth
 * @param currUser
 * @constructor
 */
const Main = ({
                  isFormShare,
                  setIsFormShare,
                  isAuth,
                  currUser
              }: MainProps) => {

    // This uses SWR and constantly fetch Items from server.
    const {
        data: items,
        error,
        isLoading
    }: any = useFetch('item')

    return (
        <div className="main-wrapper mt-4 flex flex-col md:w-1/2 gap-4 mx-auto">
            {!isLoading && !error && !isFormShare &&
                items.map((item: any, index: any) => {
                    // Yes, use index as key is bad, but for the purpose of this demo, we think it's okay.
                    return (<Item key={index} {...item}/>)
                })
            }

            {isFormShare && <Share isAuth={isAuth} setIsFormShare={setIsFormShare} currUser={currUser}/>}
        </div>
    )
}

export default Main
