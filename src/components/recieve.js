import { QRCodeSVG } from "qrcode.react";
import { useContext } from "react";
import { AiOutlineCopy } from "react-icons/ai"
import appContext from "../context/globalContext";
import { IoMdArrowRoundBack } from "react-icons/io"
import { useNavigate } from "react-router-dom";
const Recieve = () => {
    let navigate=useNavigate()
    let context = useContext(appContext)
    return (
        <>
            <section class="transfer-page recieve_page">
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
            </section>
        </>
    )
}

export default Recieve;