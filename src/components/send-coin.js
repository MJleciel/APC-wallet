const SendCoin = () => {
    return (
        <>
            <section class="transfer-page send-page">
                <div class="container">
                    <div class="page page--main" data-page="buy">
                        
                        <div class="page__content page__content--with-header page__content--with-bottom-nav padding_send">
                           
                            <h2 class="page__title">Send</h2>
                            <div class="send_form">
                                <form class="send_inner_form">
                                    <div class="form_flex"><label>To</label><input type="text" placeholder="Please Enter Wallet Address"/></div>
                                    <div class="form_flex"><label>Amount</label><input type="text" placeholder="Please Enter Amount"/></div>
                                </form>
                            </div>
                            <button class="btn-danger" type="submit">Okay</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SendCoin;