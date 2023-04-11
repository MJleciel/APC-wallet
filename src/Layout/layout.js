import { HiMenuAlt1 } from "react-icons/hi";
import NewSidebar from "../components/sidebar"
import { useProSidebar } from "react-pro-sidebar";
import { useContext, useEffect } from "react";
import appContext from "../context/globalContext";

const Layout = (props) => {
    // const { collapseSidebar } = useProSidebar();
    const context = useContext(appContext)
    const abcd = () => {
        let ele = document.getElementById('ms_bar');
        if (ele.classList.contains('ps-collapsed')) {
            document.getElementById('wrapperblock').style.display = 'none';
        } else {
            document.getElementById('wrapperblock').style.display = 'block';
        }
    }

    useEffect(() => {
       
        {context.token &&
            // alert('hi')
            abcd()
        }
    }, []);
    // console.log(context);
    return (
        <>
            <div className="all-pages">
                {context.token &&
                    <NewSidebar />
                }

                {props.children}
                <div class="overwraper" id="wrapperblock"></div>
            </div>


        </>
    )
}

export default Layout;