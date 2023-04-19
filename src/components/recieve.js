import { QRCodeSVG } from "qrcode.react";
import { AiOutlineCopy } from "react-icons/ai"

const Recieve = () => {
    return (
        <>
            <section class="transfer-page recieve_page">
                <div class="container">
                    <div class="page page--main" data-page="buy">
                       
                        <div class="page__content page__content--with-header page__content--with-bottom-nav padding_send">
                            <div class="recieve_page">
                                <QRCodeSVG value="TKudDukhRnnZ4bRwQJ4eh2sxgjaPRkoosS" />
                                <div class="recieve_adress"><p>TKudDukhRnnZ4bRwQJ4eh2sxgjaPRkoosS</p><AiOutlineCopy /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Recieve;