import { HiMenuAlt1 } from "react-icons/hi";
import NewSidebar from "../components/sidebar"
import { useProSidebar } from "react-pro-sidebar";
import { useContext, useEffect } from "react";
import appContext from "../context/globalContext";
import { useLocation } from "react-router-dom";

const Layout = (props) => {
    // const { collapseSidebar } = useProSidebar();
    let loc=useLocation()
    const context = useContext(appContext)

    // const abcd = () => {
    //     let ele = document.getElementById('ms_bar');
    //     if (ele.classList.contains('ps-collapsed')) {
    //         document.getElementById('wrapperblock').style.display = 'none';
    //     } else {
    //         document.getElementById('wrapperblock').style.display = 'block';
    //     }
    // }

    // useEffect(() => {
       
    //     {(context.token && (loc.pathname!=="/select" && loc.pathname!=="/terms-services"))&&
    //         // alert('hi')
    //         // console.log('hii')
    //         abcd()
    //     }
    // }, []);
    
    return (
        <>
            <div className="all-pages">
                {/* {(context.token && (loc.pathname!=="/select" && loc.pathname!=="/terms-services"))&&
                    <NewSidebar />
                } */}

                {props.children}
                {/* <div class={(context.token && (loc.pathname!=="/select" && loc.pathname!=="/terms-services"))?"overwraper":"get-started"} id="wrapperblock"></div> */}
            </div>


        </>
    )
}

export default Layout;