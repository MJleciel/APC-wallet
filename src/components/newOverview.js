import { AiOutlinePlus, AiOutlineCopy } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  addToken,
  createWallet,
  getPrivateKey,
  getTokens,
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
  const [tokenImage,setTokenImage]=useState();

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
    getTokens(context.id,context.token).then(async (response) => {


      const token = response.data.data;
      const additionalToken = {
        id: token?.length + 1,
        name: 'TRX',
        symbol: 'TRX',
        decimals: '6',
        token_address: '0Tx000',
        user_id: token[0]?.user_id,
        created_on: new Date().toISOString(),
        image:"https://static.tronscan.org/production/logo/trx.png"
      }


      let tokensList = [...token, additionalToken]

      const additionalToken2 = {
        id: token?.length + 2,
        name: 'Aarohi Partner',
        symbol: 'APC',
        decimals: '6',
        token_address: 'TL1QShbruGK5XiaF7ueEfXqeWfq8rizUPA',
        user_id: token[0]?.user_id,
        created_on: new Date().toISOString(),
        image:require("../assets/images/aarohi-coin.png")
      }

      tokensList = [...token, additionalToken2, additionalToken]
      console.log("token list is----->", tokensList)
      setTokens(tokensList)

      const balanceRequests = tokensList.map(async (token) => {
        try {
          if (token.token_address === "0Tx000") {
            let bal = await getBalance(context.address);
            return bal.toString();
          } else {
            console.log("contract address is----->", token.token_address)
            const contract = await tronWeb2.contract().at(token.token_address);

            let balance = await contract.balanceOf(context.address).call();


            let res = balance.toString();
            console.log("balance of set tokens is----->", res);
            res = parseFloat(res);
            return res / 1000000;
          }
        } catch (e) {
          console.log("error is---->", e);
        }



      });
      const balances = await Promise.all(balanceRequests);

      const tokensWithBalances = tokensList.map((token, index) => ({
        ...token,
        balance: balances[index],
      }));
      console.log("updated tokens result is--->", tokensWithBalances);
      setTokensBalance(tokensWithBalances);

    }).catch(err=>{
      if(err.response.status==401){
        toast.error(err.response.data.message)
        navigate('/login')
      }
    })

  }

  useEffect(() => {

    fetchTokens();
  }, [context.address]);


  useEffect(() => {

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

 
  const handleTokenSelect = async (event) => {
  
    const tokenValue = event.target.value;
    console.log("token value in select is---->",tokenValue);

    const [tokenName, tokenAddress,tokenImage] = tokenValue.split(',');



    setSelectedTokenName(tokenName);
    setSelectedTokenAddress(tokenAddress)
    if(tokenName=="TRX"){
      setTokenImage("https://static.tronscan.org/production/logo/trx.png")
    }else if(tokenName=="APC"){
      setTokenImage(require("../assets/images/aarohi-coin.png"))
    }else{
      // const contractAddresses = ["TPYmHEhy5n8TCEfYGqW2rPxsghSfzghPDn"];
      const tokenImages = await getTokenImage({contract_address:tokenAddress});
      // console.log("tokenImage is--->",tokenImages.data.data.trc20_tokens[0].icon_url);
      setTokenImage(tokenImages?.data?.data?.trc20_tokens[0]?.icon_url?tokenImages?.data?.data?.trc20_tokens[0]?.icon_url:"")
    }
      
    

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

  const copyAddress = () => {
    let txt = context.address
    navigator.clipboard.writeText(txt);
    toast.success("Wallet Address Copied");
    
}

  return (
    <>
      <div class=" d-lg-block d-md-block d-none w-100">
        <section class="mai___accc new_over">
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
                          <div class="main__acc_row row_flex_portfolio">
                            <div class="icon_mains">
                              <img
                                src={tokenImage}
                                alt="token logo"
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
                                    value={`${token.symbol},${token.token_address}`}
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
                              <div class="over_position" >
                                <p id="usdt-address">{context.address.substring(0, 5)} ... {context.address.substring(context.address.length - 5)}</p>
                                <AiOutlineCopy onClick={copyAddress} />
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
                        <div class="small_tabs row">
                          <div class="col-lg-3 col-md-3 col-6" onClick={() => {
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
                          <div class="col-lg-3 col-md-3 col-6" onClick={() => navigate('/recieve')}>
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
                            <div
                              class="tab-pane fade show active"
                              id="home"
                              role="tabpanel"
                              aria-labelledby="home-tab"
                            >
                              {/* <table className="add-token__screen">
                            <thead>
                              <tr>
                                <th>Token Address</th>
                                <th>Name</th>
                                <th>Symbol</th>
                                <th>Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {console.log("checkin for token map is----->", tokensBalance)}
                              {tokensBalance.map(token => (
                                <tr key={token.id}>
                                  <td>{token.token_address}</td>
                                  <td>{token.name}</td>
                                  <td>{token.symbol}</td>
                                  <td>{token.balance}</td>
                                </tr>
                              
                              ))}
                            </tbody>
                          </table> */}
                          {tokensBalance.map(token => (
                            <div class="card-coin">
                              <div class="card-coin__logo"><img src={token.image?token.image:require("../assets/images/bitcoin.png")} /><span>{token.name} <b>{token.symbol}</b></span></div>
                              <div class="card-coin__price text-center"><strong>{token.token_address}</strong></div>
                              <div class="card-coin__price"><strong>{token.balance} {token.symbol}</strong></div>
                            </div>))}
                        </div>
                        <div
                          class="tab-pane fade"
                          id="profile"
                          role="tabpanel"
                          aria-labelledby="profile-tab"
                        >
                          <table class="overview__table">
                            <thead>
                              <tr>
                                <th>Tx Hash</th>
                                <th>Type</th>
                                {/* <th>From</th>
                                                            <th>To</th> */}
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {contractData.map(contract => (

                                    <tr key={contract.txID}>
                                      <td>{contract.txID}</td>
                                      <td>{contract.type}</td>
                                      {/* <td>{contract.owner_address}</td>
                                                                <td>{contract.to_address}</td> */}
                                      <td>{Number(contract.amount) / 1000000}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div class="btm_main">
                      <div class="transations__tbs">
                        <div class={window.location.pathname == '/portfolio' ? "col active-tab" : "col"} onClick={() => navigate('/portfolio')}>
                          <div class="trans_tabs">
                            <img src={require("../assets/images/portfolio.png")} />
                            <p>Portfolio</p>
                          </div>
                        </div>
                        {/* <div class="col" style={{ cursor: "pointer" }} onClick={() => {
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
                      </div> */}
                        <div className={window.location.pathname == '/' ? "col active-tab" : "col"} onClick={() => navigate("/")}>
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
          </div>
        </section>
      </div>


      <div class=" d-lg-none d-md-none d-block w-100">
        <section class="mobile_overview_header">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="overview_tabs">
                  <div class="dropdown crypto_dropdown">
                    <button class="btn btn-secondary dropdown-toggle w-100 d-flex align-items-center justify-content-between" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <div class="crypto_detail d-flex align-items-center">
                        <div class="crypto_img">
                          <img
                            src={require("../assets/images/aarohi-coin.png")}
                          />
                        </div>
                        <div class="crypto_select">
                          <p class="m-0">Select Crypto</p>
                          <h6 class="m-0">{selectedTokenName} APC</h6>
                          <h5 class="m-0">{balance}</h5>
                        </div>
                      </div>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" id="token-dropdown" onChange={handleTokenSelect}>
                      <li value="">
                        Select token
                      </li>
                      {tokens.map((token) => (
                        <li
                          key={token.address}
                          value={`${token.symbol},${token.token_address}`}
                        >
                          {token.symbol}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div class="crypto_account_detail">
                    <div class="cryp_coppy d-flex align-items-center justify-content-between">
                      <h3>{selectedTokenName} - Main Account</h3>
                      <i class="fas fa-copy"></i>
                      <AiOutlineCopy onClick={copyAddress} />
                    </div>
                    <div class="crypto_overvie">
                      <p id="usdt-address" class="text-start">{context.address.substring(0, 5)} ... {context.address.substring(context.address.length - 5)}</p>

                    </div>
                    <hr />
                    <div class="text-start crpto_mobile_balance">
                      <h3 class="m-0 text-start">{balance}</h3>
                    </div>
                  </div>
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
                <ul class="reciver_send_outer d-flex align-items-center">
                  <li>
                    <button class="btn btn-primary" onClick={() => {
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
                      <img
                        src={require("../assets/images/paper-plane.png")}
                      />
                      <p class="m-0">Send</p>
                    </button>
                  </li>
                  <li>
                    <button class="btn btn-primary" onClick={() => navigate('/recieve')}>
                      <img
                        src={require("../assets/images/recieve.png")}
                      />
                      <p class="m-0">Recieve</p>
                    </button>
                  </li>
                  <li>
                    <button class="btn btn-primary" onClick={() => navigate('/recieve')}>
                      <img
                        src={require("../assets/images/recieve.png")}
                      />
                      <p class="m-0">Swap</p>
                    </button>
                  </li>
                </ul>

                <div class="mt-4 pt-1 crypto_tabs">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="tokens-tab" data-bs-toggle="tab" data-bs-target="#tokens" type="button" role="tab" aria-controls="tokens" aria-selected="true">Tokens</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="transection-tab" data-bs-toggle="tab" data-bs-target="#transection" type="button" role="tab" aria-controls="transection" aria-selected="false">Transection</button>
                    </li>
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="tokens" role="tabpanel" aria-labelledby="tokens-tab">
                      {tokensBalance.map(token => (
                        <div class="crypto_card_coin d-flex align-items-center justify-content-between">
                          <div class="card-coin__logo"><img src={require("../assets/images/bitcoin.png")} /></div>
                          <div class="crypto_card_coin_info">
                            <h3 class="text-start d-flex align-items-center">{token.name} <span class="token_symbol">{token.symbol}</span></h3>
                            <h6 class="text-start">{token.token_address}</h6>
                          </div>
                          <div class="card-coin__price text-end"><strong>{token.balance}<br /><span>{token.symbol}</span></strong></div>
                        </div>))}
                    </div>
                    <div class="tab-pane fade" id="transection" role="tabpanel" aria-labelledby="transection-tab">
                      <table class="overview__table mobile_table mt-4 pt-1">
                        <thead>
                          <tr>
                            <th>Tx Hash</th>
                            <th>Type</th>
                            {/* <th>From</th>
                                                            <th>To</th> */}
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contractData.map(contract => (

                            <tr key={contract.txID}>
                              <td>{contract.txID}</td>
                              <td>{contract.type}</td>
                              {/* <td>{contract.owner_address}</td>
                                                                <td>{contract.to_address}</td> */}
                              <td>{Number(contract.amount) / 1000000}</td>
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
};

export default NewOverView;
