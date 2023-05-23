import { useContext } from "react";
import { BsFilePlusFill, BsFillEyeSlashFill } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineCopy } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
    addToken,
    createWallet,
    getPrivateKey,
    getTokens,
    getWallet,
    getTokenPrice,
    getTokenImage
} from "../services/services";
import {
    generateTronAccount,
    getBalance,
    sendTrx,
    fetchTokenData,
    // decodeParams
} from "./tronFunctions";

import appContext from "../context/globalContext";

import TronWeb from "tronweb";
import { toast } from "react-toastify";

import axios from "axios";

const { useNavigate } = require("react-router-dom");

const Portfolio = () => {

    const [tokens, setTokens] = useState([]);
    const [tokensBalance, setTokensBalance] = useState([]);
    const [totalBalance, setTotalBalance] = useState()
    let context = useContext(appContext)
    const [usdtTrxPrice, setUsdtTrxPrice] = useState(null);
    const [totalNumberOfAssets,setTotalNumberOfAssets]=useState(0)

    const [price, setPrice] = useState(null);
    const apiKey = 'c3d80b26-5a20-4ff5-84ec-d3b33970161e';
    const apiUrl = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=TRX&convert=USDT';
    
    let navigate = useNavigate()
    const logout = () => {
        context.setToken("");
        localStorage.clear();
    };

    let tronWeb2 = new TronWeb({
        fullHost: process.env.REACT_APP_TRON_FULL_NODE,
        solidityNode: process.env.REACT_APP_TRON_SOLIDITY_NODE,
        eventServer: process.env.REACT_APP_TRON_EVENT_SERVER,
        privateKey: context.key,
    });




    const fetchTokens = () => {
        getTokens(context.id, context.token).then(async (response) => {


            const token = response?.data?.data;
            console.log("token length is",token?.length);
            setTotalNumberOfAssets(token?.length)
            const additionalToken = {
                id: token?.length + 1,
                name: 'TRON',
                symbol: 'TRX',
                decimals: '6',
                token_address: '0Tx000',
                user_id: token[0]?.user_id,
                created_on: new Date().toISOString()
            }
            // { 
            //   id: tokens?.length+2, 
            //   name:'Aarohi Partner', 
            //   symbol: 'APC', 
            //   decimals: '6', 
            //   token_address: 'TL1QShbruGK5XiaF7ueEfXqeWfq8rizUPA', 
            //   user_id: tokens[0]?.user_id, 
            //   created_on: new Date().toISOString() 
            // },

            let tokensList = [...token, additionalToken]

            const additionalToken2 = {
                id: token?.length + 2,
                name: 'Aarohi Partner',
                symbol: 'APC',
                decimals: '6',
                token_address: process.env.REACT_APP_APC_TOKEN_ADDRESS,
                user_id: token[0]?.user_id,
                created_on: new Date().toISOString()
            }

            tokensList = [additionalToken2, additionalToken,...token]
            //   console.log("token list in portfolio is----->", tokensList)
            setTokens(tokensList)

            const balanceRequests = tokensList.map(async (token) => {
                try {
                    if (token.token_address === "0Tx000") {
                        let bal = await getBalance(context.address);
                        // console.log("balance of trx is",bal)
                        let res=bal.toString();
                        return parseFloat(res);
                    } else {
                        console.log("contract address is----->", token.token_address)
                        const contract = await tronWeb2.contract().at(token.token_address);

                        let balance = await contract.balanceOf(context.address).call();
                        if(balance&&balance!==undefined){
                            let res = balance.toString();
                            // console.log("balance of token set tokens is----->",token.token_address, res);
                            res = parseFloat(res);
                            return res / 1000000;
                        }else{
                            return 0;
                        }


                       
                    }
                } catch (e) {
                    console.log("error is---->", e);
                    return 0;
                }



            });
            const balances = await Promise.all(balanceRequests);
            

            const tokensWithBalances = tokensList.map((token, index) => ({
                ...token,
                balance: balances[index],
            }));
              console.log("updated tokens result in portfolio is--->", tokensWithBalances);





            let usdtBalance = 0;
            const totalValueInUSDT = tokensWithBalances.map(async (token) => {
                try {
                    // console.log("name of token is-->",token)
                    let sy = token.symbol
                    // console.log("token symbol is---->",sy)
                    let price = await getTokenPrice({ symbol: token.symbol });
                    // console.log("price of token is--->",price)

                    if (price?.data?.data?.data[sy].name == token.name || price?.data?.data?.data[sy].platform.token_address == token.token_address) {
                        //  console.log("price of each token is---->",price?.data?.data?.data[sy]);
                        usdtBalance = (price?.data?.data?.data[sy]?.quote?.USDT.price) * (token.balance)
                        return (price?.data?.data?.data[sy]?.quote?.USDT.price).toFixed(5)
                    } else {
                        return 0;
                    }
                    //  console.log("price of each token is---->",price?.data?.data?.data[sy].name);
                    //  price?.data?.data?.data[sy]?.quote?.USDT.price)
                } catch (e) {
                    console.log("error is---->", e);
                }

            });
            console.log("total value in usdt is---->",totalValueInUSDT);

            const balancesInUSDT = await Promise.all(totalValueInUSDT);
              console.log("balances in USDT----->",balancesInUSDT);
            setTotalBalance(usdtBalance.toFixed(5));
            //   console.log("usdt balance is---->",usdtBalance,totalBalance);
            const tokensWithUSDTBalances = tokensWithBalances.map((token, index) => ({
                ...token,
                fiatBalance: balancesInUSDT[index],
            }));

            console.log("tokens with usdt balances is---->",tokensWithUSDTBalances)
          


            const tokensImage = tokensWithUSDTBalances.map(async (token) => {
                try {
                    if (token.token_address === "0Tx000") {

                        return "https://static.tronscan.org/production/logo/trx.png"
                    } else if (token.token_address == process.env.REACT_APP_APC_TOKEN_ADDRESS) {
                        return require("../assets/images/aarohi-coin.png");
                    } else {

                        let tokenImages = await getTokenImage({ contract_address: token.token_address })
                        // console.log("Token image result is--->",tokenImages?.data?.data?.trc20_tokens[0]?.icon_url)
                        return tokenImages?.data?.data?.trc20_tokens[0]?.icon_url ? tokenImages?.data?.data?.trc20_tokens[0]?.icon_url : "";
                    }
                } catch (e) {
                    console.log("error is---->", e);
                }



            });
            const img = await Promise.all(tokensImage);

            const tokensWithImage = tokensWithUSDTBalances.map((token, index) => ({
                ...token,
                image: img[index],
            }));
            console.log("updated tokens image result is--->", tokensWithImage)

            setTokensBalance(tokensWithImage);
            // setTokensBalance(tokensWithUSDTBalances);




        }).catch(err => {
            if (err.response.status == 401) {
                toast.error(err.response.data.message)
                navigate('/login')
            }
        })

    }

    const copyAddress = (e, address) => {
        toast.dismiss()
        navigator.clipboard.writeText(address);
        toast.success("Token address Copied");
    }

    useEffect(() => {

        fetchTokens();
    }, [context.address]);

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
                                                <p>{totalNumberOfAssets+2} assests</p>
                                            </div>
                                            <div class="">

                                            </div>
                                        </div>
                                        <div class="Main_inner__btm">
                                            <div class="balance_portfolio">
                                                <h3>${totalBalance}</h3>
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
                                                    {tokensBalance.map(token => (
                                                        <a class="card-coin" href="">
                                                            <div class="card-coin__logo"><img src={require("../assets/images/bitcoin.png")} /><span>{token.name} <b>{token.symbol}</b></span></div>
                                                            <div class="card-coin__price text-center"><strong>{token.token_address.substring(0, 5)} ... {token.token_address.substring(token.token_address.length - 5)}</strong></div>
                                                            <div class="card-coin__price"><strong>$ {token.fiatBalance ? token.fiatBalance : "0"}</strong></div>
                                                        </a>
                                                    ))}


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
                                    <p class="m-0">{totalNumberOfAssets+2} assests</p>
                                </div>
                                <hr />
                                <div class="text-start crpto_mobile_balance">
                                    <h3 class="m-0 text-center">$ {totalBalance}</h3>
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
                                        <div className="responsive_table">
                                                <table class="portfolitable">
                                            <thead>
                                                <tr>
                                                    <th class="p-0">
                                                        A/z :
                                                    </th>
                                                    <th class="p-0">
                                                        Price:
                                                    </th>
                                                    <th class="p-0">
                                                        Flat Value :
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tokensBalance.map(token => (
                                                    <tr>
                                                        <td class="p-0">
                                                            <div class="crypto_card_coin d-inline-flex align-items-center justify-content-start m-0">
                                                                <div class="card-coin__logo"><img src={token.image ? token.image : ""} alt={token.symbol} /></div>
                                                                <div class="crypto_card_coin_info">
                                                                    <h3 class="text-start d-flex align-items-center">{token.symbol}</h3>
                                                                    <h6 class="text-start">{token.name}</h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="p-0">

                                                            <h3 class="text-center m-0">$ {token.fiatBalance ? token.fiatBalance : "0"}</h3>
                                                            {/* <div class="crypto_card_coin_info" onClick={(e)=>copyAddress(e,token.token_address)}>
                                                                <h3 class="text-start m-0">{token.token_address.substring(0, 5)} ... {token.token_address.substring(token.token_address.length - 5)}</h3>
                                                            </div> */}
                                                        </td>
                                                        <td class="p-0">
                                                            <div class="crypto_card_coin_info">
                                                                <div class="card-coin__price text-end"><strong>{token.fiatBalance*token.balance}<br /><span>$</span></strong></div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                ))}
                                            </tbody>
                                        </table>
                                        </div>
                                    
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
                                            onClick={() => navigate("/history")}
                                        >
                                            <div class="trans_tabs">
                                            <img src={require("../assets/images/history.png")} />
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