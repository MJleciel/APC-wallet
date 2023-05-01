import { useContext } from "react";
import appContext from "../context/globalContext";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFilePlusFill, BsFillEyeSlashFill } from "react-icons/bs";

const { useNavigate } = require("react-router-dom");

const Portfolio = () => {
    let context = useContext(appContext)
    let navigate = useNavigate()
    const logout = () => {
        context.setToken("");
        localStorage.clear();
    };
    return (
        <>
            <div class="d-lg-block d-md-block d-none w-100">
                <section class="mai___accc Portfolio_page">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8 col-md-8 col-sm-12">
                                <div class="main_account_apc">
                                    <div class="inner_main__content">
                                        <div class="main__acc_row">
                                            <div class="icon_mains">
                                                <div class="portfolio_hd">
                                                    <h5>Portfolio</h5>
                                                </div>
                                            </div>
                                            {/* <div class="acc_icons react_plus">
                                        <AiOutlinePlus />
                                        <img src={require('../assets/images/overview.png')} />
                                    </div> */}
                                        </div>
                                        <div class="Main_inner">
                                            <div class="portfolio_eye">
                                                <h3>Total Balance <BsFillEyeSlashFill /></h3>
                                                <p>23 assests</p>
                                            </div>
                                            <div class="">

                                            </div>
                                        </div>
                                        <div class="Main_inner__btm">
                                            <div class="balance_portfolio">
                                                <h3>$ 0.00</h3>
                                            </div>
                                        </div>
                                        {/* <div class="row portfolio_row align-items-center">
                                    <div class="col-lg-6 col-md-6 col-6">
                                        <h5 class="first">Search Tokens</h5>

                                    </div>
                                    <div class="col-lg-6 col-md-6 col-6 col__end">
                                        <h5><BsFilePlusFill />Tokens</h5>
                                    </div>
                                </div> */}
                                        <div class="over_view_tabsss tabs_All">
                                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                                <li class="nav-item" role="presentation">
                                                    <button
                                                        class="nav-link active"
                                                        id="home-tab"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#home"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="home"
                                                        aria-selected="true"
                                                    >
                                                        Tokens
                                                    </button>
                                                </li>
                                                {/* <li class="nav-item" role="presentation">
                                            <button
                                                class="nav-link"
                                                id="profile-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#profile"
                                                type="button"
                                                role="tab"
                                                aria-controls="profile"
                                                aria-selected="false"
                                            >
                                                NFTs
                                            </button>
                                        </li> */}
                                            </ul>
                                            <div class="tab-content" id="myTabContent">
                                                <div class="tab-pane fade show active cards cards--11" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                    <div class="card-coins_porfolio">
                                                        <div class="one one_tb"><h6> <img src={require("../assets/images/bitcoin.png")} /> A/z :</h6></div>
                                                        <div class="one"><h6> Address:</h6></div>
                                                        <div class="one"><h6>Price :</h6></div>
                                                    </div>
                                                    <a class="card-coin" href="">
                                                        <div class="card-coin__logo"><img src={require("../assets/images/bitcoin.png")} /><span>Bitcoin <b>BTC</b></span></div>
                                                        <div class="card-coin__price text-center"><strong>$41,827.71</strong><span class="plus">+10%</span></div>
                                                        <div class="card-coin__price"><strong>$41,827.71</strong><span class="plus">+10%</span></div>
                                                    </a>

                                                </div>
                                                <div
                                                    class="tab-pane fade"
                                                    id="profile"
                                                    role="tabpanel"
                                                    aria-labelledby="profile-tab"
                                                >
                                                    <a class="card-coin" href="">
                                                        <div class="card-coin__logo"><img src={require("../assets/images/bitcoin.png")} /><span>Bitcoin <b>BTC</b></span></div>
                                                        <div class="card-coin__price text-center"><strong>$41,827.71</strong><span class="plus">+10%</span></div>
                                                        <div class="card-coin__price"><strong>$41,827.71</strong><span class="plus">+10%</span></div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="btm_main">
                                        <div class="transations__tbs">
                                            <div class={window.location.pathname == '/portfolio' ? "col active-tab" : "col"}>
                                                <div class="trans_tabs">
                                                    <img src={require("../assets/images/portfolio.png")} />
                                                    <p>Portfolio</p>
                                                </div>
                                            </div>
                                            {/* <div class="col" style={{ cursor: "pointer" }} onClick={() => {
                                        // if (selectedTokenName == undefined || selectedTokenName == "") {
                                        //   toast.info("please select a token")
                                        //   return;
                                        // }
                                        // let data = {
                                        //   address: selectedTokenAddress ? selectedTokenAddress : "0Tx000",
                                        //   balance: balance,
                                        //   tokenName: selectedTokenName ? selectedTokenName : "TRX"
                                        // }
                                        navigate('/send', { state: '' })
                                    }
                                    }>

                                        <div class="trans_tabs">
                                            <img src={require("../assets/images/transfer.png")} />
                                            <p>Transfer</p>
                                        </div>
                                    </div> */}
                                            <div class={window.location.pathname == '/' ? "col active-tab" : "col"} onClick={() => navigate("/")}>
                                                <div class="trans_tabs">
                                                    <img src={require("../assets/images/overview.png")} />
                                                    <p>Overview</p>
                                                </div>
                                            </div>
                                            <div
                                                class={window.location.pathname == '/add-token' ? "col active-tab" : "col"}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => navigate("/add-token")}
                                            >
                                                <div class="trans_tabs">
                                                    <img src={require("../assets/images/add-coin.png")} />
                                                    <p>Add Token</p>
                                                </div>
                                            </div>
                                            <div
                                                class="col"
                                                style={{ cursor: "pointer" }}
                                                onClick={logout}
                                            >
                                                <div class="trans_tabs">
                                                    <img src={require("../assets/images/send.png")} />
                                                    <p>Sign Out</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div class="d-lg-none d-md-none d-block w-100">
                <section class="mobile_overview_header crypto_portfolio">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="portfolio_mobile">
                                    <h4>Portfolio</h4>
                                </div>
                                <div class="porfolio_balance">
                                    <h3>Total Balance <BsFillEyeSlashFill /></h3>
                                    <p class="m-0">23 assests</p>
                                </div>
                                <hr />
                                <div class="text-start crpto_mobile_balance">
                                    <h3 class="m-0 text-center">$ 0.00</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <svg class="account-info__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,0 Q50,201 100,0 L100,100 0,100 Z" fill="#000448"></path>
                    </svg>
                </section>
                <section class="transection_history">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">

                                <div class="mt-4 pt-1 crypto_tabs">
                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="tokens-tab" data-bs-toggle="tab" data-bs-target="#tokens" type="button" role="tab" aria-controls="tokens" aria-selected="true">Tokens</button>
                                        </li>
                                    </ul>
                                    <div class="tab-pane fade show active" id="tokens" role="tabpanel" aria-labelledby="tokens-tab">
                                        <table class="portfolitable">
                                            <thead>
                                                <tr>
                                                    <th class="p-0">
                                                        A/z :
                                                    </th>
                                                    <th class="p-0">
                                                        Address:
                                                    </th>
                                                    <th class="p-0">
                                                        Price :
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="p-0">
                                                        <div class="crypto_card_coin d-flex align-items-center justify-content-start m-0">
                                                            <div class="card-coin__logo"><img src={require("../assets/images/bitcoin.png")} /></div>
                                                            <div class="crypto_card_coin_info">
                                                                <h3 class="text-start m-0">Bitcoin<br/><span class="token_symbol m-0">BTC</span></h3>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="p-0">
                                                        <div class="crypto_card_coin_info">
                                                            <h3 class="text-start m-0">$41,827.71<br/><span class="token_symbol m-0">+10%</span></h3>
                                                        </div>
                                                    </td>
                                                    <td class="p-0">
                                                        <div class="crypto_card_coin_info">
                                                            <h3 class="text-start m-0">$41,827.71<br/><span class="token_symbol m-0">+10%</span></h3>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="p-0">
                                                        <div class="crypto_card_coin d-flex align-items-center justify-content-start m-0">
                                                            <div class="card-coin__logo"><img src={require("../assets/images/bitcoin.png")} /></div>
                                                            <div class="crypto_card_coin_info">
                                                                <h3 class="text-start m-0">Bitcoin<br/><span class="token_symbol m-0">BTC</span></h3>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="p-0">
                                                        <div class="crypto_card_coin_info">
                                                            <h3 class="text-start m-0">$41,827.71<br/><span class="token_symbol m-0">+10%</span></h3>
                                                        </div>
                                                    </td>
                                                    <td class="p-0">
                                                        <div class="crypto_card_coin_info">
                                                            <h3 class="text-start m-0">$41,827.71<br/><span class="token_symbol m-0">+10%</span></h3>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="fixed_navi">
                    <div class="container p-0">
                        <div class="row m-0">
                            <div class="col-12 p-0">
                                <ul class="mobile_nav">
                                    <li>
                                        <div class={window.location.pathname == '/portfolio' ? "col active-tab" : "col"} onClick={() => navigate('/portfolio')}>
                                            <div class="trans_tabs">
                                                <img src={require("../assets/images/portfolio.png")} />
                                                <p>Portfolio</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            class={window.location.pathname == '/add-token' ? "col active-tab" : "col"}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => navigate("/add-token")}
                                        >
                                            <div class="trans_tabs">
                                                <img src={require("../assets/images/add-coin.png")} />
                                                <p>Add Token</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={window.location.pathname == '/' ? "col active-tab" : "col"} onClick={() => navigate("/")}>
                                            <div class="trans_tabs">
                                                <img src={require("../assets/images/overview.png")} />
                                                <p>Overview</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            class={window.location.pathname == '/add-token' ? "col active-tab" : "col"}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => navigate("/add-token")}
                                        >
                                            <div class="trans_tabs">
                                                <img src={require("../assets/images/add-coin.png")} />
                                                <p>history</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            class="col"
                                            style={{ cursor: "pointer" }}
                                            onClick={logout}
                                        >
                                            <div class="trans_tabs">
                                                <img src={require("../assets/images/send.png")} />
                                                <p>Sign Out</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Portfolio;