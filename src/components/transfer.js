const Transfer = () => {
    return (
        <>
            <section class="transfer-page">
                <div class="container">
                    <div class="page page--main" data-page="buy">
                        {/* <!-- PAGE CONTENT --> */}
                        <div class="page__content page__content--with-header page__content--with-bottom-nav">
                            {/* <!-- <div class="transfer__img">
                                <img src={require('../assets/images/transfer-page.png')}/>
                            </div> --> */}
                            <h2 class="page__title"><img src={require('../assets/images/bitcoin.png')} class="transfer_coin_img"/>Transfer BTC Coin BTC</h2>
                            <div class="fieldset">
                                <div class="form">
                                    <form id="Form" method="post" action="checkout.html">
                                        <div class="form__row">
                                            <div class="form__select">
                                                <select name="selectoptions" class="required">
                                                    <option value="" disabled selected>BTC (Bitcoin)</option>
                                                    <option value="1">ETH (Ethereum)</option>
                                                    <option value="2">SAND (Sandbox)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form__row my_form d-flex align-items-center justify-space">
                                            <input type="text" name="text" placeholder="0.05"></input>
                                            <div class="form__coin-icon"><span>BTC</span></div>
                                        </div> 

                                        <div class="form__coin-total">$ 2,465.00</div>
                                    </form>
                                </div>
                            </div>
                            <h2 class="page__title"><span class="text-danger">Wallet</span> address</h2>
                            <div class="fieldset">
                                <div class="form">
                                <form id="Form" method="post">
                                        <div class="form__row MY_FORM_ROW">
                                        <input type="text" name="text" placeholder="0x20917F3d41BA1bb921"></input>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <button class="btn-danger w-100" type="submit">Send</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Transfer;