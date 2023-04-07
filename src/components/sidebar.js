import { Fragment, useEffect, useRef, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { RxDashboard, RxExit } from 'react-icons/rx';
import { FaRegUser, FaSignOutAlt } from 'react-icons/fa';
import { BsWallet2, BsCashStack, BsPieChartFill } from 'react-icons/bs';
import { MdOutlineCardMembership } from 'react-icons/md';
import { SlSettings } from 'react-icons/sl';
import { TfiGift } from 'react-icons/tfi';
import { HiMenuAlt1 } from 'react-icons/hi';
import {BiLogOut} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import appContext from '../context/globalContext';
// import { log } from 'console';
// import appContext from "../context/globalContext";


const NewSidebar = () => {
    const navigate = useNavigate()
    const context=useContext(appContext)
    const [expanded, setExpanded] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);
    const [mySide, setMySide] = useState('0px');
    const refer = useRef(null);
    const { collapseSidebar } = useProSidebar();

    // const navigaion = () => {

    //     console.log( document.getElementById('wrapperblock'));
    //     let ele = document.getElementById('ms_bar');
    //     if (ele.classList.contains('ps-collapsed')) {
    //         document.getElementById('wrapperblock').style.display = 'block';
    //     }
    //     else {
    //         // ele.classList.remove("ps_collapsed")
    //         document.getElementById('wrapperblock').style.display = 'none';
    //     }
    // }

    const navigaion = () => {

        let ele = document.getElementById('ms_bar');
        // console.log(ele.classList.contains('ps-collapsed'));
        if (ele.classList.contains('ps-collapsed')) {

            document.getElementById('ms_bar').classList.remove('ps-collapsed');
            document.getElementById('ss_btn').classList.remove('mobiless');

            //     console.log('hi');
            //         // document.getElementById('wrapperblock').style.display = 'block';
            //         document.getElementById('ss_btn').classList.add('mobiless');

        }
        else {
            // ele.classList.remove("ps_collapsed")
            // document.getElementById('wrapperblock').style.display = 'none';
            document.getElementById('ms_bar').classList.add('ps-collapsed');
            document.getElementById('ss_btn').classList.add('mobiless');

        }
    }
    const collaspeClosed = () => {
        if (window.matchMedia("(max-width: 700px)").matches) {
            collapseSidebar()
            document.getElementById('wrapperblock').style.display = 'none';
        }

    }

    useEffect(() => {
        if (window.matchMedia("(max-width: 700px)").matches) {
            setShowSidebar(true)
            document.getElementById('wrapperblock').style.display = 'none';
        }

    }, [])

    return (
        <>
            <div  >
                <Sidebar className="main-sidebar" id="ms_bar">
                    <div className='w-100 mx-auto py-4 logo-img'>
                        <img className='img-fluid' src={require("../assets/images/apc-logo.png")} alt="" width="150px" />
                    </div>
                    <Menu>
                        {/* <SubMenu label="Charts">
                            <MenuItem> Pie charts </MenuItem>
                            <MenuItem> Line charts </MenuItem>
                        </SubMenu> */}
                        <MenuItem active={window.location.pathname === "/overview"} onClick={()=>navigate("/overview")}><BsPieChartFill />Overview</MenuItem>
                        <MenuItem active={window.location.pathname === "/wallet"} onClick={()=>navigate("/wallet")}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" class="bi bi-wallet-fill" viewBox="0 0 16 16">
                                                        <path
                                                            d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z" />
                                                        <path
                                                            d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z" />
                                                    </svg>Wallet</MenuItem>
                        <MenuItem onClick={()=>{context.setToken(''); navigate('/')}}><BiLogOut />Logout</MenuItem>
                         {/*<MenuItem><BsPieChartFill />Excahnge</MenuItem>
                        <MenuItem><BsPieChartFill />Overview</MenuItem>
                        <MenuItem> Calendar </MenuItem> */}
                    </Menu>



                </Sidebar>
                <button className="menuButton mobile d-flex align-items-center justify-content-center position-absolute" id="ss_btn"
                    onClick={() => { navigaion(); }}>
                    <HiMenuAlt1 />
                </button>
            </div>
        </>
    )
}

export default NewSidebar;