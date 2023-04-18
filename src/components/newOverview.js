
import { AiOutlinePlus,AiOutlineCopy} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

import { addToken, createWallet, getPrivateKey, getTokens, getWallet } from "../services/services";
import { generateTronAccount, getBalance, sendTrx, fetchTokenData } from "./tronFunctions";
import Sidebar from "./sidebar";
import { icons } from "react-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import { BiCopy } from "react-icons/bi";
import appContext from "../context/globalContext";
import { tronWeb } from "./tronFunctions";
import TronWeb from "tronweb";


const NewOverView = () => {
    let context = useContext(appContext)
    const [walletAddress, setWalletAddress] = useState('');
    const [privateKey, setPrivateKey] = useState('')
    const [balance, setBalance] = useState('')
    const [tokens, setTokens] = useState([]);
    const [address, setAddress] = useState("");

    let navigate=useNavigate()

    const getWalletDetails = async () => {
        let bal = await getBalance(context.address)
        console.log("balance is---->", bal)
        setBalance(bal);

    }

    useEffect(() => {

        getWalletDetails();
    }, [context.address]);

    let tronWeb2 = new TronWeb({
        fullHost: "https://api.shasta.trongrid.io",
        solidityNode: "https://api.shasta.trongrid.io",
        eventServer: "https://api.shasta.trongrid.io",
        privateKey: context.key,
      });
    
      useEffect(() => {
        async function fetchTokens() {
          const response = await getTokens(context.id);
          console.log("response is---->", response);
          const tokens = response.data.data;
    
          const balanceRequests = tokens.map(async (token) => {
            console.log("address is---->", context.address)
            const contract = await tronWeb2.contract().at(token.token_address);
            let balance = await contract.balanceOf(context.address).call();
            console.log("balance oof token--->", token.token_address, balance.toString());
            let res = balance.toString();
            res = parseFloat(res)
            return res / 1000000;
          });
          const balances = await Promise.all(balanceRequests);
    
          const tokensWithBalances = tokens.map((token, index) => ({ ...token, balance: balances[index] }));
          console.log("updated tokens result is", tokensWithBalances);
          setTokens(tokensWithBalances);
        }
        fetchTokens();
      }, [context.address]);
    
      const handleAddressChange = (event) => {
        setAddress(event.target.value);
      };


    return (
        <>
            <section class="mai___accc">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-md-8 col-sm-12">
                            <div class="ALL_over_view_page">
                                <div class="main_account_apc">
                                    <div class="overflow_scroll">
                                    <div class="inner_main__content">
                                        <div class="ETH__node">
                                            <img src={require("../assets/images/eth.png")}/>
                                                <div class="eth_flex">
                                                    <h6>ETH nodes</h6>
                                                    <p>We're experiencing an issue with our ETH nodes being out of syc. Reset assured, Our team is working diligently to resync them ASAP!</p>
                                                </div>
                                        </div>
                                        <div class="bg_light_new">
                                        <div class="main__acc_row">
                                            <div class="icon_mains">
                                                <img src={require("../assets/images/aarohi-coin.png")}/>
                                                    <div class="apc__coin_cntr">
                                                        <p>Select Crypto</p>
                                                        <h6>BCH</h6>
                                                        <h5>=$50.90</h5>
                                                    </div>
                                            </div>
                                            <div class="acc_icons">
                                                <a href="recovery.js"><div class="grater-icon"></div></a>
                                                <span class="plus_icon"><AiOutlinePlus/></span>
                                            </div>
                                        </div>
                                        <div class="Main_inner">
                                            <div class="new-over_pp">
                                                <h3>APC - Main Account</h3>
                                                <div class="over_position"><p>{context.address}</p><AiOutlineCopy/></div>
                                            </div>
                                            <div class="">
                                                <i class="fas fa-copy"></i>
                                            </div>
                                        </div>
                                        <div class="Main_inner__btm">
                                            <div class="">
                                                <h3>0.00</h3>
                                                <p>-0.00 USB</p>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="row availabel-row">
                                            <div class="col-lg-6 col-md-6 col-6">
                                                <h5>Available</h5>
                                                <p>0.00</p>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-6 col__end">
                                                <h5>Unconfirmed</h5>
                                                <p>0.00</p>
                                            </div>
                                        </div>
                                        <div class="small_tabs row">
                                            <div class="col-lg-3 col-md-3 col-3">
                                                <div class="inner_tabs">
                                                <img src={require("../assets/images/paper-plane.png")}/>
                                                    <p>Send</p>
                                                </div>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-3">
                                                <div class="inner_tabs">
                                                    <img src={require("../assets/images/recieve.png")}/>
                                                        <p>Recieve</p>
                                                </div>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-3">
                                                <div class="inner_tabs">
                                                    <img src={require("../assets/images/charge.png")}/>
                                                        <p>Transfer</p>
                                                </div>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-3">
                                                <div class="inner_tabs">
                                                    <img src={require("../assets/images/scan.png")}/>
                                                        <p>Scan</p>
                                                </div>
                                            </div>
                                    </div>
                                    </div>
                                    <div class="over_view_tabsss">
                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Balance</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Transactions</button>
                                        </li>
                                        </ul>
                                        <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <ul>
                                                <li>
                                                    <div class="Balance-_row">
                                                        <div class="__main_cnt row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-1st">
                                                            <img src={require("../assets/images/coin.png")}/>
                                                                <h6>Bitcoin</h6>
                                                                <p>BTC</p>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 text-end">
                                                                <h6>$34,879</h6>
                                                                <p class="text-danger">+8%</p>
                                                            </div>
                                                        </div>
                                                    </div>     
                                                </li>
                                                <li>
                                                    <div class="Balance-_row">
                                                        <div class="__main_cnt row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-1st">
                                                            <img src={require("../assets/images/coin.png")}/>
                                                                <h6>Bitcoin</h6>
                                                                <p>BTC</p>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 text-end">
                                                                <h6>$34,879</h6>
                                                                <p class="text-danger">+8%</p>
                                                            </div>
                                                        </div>
                                                    </div>     
                                                </li>
                                                <li>
                                                    <div class="Balance-_row">
                                                        <div class="__main_cnt row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-1st">
                                                            <img src={require("../assets/images/coin.png")}/>
                                                                <h6>Bitcoin</h6>
                                                                <p>BTC</p>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 text-end">
                                                                <h6>$34,879</h6>
                                                                <p class="text-danger">+8%</p>
                                                            </div>
                                                        </div>
                                                    </div>     
                                                </li>
                                                <li>
                                                    <div class="Balance-_row">
                                                        <div class="__main_cnt row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-1st">
                                                            <img src={require("../assets/images/coin.png")}/>
                                                                <h6>Bitcoin</h6>
                                                                <p>BTC</p>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 text-end">
                                                                <h6>$34,879</h6>
                                                                <p class="text-danger">+8%</p>
                                                            </div>
                                                        </div>
                                                    </div>     
                                                </li>
                                            </ul>

                                        </div>
                                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <ul>
                                            <li>
                                                    <div class="Balance-_row">
                                                        <div class="__main_cnt row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-1st">
                                                            <img src={require("../assets/images/coin.png")}/>
                                                                <h6>Bitcoin</h6>
                                                                <p>BTC</p>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 text-end">
                                                                <h6>$34,879</h6>
                                                                <p class="text-danger">+8%</p>
                                                            </div>
                                                        </div>
                                                    </div>     
                                                </li>
                                                <li>
                                                    <div class="Balance-_row">
                                                        <div class="__main_cnt row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-1st">
                                                            <img src={require("../assets/images/coin.png")}/>
                                                                <h6>Bitcoin</h6>
                                                                <p>BTC</p>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 text-end">
                                                                <h6>$34,879</h6>
                                                                <p class="text-danger">+8%</p>
                                                            </div>
                                                        </div>
                                                    </div>     
                                                </li>
                                                <li>
                                                    <div class="Balance-_row">
                                                        <div class="__main_cnt row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-1st">
                                                            <img src={require("../assets/images/coin.png")}/>
                                                                <h6>Bitcoin</h6>
                                                                <p>BTC</p>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 text-end">
                                                                <h6>$34,879</h6>
                                                                <p class="text-danger">+8%</p>
                                                            </div>
                                                        </div>
                                                    </div>     
                                                </li>
                                                <li>
                                                    <div class="Balance-_row">
                                                        <div class="__main_cnt row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-1st">
                                                            <img src={require("../assets/images/coin.png")}/>
                                                                <h6>Bitcoin</h6>
                                                                <p>BTC</p>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 text-end">
                                                                <h6>$34,879</h6>
                                                                <p class="text-danger">+8%</p>
                                                            </div>
                                                        </div>
                                                    </div>     
                                                </li>
                                            </ul>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    
                                    <div class="btm_main">
                                        <div class="transations__tbs">
                                            <div class="col-lg-3 col-md-3 col-3">
                                                <div class="trans_tabs">
                                                    <img src={require("../assets/images/overview.png")}/>
                                                        <p>Overview</p>
                                                </div>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-3">
                                                <div class="trans_tabs">
                                                    <img src={require("../assets/images/transfer.png")}/>
                                                        <p>Transfer</p>
                                                </div>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-3" style={{cursor:"pointer"}} onClick={()=>navigate('/add-token')}>
                                                <div class="trans_tabs">
                                                    <img src={require("../assets/images/add-coin.png")}/>
                                                        <p>Add Token</p>
                                                </div>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-3">
                                                <div class="trans_tabs">
                                                    <img src={require("../assets/images/send.png")}/>
                                                        <p>Sign Out</p>
                                                </div>
                                            </div>
                                        </div>
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

export default NewOverView;