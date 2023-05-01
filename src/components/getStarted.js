import { useNavigate } from "react-router-dom";

const GetStarted = () => {
    let navigate = useNavigate()
    return (
        <>
            <div class="d-lg-block d-md-block d-none w-100">
                <section class="klevar-extention text-white">
                    <div class="container">
                        <div class="row justify-content-center text-center">
                            <div class="col-lg-8 col-md-8 col-sm-12">
                                <div class="klevar-inner">
                                    <div class="logo-klevar"><img src={require("../assets/images/apc-logo.png")} /></div>
                                    <p>Welcome to Aarohi Partner Crypto Wallet</p>
                                    <img src={require("../assets/images/crypto-img.png")} class="crypto-img" />
                                    <button class="btn-danger" onClick={() => navigate('/login')}>Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="d-lg-none d-md-none d-block w-100">
                <section class="klevar-extention text-white mobile_login d-flex align-items-center">
                    <div class="container">
                        <div class="row justify-content-center text-center">
                            <div class="col-lg-8 col-md-8 col-sm-12">
                                <div class="klevar-inner">
                                    <div class="logo-klevar"><img src={require("../assets/images/apc-logo.png")} /></div>
                                    <p>Welcome to Aarohi Partner Crypto Wallet</p>
                                    <img src={require("../assets/images/crypto-img.png")} class="crypto-img" />
                                    <button class="btn-danger" onClick={() => navigate('/login')}>Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default GetStarted;