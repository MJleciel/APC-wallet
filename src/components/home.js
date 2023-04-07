const Home = () => {
    return (
        <>
            <section class="klevar-extention text-white">
                <div class="container">
                    <div class="row justify-content-center text-center">
                        <div class="col-lg-8 col-md-8 col-sm-12">
                            <div class="klevar-inner">
                                <div class="logo-klevar"><img src={require('../assets/images/apc-logo.png')}/></div>
                                <p>Welcome to Aarohi Partner Crypto Wallet</p>
                                <img src={require('../assets/images/crypto-img.png')} class="crypto-img"/>
                                    <button class="btn-danger">Get Started</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;