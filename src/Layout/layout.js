import { HiMenuAlt1 } from "react-icons/hi";
import NewSidebar from "../components/sidebar"
import { useProSidebar } from "react-pro-sidebar";
import { useContext } from "react";
import appContext from "../context/globalContext";

const Layout = (props) => {
    const { collapseSidebar } = useProSidebar();
    const context = useContext(appContext)
    console.log(context);
    return (
        <>
            <div className="all-pages">
                {context.token &&
                    <NewSidebar />
                }

                {props.children}
            </div>


        </>
    )
}

export default Layout;