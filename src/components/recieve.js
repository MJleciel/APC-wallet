import { QRCodeSVG } from "qrcode.react";
import { useContext } from "react";

import { AiOutlineCopy } from "react-icons/ai"
import appContext from "../context/globalContext";
import { IoMdArrowRoundBack } from "react-icons/io"
import { useNavigate ,useLocation} from "react-router-dom";
const Recieve = () => {
    let navigate = useNavigate()
    let context = useContext(appContext)
    let loc = useLocation();
    return (
        <>
            {/* <section class="transfer-page recieve_page">
                <div class="container">
                    <div class="page page--main" data-page="buy">
                        <div class="page__content page__content--with-header page__content--with-bottom-nav padding_send">
                            <div className="BackBtn" onClick={()=>navigate(-1)}><IoMdArrowRoundBack /></div>
                            <div class="recieve_page">
                                <QRCodeSVG value={context.address} />
                                <div class="recieve_adress"><p>{context.address}</p><AiOutlineCopy /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}


            <section class="transfer-page recieve_page rr_pg">
                <div class="container">
                    <div class="page page--main" data-page="buy">
                        <div class="page__content page__content--with-header page__content--with-bottom-nav padding_send">
                            <div className="BackBtn" onClick={() => navigate(-1)}><IoMdArrowRoundBack /></div>
                            <div class="recieve_page">
                                <h5 class="text-purple">Recieve {loc.state.tokenName}</h5>
                                <p class="text-white">This is your address for deposits on Ap Wallet. You'll recieve a notification when each transaction is confirmed.</p>
                                
                                <QRCodeSVG className="scan" value={context.address} />
                               
                                <div class="text-p" style={{textAlign:"center"}}><b class="text-white" style={{textAlign:"center",width:"100%"}}>Your Address to recieve {loc.state.tokenName}</b></div>
                                <div class="recieve_adress"><p>{context.address}</p><AiOutlineCopy /></div>
                                {/* {/ <a href="#" class="share-btn"><button class="btn-danger w-100">Share <FaShareAlt/ ></button></a> /} */}
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    )
}

export default Recieve;