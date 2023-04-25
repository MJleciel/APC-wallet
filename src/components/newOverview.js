// import { useContext } from "react";
import { AiOutlinePlus, AiOutlineCopy } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

import {
  addToken,
  createWallet,
  getPrivateKey,
  getTokens,
  getWallet,
} from "../services/services";
import {
  generateTronAccount,
  getBalance,
  sendTrx,
  fetchTokenData,
  // decodeParams
} from "./tronFunctions";
import Sidebar from "./sidebar";
import { icons } from "react-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { BiCopy } from "react-icons/bi";
import appContext from "../context/globalContext";
import { tronWeb } from "./tronFunctions";
import TronWeb from "tronweb";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const NewOverView = () => {
  let context = useContext(appContext);
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [balance, setBalance] = useState("0");
  const [tokens, setTokens] = useState([]);
  const [tokensBalance, setTokensBalance] = useState([]);
  const [address, setAddress] = useState("");
  const [selectedTokenName, setSelectedTokenName] = useState("");
  const [selectedTokenAddress, setSelectedTokenAddress] = useState("");
  const [contractData, setContractData] = useState([]);

  let navigate = useNavigate();

  const getWalletDetails = async () => {
    let bal = await getBalance(context.address);
    console.log("balance is---->", bal);
    setBalance(bal);
  };
  const logout = () => {
    context.setToken("");
    localStorage.clear();
  };

  useEffect(() => {
    // getWalletDetails();
  }, [context.address]);

  let tronWeb2 = new TronWeb({
    fullHost: "https://api.shasta.trongrid.io",
    solidityNode: "https://api.shasta.trongrid.io",
    eventServer: "https://api.shasta.trongrid.io",
    privateKey: context.key,
  });

  const fetchTokens = () => {
    getTokens(context.id).then(async (response) => {


      const tokens = response.data.data;
      const additionalToken = {
        id: tokens?.length + 1,
        name: 'TRX',
        symbol: 'TRX',
        decimals: '6',
        token_address: '0Tx000',
        user_id: tokens[0]?.user_id,
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

      let tokensList = [...tokens, additionalToken]

      const additionalToken2 = {
        id: tokens?.length + 2,
        name: 'Aarohi Partner',
        symbol: 'APC',
        decimals: '6',
        token_address: 'TL1QShbruGK5XiaF7ueEfXqeWfq8rizUPA',
        user_id: tokens[0]?.user_id,
        created_on: new Date().toISOString()
      }

      tokensList = [...tokens, additionalToken2, additionalToken]
      console.log("token list is----->", tokensList)
      setTokens(tokensList)

      const balanceRequests = tokens.map(async (token) => {

        const contract = await tronWeb2.contract().at(token.token_address);

        let balance = await contract.balanceOf(context.address).call();


        let res = balance.toString();
        console.log("balance of set tokens is----->", res);
        res = parseFloat(res);
        return res / 1000000;
      });
      const balances = await Promise.all(balanceRequests);

      const tokensWithBalances = tokens.map((token, index) => ({
        ...token,
        balance: balances[index],
      }));
      console.log("updated tokens result is", tokensWithBalances);name
      setTokensBalance(tokensWithBalances);

    });

  }

  useEffect(() => {

    fetchTokens();
  }, [context.address]);


  useEffect(() => {

    const getWalletDetails = async () => {


      let bal = await getBalance(context.address);
      console.log("balance is---->", bal);

      setBalance(bal);

    }


    // getWalletDetails();
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.shasta.trongrid.io/v1/accounts/${context.address}/transactions`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log("transaction histroy is", response)
        const transactions = response.data;
        console.log("transaction data is--->", transactions);
        const contractTransactions = transactions.filter(txn => {
          const { raw_data } = txn;
          return raw_data.contract && raw_data.contract.length > 0;
        });
        // console.log("contract transaction is--->", contractTransactions);
        const formattedData = contractTransactions.map(txn => {
          const { txID, raw_data } = txn;
          const contract = raw_data.contract[0];
          // console.log("contract parameter is------>>>",contract);
          let type = contract?.type
          // if(type=="TriggerSmartContract"){
          //   return;
          // }
          // console.log("type is----->",type);

          // console.log("value is------->",contract?.parameter)
          const amount = contract?.parameter?.value?.amount;
          // console.log("value is------->",amount)
          // const { owner_address, to_address, amount } = value;
          return { txID, type, amount };
        });
        // console.log("formatedd data is--->", formattedData);

        setContractData(formattedData);
      })
      .catch((err) => console.error(err));
  }, [context.address]);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleTokenSelect = async (event) => {

    const tokenValue = event.target.value;

    const [tokenName, tokenAddress] = tokenValue.split(',');



    setSelectedTokenName(tokenName);
    setSelectedTokenAddress(tokenAddress)
    console.log("selected token name and address is---->", tokenName, tokenAddress);

    try {
      if (tokenAddress !== "0Tx000") {
        const contract = await tronWeb2.contract().at(tokenAddress);

        let balance = await contract.balanceOf(context.address).call();

        let res = balance.toString();
        res = parseFloat(res);

        setBalance(res / 1000000);
      } else {
        let bal = await getBalance(context.address);

        setBalance(bal);
      }

    } catch (e) {
      console.log("error is---->", e);
      setBalance(0)
    }

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
                        <img src={require("../assets/images/eth.png")} />
                        <div class="eth_flex">
                          <h6>ETH nodes</h6>
                          <p>
                            We're experiencing an issue with our ETH nodes being
                            out of syc. Reset assured, Our team is working
                            diligently to resync them ASAP!
                          </p>
                        </div>
                      </div>
                      <div class="bg_light_new">
                        <div class="main__acc_row">
                          <div class="icon_mains">
                            <img
                              src={require("../assets/images/aarohi-coin.png")}
                            />
                            <div class="apc__coin_cntr">
                              <p>Select Crypto</p>
                              <h6>{selectedTokenName}</h6>
                              <h5>{balance}</h5>
                            </div>
                          </div>
                          <div class="acc_icons">
                            <select
                              id="token-dropdown"
                              onChange={handleTokenSelect}
                            >
                              <option value="">
                                Select token
                              </option>
                              {tokens.map((token) => (
                                <option
                                  key={token.address}
                                  value={`${token.name},${token.token_address}`}
                                >
                                  {token.symbol}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div class="Main_inner">
                          <div class="new-over_pp">
                            <h3>{selectedTokenName} - Main Account</h3>
                            <div class="over_position">
                              <p>{context.address}</p>
                              <AiOutlineCopy />
                            </div>
                          </div>
                          <div class="">
                            <i class="fas fa-copy"></i>
                          </div>
                        </div>
                        <div class="Main_inner__btm">
                          <div class="">
                            <h3>{balance}</h3>
                            <p>{selectedTokenName}</p>
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
                      <div class="small_tabs row ">
                        <div class="col-lg-3 col-md-3 col-3" onClick={() => {
                          console.log("selected token name and address is--->", selectedTokenName, selectedTokenAddress)
                          if (selectedTokenName == undefined || selectedTokenName == "") {
                            toast.info("please select a token")
                            return;
                          }
                          let data = {
                            address: selectedTokenAddress ? selectedTokenAddress : "0Tx000",
                            balance: balance,
                            tokenName: selectedTokenName ? selectedTokenName : "TRX"
                          }
                          navigate('/send', { state: data })

                        }
                        }
                        >
                          <div class="inner_tabs" >
                            <img
                              src={require("../assets/images/paper-plane.png")}
                            />
                            <p>Send</p>
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-3" onClick={() => navigate('/recieve')}>
                          <div class="inner_tabs">
                            <img
                              src={require("../assets/images/recieve.png")}
                            />
                            <p>Recieve</p>
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-3 d-none">
                          <div class="inner_tabs">
                            <img src={require("../assets/images/charge.png")} />
                            <p>Transfer</p>
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-3 d-none">
                          <div class="inner_tabs">
                            <img src={require("../assets/images/scan.png")} />
                            <p>Scan</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="over_view_tabsss tabs_all">
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
                        <li class="nav-item" role="presentation">
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
                            Transactions
                          </button>
                        </li>
                      </ul>
                      <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active cards cards--11" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <a class="card-coin" href="details.html">
                          <div class="card-coin__logo"><img src={require("../assets/images/bitcoin.png")} /><span>Bitcoin <b>BTC</b></span></div>
                          <div class="card-coin__chart"><canvas class="chartup" width="50" height="30"></canvas></div>
                          <div class="card-coin__price"><strong>$41,827.71</strong><span class="plus">+10%</span></div>
					              </a>
                        <a class="card-coin" href="details.html">
                          <div class="card-coin__logo"><img src={require("../assets/images/bitcoin.png")} /><span>Bitcoin <b>BTC</b></span></div>
                          <div class="card-coin__chart"><canvas class="chartup" width="50" height="30"></canvas></div>
                          <div class="card-coin__price"><strong>$41,827.71</strong><span class="plus">+10%</span></div>
					              </a>
                        <a class="card-coin" href="details.html">
                          <div class="card-coin__logo"><img src={require("../assets/images/bitcoin.png")} /><span>Bitcoin <b>BTC</b></span></div>
                          <div class="card-coin__chart"><canvas class="chartup" width="50" height="30"></canvas></div>
                          <div class="card-coin__price"><strong>$41,827.71</strong><span class="plus">+10%</span></div>
					              </a>
                        </div>
                        <div
                          class="tab-pane fade"
                          id="profile"
                          role="tabpanel"
                          aria-labelledby="profile-tab">
                            <a class="card-coin" href="details.html">
                          <div class="card-coin__logo"><img src={require("../assets/images/bitcoin.png")} /><span>Bitcoin <b>BTC</b></span></div>
                          <div class="card-coin__chart"><canvas class="chartup" width="50" height="30"></canvas></div>
                          <div class="card-coin__price"><strong>$41,827.71</strong><span class="plus">+10%</span></div>
					              </a>
                        <a class="card-coin" href="details.html">
                          <div class="card-coin__logo"><img src={require("../assets/images/bitcoin.png")} /><span>Bitcoin <b>BTC</b></span></div>
                          <div class="card-coin__chart"><canvas class="chartup" width="50" height="30"></canvas></div>
                          <div class="card-coin__price"><strong>$41,827.71</strong><span class="plus">+10%</span></div>
					              </a>
                        <a class="card-coin" href="details.html">
                          <div class="card-coin__logo"><img src={require("../assets/images/bitcoin.png")} /><span>Bitcoin <b>BTC</b></span></div>
                          <div class="card-coin__chart"><canvas class="chartup" width="50" height="30"></canvas></div>
                          <div class="card-coin__price"><strong>$41,827.71</strong><span class="plus">+10%</span></div>
					              </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="btm_main">
                    <div class="transations__tbs">
                      <div class="col" onClick={()=>navigate('/portfolio')}>
                        <div class="trans_tabs">
                          <img src={require("../assets/images/portfolio.png")} />
                          <p>Portfolio</p>
                        </div>
                      </div>
                      <div class="col" style={{ cursor: "pointer" }} onClick={() => {
                        if (selectedTokenName == undefined || selectedTokenName == "") {
                          toast.info("please select a token")
                          return;
                        }
                        let data = {
                          address: selectedTokenAddress ? selectedTokenAddress : "0Tx000",
                          balance: balance,
                          tokenName: selectedTokenName ? selectedTokenName : "TRX"
                        }
                        navigate('/send', { state: data })
                      }
                      }>

                        <div class="trans_tabs">
                          <img src={require("../assets/images/transfer.png")} />
                          <p>Transfer</p>
                        </div>
                      </div> 
                      <div class="col  active-tab">
                        <div class="trans_tabs">
                          <img src={require("../assets/images/overview.png")} />
                          <p>Overview</p>
                        </div>
                      </div>
                      <div
                        class="col"
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
        </div>
      </section>
    </>
  );
};

export default NewOverView;
