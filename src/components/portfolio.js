import { useContext } from "react";
import { BsFilePlusFill, BsFillEyeSlashFill } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineCopy } from "react-icons/ai";
import {useEffect, useState } from "react";
import {
  addToken,
  createWallet,
  getPrivateKey,
  getTokens,
  getWallet,
  getTokenPrice
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
    const [totalBalance,setTotalBalance]=useState()
    let context = useContext(appContext)
    const [usdtTrxPrice, setUsdtTrxPrice] = useState(null);

    const [price, setPrice] = useState(null);
      const apiKey = 'c3d80b26-5a20-4ff5-84ec-d3b33970161e';
      const apiUrl = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=TRX&convert=USDT';

    let navigate = useNavigate()
    const logout = () => {
        context.setToken("");
        localStorage.clear();
    };

    let tronWeb2 = new TronWeb({
        fullHost: "https://api.shasta.trongrid.io",
        solidityNode: "https://api.shasta.trongrid.io",
        eventServer: "https://api.shasta.trongrid.io",
        privateKey: context.key,
      });

    
    

      const fetchTokens = () => {
        getTokens(context.id).then(async (response) => {
    
    
          const token = response.data.data;
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
            token_address: 'TL1QShbruGK5XiaF7ueEfXqeWfq8rizUPA',
            user_id: token[0]?.user_id,
            created_on: new Date().toISOString()
          }
    
          tokensList = [...token, additionalToken2, additionalToken]
        //   console.log("token list in portfolio is----->", tokensList)
          setTokens(tokensList)
    
          const balanceRequests = tokensList.map(async (token) => {
            try{
              if(token.token_address==="0Tx000"){
                let bal = await getBalance(context.address);
                return bal.toString();
              }else{
                console.log("contract address is----->",token.token_address)
                const contract = await tronWeb2.contract().at(token.token_address);
      
                let balance = await contract.balanceOf(context.address).call();
        
        
                let res = balance.toString();
                console.log("balance of set tokens is----->", res);
                res = parseFloat(res);
                return res / 1000000;
              }
            }catch(e){
              console.log("error is---->",e);
            }
            
    
            
          });
          const balances = await Promise.all(balanceRequests);
    
          const tokensWithBalances = tokensList.map((token, index) => ({
            ...token,
            balance: balances[index],
          }));
        //   console.log("updated tokens result in portfolio is--->", tokensWithBalances);

          let usdtBalance=0;
          const totalValueInUSDT = tokensWithBalances.map(async (token) => {
            try{
                let sy=token.symbol
             let price=await getTokenPrice({symbol:token.symbol});
             if(price?.data?.data?.data[sy].name==token.name){
                //  console.log("price of each token is---->",price?.data?.data?.data[sy]);
                usdtBalance=(price?.data?.data?.data[sy]?.quote?.USDT.price)*(token.balance)
                return (price?.data?.data?.data[sy]?.quote?.USDT.price)
             }else{
                return 0;
             }
            //  console.log("price of each token is---->",price?.data?.data?.data[sy].name);
            //  price?.data?.data?.data[sy]?.quote?.USDT.price)
            }catch(e){
              console.log("error is---->",e);
            }
            
          });
          const balancesInUSDT = await Promise.all(totalValueInUSDT);
        //   console.log("balances in USDT----->",balancesInUSDT);
          setTotalBalance(usdtBalance);
        //   console.log("usdt balance is---->",usdtBalance,totalBalance);
          const tokensWithUSDTBalances = tokensList.map((token, index) => ({
            ...token,
            balance: balancesInUSDT[index],
          }));
        //   console.log("updated tokens result in portfolio with USDT balances--->", tokensWithUSDTBalances);

          setTokensBalance(tokensWithUSDTBalances);
    
        });
    
      }
    
      useEffect(() => {
    
        fetchTokens();
      }, [context.address]); 
      
    return (
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
                                                <div class="card-coin__price text-center"><strong>{token.token_address}</strong></div>
                                                <div class="card-coin__price"><strong>${token.balance}</strong></div>
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
                                    <div class={window.location.pathname=='/portfolio'?"col active-tab":"col"}>
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
                                    <div class={window.location.pathname=='/'?"col active-tab":"col"} onClick={() => navigate("/")}>
                                        <div class="trans_tabs">
                                            <img src={require("../assets/images/overview.png")} />
                                            <p>Overview</p>
                                        </div>
                                    </div>
                                    <div
                                        class={window.location.pathname=='/add-token'?"col active-tab":"col"}
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
    );
}

export default Portfolio;