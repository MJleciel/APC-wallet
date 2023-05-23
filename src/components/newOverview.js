import { AiOutlinePlus, AiOutlineCopy } from "react-icons/ai";

import bs58 from "bs58";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  addToken,
  createWallet,
  getPrivateKey,
  getTokens,
  getTokenImage,
  getTokenPrice,
  removeUserToken,
  getTokenData,
} from "../services/services";
import {
  generateTronAccount,
  getBalance,
  sendTrx,
  fetchTokenData,
  tronWeb,
  // decodeParams
} from "./tronFunctions";

import appContext from "../context/globalContext";
import TronWeb from "tronweb";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";

const NewOverView = () => {
  let context = useContext(appContext);
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [balance, setBalance] = useState("0");
  const [tokens, setTokens] = useState([]);
  const [tokensBalance, setTokensBalance] = useState([]);
  const [address, setAddress] = useState("");
  const [selectedTokenName, setSelectedTokenName] = useState("APC");
  const [selectedTokenAddress, setSelectedTokenAddress] = useState(
    process.env.REACT_APP_APC_TOKEN_ADDRESS
  );
  const [contractData, setContractData] = useState([]);
  const [tokenImage, setTokenImage] = useState(
    require("../assets/images/aarohi-coin.png")
  );
  const [selectedTokenPrice, setSelectedTokenPrice] = useState(0);
  const [totalNumberOfAssets, setTotalNumberOfAssets] = useState(0);
  const [totalBalance, setTotalBalance] = useState();
  const [tokenData, setTokenData] = useState();
  var tokenHistory;

  let navigate = useNavigate();
  let tronWeb2 = new TronWeb({
    fullHost: process.env.REACT_APP_TRON_FULL_NODE,
    solidityNode: process.env.REACT_APP_TRON_SOLIDITY_NODE,
    eventServer: process.env.REACT_APP_TRON_EVENT_SERVER,
    privateKey: context.key,
  });

  const getWalletDetails = async () => {
    const contract = await tronWeb2.contract().at(selectedTokenAddress);

    let balance = await contract.balanceOf(context.address).call();
    let res = balance.toString();
    res = parseFloat(res);

    setBalance(res / 1000000);
  };
  const logout = () => {
    context.setToken("");
    localStorage.clear();
  };

  useEffect(() => {
    console.log(
      process.env.REACT_APP_APC_TOKEN,
      process.env.REACT_APP_TRON_EVENT_SERVER
    );
    getWalletDetails();
  }, [context.address]);

  const fetchTokens = () => {
    getTokens(context.id, context.token)
      .then(async (response) => {
        const token = response?.data?.data;

        setTotalNumberOfAssets(token?.length);
        const additionalToken = {
          id: token?.length + 1,
          name: "TRON",
          symbol: "TRX",
          decimals: "6",
          token_address: "0Tx000",
          user_id: token[0]?.user_id,
          created_on: new Date().toISOString(),
        };

        let tokensList = [...token, additionalToken];

        const additionalToken2 = {
          id: token?.length + 2,
          name: "Aarohi Partner",
          symbol: "APC",
          decimals: "6",
          token_address: process.env.REACT_APP_APC_TOKEN_ADDRESS,
          user_id: token[0]?.user_id,
          created_on: new Date().toISOString(),
        };

        tokensList = [additionalToken2, additionalToken, ...token];
        //   console.log("token list in portfolio is----->", tokensList)
        setTokens(tokensList);

        const balanceRequests = tokensList.map(async (token) => {
          try {
            if (token.token_address === "0Tx000") {
              let bal = await getBalance(context.address);

              let res = bal.toString();
              return parseFloat(res);
            } else {
              const contract = await tronWeb2
                .contract()
                .at(token.token_address);

              let balance = await contract.balanceOf(context.address).call();
              if (balance && balance !== undefined) {
                let res = balance.toString();
                // console.log("balance of token set tokens is----->",token.token_address, res);
                res = parseFloat(res);
                return res / 1000000;
              } else {
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

        let usdtBalance = 0;
        const totalValueInUSDT = tokensWithBalances.map(async (token) => {
          try {
            let sy = token.symbol;

            let price = await getTokenPrice({ symbol: token.symbol });

            if (
              price?.data?.data?.data[sy]?.name == token.name ||
              price?.data?.data?.data[sy]?.platform?.token_address ==
                token.token_address
            ) {
              usdtBalance =
                price?.data?.data?.data[sy]?.quote?.USDT.price * token.balance;
              return (price?.data?.data?.data[sy]?.quote?.USDT.price).toFixed(
                2
              );
            } else if (token.symbol == "USDT") {
              return 1;
            } else {
              return 0;
            }
            //  console.log("price of each token is---->",price?.data?.data?.data[sy].name);
            //  price?.data?.data?.data[sy]?.quote?.USDT.price)
          } catch (e) {
            console.log("error is---->", e);
          }
        });
        // console.log("total value in usdt is---->",totalValueInUSDT);

        const balancesInUSDT = await Promise.all(totalValueInUSDT);

        setTotalBalance(usdtBalance.toFixed(2));
        //   console.log("usdt balance is---->",usdtBalance,totalBalance);
        const tokensWithUSDTBalances = tokensWithBalances.map(
          (token, index) => ({
            ...token,
            fiatBalance: balancesInUSDT[index],
          })
        );

        const tokensImage = tokensWithUSDTBalances.map(async (token) => {
          try {
            if (token.token_address === "0Tx000") {
              return "https://static.tronscan.org/production/logo/trx.png";
            } else if (
              token.token_address == process.env.REACT_APP_APC_TOKEN_ADDRESS
            ) {
              return require("../assets/images/aarohi-coin.png");
            } else {
              let tokenImages = await getTokenImage({
                contract_address: token.token_address,
              });
              // console.log("Token image result is--->",tokenImages?.data?.data?.trc20_tokens[0]?.icon_url)
              return tokenImages?.data?.data?.trc20_tokens[0]?.icon_url
                ? tokenImages?.data?.data?.trc20_tokens[0]?.icon_url
                : "";
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

        setTokensBalance(tokensWithImage);
        // setTokensBalance(tokensWithUSDTBalances);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          toast.error(err.response.data.message);
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    fetchTokens();
  }, [context.address]);

  useEffect(() => {
    fetch(
      `https://api.trongrid.io/v1/accounts/${context.address}/transactions/trc20?limit=200&contractAddress=${selectedTokenAddress}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("response is---->", response?.data);
        tokenHistory = response?.data;
        if (response) {
          setTokenData(response?.data);
        }
      })
      .catch((err) => console.error(err));
  }, [context.address,selectedTokenAddress]);

  useEffect(() => {
    const options = { method: "GET", headers: { accept: "application/json" } };
    try {
      fetch(
        `${process.env.REACT_APP_TRON_FULL_NODE}/v1/accounts/${context.address}/transactions`,
        options
      )
        .then((response) => response.json())
        .then(async (response) => {
          const transactions = response.data;

          console.log("transaction is----->", transactions);

          const contractTransactions = transactions?.filter((txn) => {
            const { raw_data, block_timestamp } = txn;

            return raw_data?.contract && raw_data?.contract.length > 0;
          });
          // console.log("contract transaction is---->",contractTransactions);

          const formattedData = contractTransactions.map((txn) => {
            const { txID, raw_data, block_timestamp } = txn;
            const contract = raw_data.contract[0];
            let ownerAdd =
              raw_data?.contract[0]?.parameter?.value?.owner_address;
            let toAdd = raw_data?.contract[0]?.parameter?.value?.to_address;

            let type = contract?.type;

            let ownerAddress = tronWeb2.address.fromHex(ownerAdd);
            let toAddress = tronWeb2.address.fromHex(toAdd);

            const amount = contract?.parameter?.value?.amount;

            return {
              txID,
              type,
              amount,
              ownerAddress,
              toAddress,
              block_timestamp,
            };
          });
          console.log("formatedd data is--->", formattedData);
          let newArray = [...formattedData, ...tokenHistory];
          newArray.sort((a, b) => b?.block_timestamp - a?.block_timestamp);
          console.log("new array is------>", newArray);

          setContractData(newArray);
        })
        .catch((err) => console.error("error in history is", err));
    } catch (e) {
      console.log("error in try hisory is--->", e);
    }
  }, [context.address,selectedTokenAddress]);

  const handleTokenSelect = async (event) => {
    const tokenValue = event.target.value;

    const [tokenSymbol, tokenAddress, tokenName] = tokenValue.split(",");

    let price = await getTokenPrice({ symbol: tokenSymbol });

    if (
      price?.data?.data?.data[tokenSymbol]?.name == tokenName ||
      price?.data?.data?.data[tokenSymbol]?.platform?.token_address ==
        tokenAddress
    ) {
      setSelectedTokenPrice(
        price?.data?.data?.data[tokenSymbol]?.quote?.USDT?.price
      );
    } else if (tokenSymbol == "USDT") {
      setSelectedTokenPrice(1);
    }

    setSelectedTokenName(tokenSymbol);
    setSelectedTokenAddress(tokenAddress);
    if (tokenSymbol == "TRX") {
      setTokenImage("https://static.tronscan.org/production/logo/trx.png");
    } else if (tokenSymbol == "APC") {
      setTokenImage(require("../assets/images/aarohi-coin.png"));
    } else {
      const tokenImages = await getTokenImage({
        contract_address: tokenAddress,
      });
      console.log("token image single is is--->", tokenImages);
      setTokenImage(
        tokenImages?.data?.data?.trc20_tokens[0]?.icon_url
          ? tokenImages?.data?.data?.trc20_tokens[0]?.icon_url
          : ""
      );
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
      setBalance(0);
    }
  };

  const copyAddress = () => {
    let txt = context.address;
    navigator.clipboard.writeText(txt);
    toast.success("Wallet Address Copied");
  };

  const copyTxID = (event) => {
    const tdValue = event.target.textContent;

    const textarea = document.createElement("textarea");
    textarea.value = tdValue;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");
    toast.success("Transaction ID Copied");

    document.body.removeChild(textarea);
  };

  const handleDeletion = (e, address) => {
    // alert(address)
    Swal.fire({
      customClass: "pop-delete",
      title: "Are you sure you want to remove this token?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Remove",
      confirmButtonColor: "red",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        removeUserToken(context.token, {
          user_id: context.id,
          token_address: address,
        }).then((res) => {
          if (res.status === 200) {
            toast.success("Token Removed Successfully");
            fetchTokens();
          }
        });
      }
    });
  };

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
                              We're experiencing an issue with our ETH nodes
                              being out of syc. Reset assured, Our team is
                              working diligently to resync them ASAP!
                            </p>
                          </div>
                        </div>
                        <div class="bg_light_new">
                          <div class="main__acc_row row_flex_portfolio">
                            <div class="icon_mains">
                              <img src={tokenImage} alt="token logo" />
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
                                <option value="">Select token</option>
                                {console.log("tokens is----->", tokens)}
                                {tokens.map((token) => (
                                  <option
                                    key={token.address}
                                    value={`${token.symbol},${token.token_address},${token.name}`}
                                    selected="APC"
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
                                <p id="usdt-address">
                                  {context?.address?.substring(0, 5)} ...{" "}
                                  {context?.address?.substring(
                                    context?.address?.length - 5
                                  )}
                                </p>
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
                          <div
                            class="col-lg-3 col-md-3 col-6"
                            onClick={() => {
                              console.log(
                                "selected token name and address is--->",
                                selectedTokenName,
                                selectedTokenAddress
                              );
                              if (
                                selectedTokenName == undefined ||
                                selectedTokenName == ""
                              ) {
                                toast.info("please select a token");
                                return;
                              }
                              let data = {
                                address: selectedTokenAddress
                                  ? selectedTokenAddress
                                  : "0Tx000",
                                balance: balance,
                                tokenName: selectedTokenName
                                  ? selectedTokenName
                                  : "TRX",
                              };
                              navigate("/send", { state: data });
                            }}
                          >
                            <div class="inner_tabs">
                              <img
                                src={require("../assets/images/paper-plane.png")}
                              />
                              <p>Send</p>
                            </div>
                          </div>
                          <div
                            class="col-lg-3 col-md-3 col-6"
                            onClick={() => navigate("/recieve")}
                          >
                            <div class="inner_tabs">
                              <img
                                src={require("../assets/images/recieve.png")}
                              />
                              <p>Recieve</p>
                            </div>
                          </div>
                          <div class="col-lg-3 col-md-3 col-3 d-none">
                            <div class="inner_tabs">
                              <img
                                src={require("../assets/images/charge.png")}
                              />
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
                              {tokensBalance.map((token) => (
                                <div class="card-coin">
                                  <div class="card-coin__logo">
                                    <img
                                      src={token.image ? token.image : ""}
                                      alt={token.symbol}
                                    />
                                    <span>
                                      {token.name} <b>{token.symbol}</b>
                                    </span>
                                  </div>
                                  <div class="card-coin__price text-center">
                                    <strong>{token.token_address}</strong>
                                  </div>
                                  <div class="card-coin__price">
                                    <strong>
                                      {token.balance} {token.symbol}
                                    </strong>
                                  </div>
                                </div>
                              ))}
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
                                  {contractData.map((contract) => (
                                    <tr key={contract.txID}>
                                      <td
                                        style={{ cursor: "pointer" }}
                                        onClick={copyTxID}
                                      >
                                        {contract.txID}{" "}
                                      </td>
                                      <td>{contract.type}</td>
                                      {/* <td>{contract.owner_address}</td>
                                                                <td>{contract.to_address}</td> */}
                                      <td>
                                        {Number(contract.amount) / 1000000}
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

                    <div class="btm_main">
                      <div class="transations__tbs">
                        <div
                          class={
                            window.location.pathname == "/portfolio"
                              ? "col active-tab"
                              : "col"
                          }
                          onClick={() => navigate("/portfolio")}
                        >
                          <div class="trans_tabs">
                            <img
                              src={require("../assets/images/portfolio.png")}
                            />
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
                        <div
                          className={
                            window.location.pathname == "/"
                              ? "col active-tab"
                              : "col"
                          }
                          onClick={() => navigate("/")}
                        >
                          <div class="trans_tabs">
                            <img
                              src={require("../assets/images/overview.png")}
                            />
                            <p>Overview</p>
                          </div>
                        </div>
                        <div
                          class={
                            window.location.pathname == "/add-token"
                              ? "col active-tab"
                              : "col"
                          }
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate("/add-token")}
                        >
                          <div class="trans_tabs">
                            <img
                              src={require("../assets/images/add-coin.png")}
                            />
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
                    <button class="btn btn-secondary w-100 d-flex align-items-center justify-content-between">
                      <div class="crypto_detail d-flex align-items-center">
                        <div class="crypto_img">
                          <img src={tokenImage} alt="Token Image" />
                        </div>
                        <div class="crypto_select text-start">
                          <p class="m-0">Select Crypto</p>
                          <h6 class="m-0">{selectedTokenName}</h6>
                          <h5 class="m-0">{balance}</h5>
                        </div>
                        <div class="select_dropdown">
                          <select
                            id="token-dropdown"
                            onChange={handleTokenSelect}
                          >
                            {/* <option value="">
                              Select token
                            </option> */}
                            {tokens.map((token, index) => (
                              <option
                                selected={index == 0}
                                key={token.address}
                                value={`${token.symbol},${token.token_address},${token.name}`}
                              >
                                {token.symbol}
                              </option>
                            ))}
                          </select>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  </div>

                  <div class="crypto_account_detail">
                    <div class="cryp_coppy d-flex align-items-center justify-content-between">
                      <h3>{selectedTokenName} - Main Account</h3>
                      <i class="fas fa-copy"></i>
                      <AiOutlineCopy onClick={copyAddress} />
                    </div>
                    <div class="crypto_overvie">
                      <p id="usdt-address" class="text-start">
                        {context?.address?.substring(0, 5)} ...{" "}
                        {context?.address?.substring(
                          context?.address?.length - 5
                        )}
                      </p>
                    </div>
                    <hr />
                    <div class="text-start crpto_mobile_balance">
                      <h3 class="m-0 text-start">
                        ${balance * selectedTokenPrice.toFixed(5)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <svg
            class="account-info__svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 Q50,201 100,0 L100,100 0,100 Z" fill="#000448"></path>
          </svg>
        </section>

        <section class="transection_history">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <ul class="reciver_send_outer d-flex align-items-center">
                  <li>
                    <button
                      class="btn btn-primary"
                      onClick={() => {
                        console.log(
                          "selected token name and address is--->",
                          selectedTokenName,
                          selectedTokenAddress
                        );
                        if (
                          selectedTokenName == undefined ||
                          selectedTokenName == ""
                        ) {
                          toast.info("please select a token");
                          return;
                        }
                        let data = {
                          address: selectedTokenAddress
                            ? selectedTokenAddress
                            : "0Tx000",
                          balance: balance,
                          tokenName: selectedTokenName
                            ? selectedTokenName
                            : "TRX",
                        };
                        navigate("/send", { state: data });
                      }}
                    >
                      <img src={require("../assets/images/paper-plane.png")} />
                      <p class="m-0">Send</p>
                    </button>
                  </li>
                  <li>
                    <button
                      class="btn btn-primary"
                      onClick={() => navigate("/recieve")}
                    >
                      <img src={require("../assets/images/recieve.png")} />
                      <p class="m-0">Recieve</p>
                    </button>
                  </li>
                  <li>
                    <button
                      class="btn btn-primary"
                      onClick={() => toast.info("In development...")}
                    >
                      <img src={require("../assets/images/recieve.png")} />
                      <p class="m-0">Swap</p>
                    </button>
                  </li>
                </ul>
                <p onClick={() => navigate("/scan")} style={{ color: "red" }}>
                  *Scan(only for testing purpose)*
                </p>

                <div class="mt-4 pt-1 crypto_tabs">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active"
                        id="tokens-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#tokens"
                        type="button"
                        role="tab"
                        aria-controls="tokens"
                        aria-selected="true"
                      >
                        Tokens
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="transection-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#transection"
                        type="button"
                        role="tab"
                        aria-controls="transection"
                        aria-selected="false"
                      >
                        Transaction
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="tokens"
                      role="tabpanel"
                      aria-labelledby="tokens-tab"
                    >
                      {tokensBalance.map((token, i) => (
                        <div class="crypto_card_coin d-flex align-items-center justify-content-between">
                          <div class="card-coin__logo">
                            <img
                              src={token.image ? token.image : ""}
                              alt={token.symbol}
                            />
                          </div>
                          <div class="crypto_card_coin_info">
                            <h3 class="text-start d-flex align-items-center">
                              {token.symbol}
                              <span class="token_symbol">{token.symbol}</span>
                            </h3>
                            <h6 class="text-start">{token.name}</h6>
                          </div>
                          <div class="card-coin__price text-end">
                            <strong>
                              {token.balance}
                              <br />$
                              {parseFloat(token.fiatBalance * token.balance)}
                            </strong>
                          </div>
                          {i > 1 && (
                            <div
                              className="menu-icon"
                              onClick={(e) =>
                                handleDeletion(e, token.token_address)
                              }
                            >
                              <MdDelete />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="transection"
                      role="tabpanel"
                      aria-labelledby="transection-tab"
                    >
                      <div class="Transaction_all">
                        {contractData.map((contract) => (
                          <>
                            {contract.ownerAddress ? (
                              <div class="transaction_row">
                                <div class="trans_col">
                                  {contract?.ownerAddress ==
                                  context?.address ? (
                                    <>
                                      <div class="d-flex">
                                        <span class="img_trans">
                                          <img
                                            src={require("../assets/images/paper-plane.png")}
                                          ></img>
                                        </span>
                                        <div>
                                          <h6>Send</h6>
                                          <p>To: {contract.toAddress}</p>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div class="d-flex">
                                        <span class="img_trans recieve">
                                          <img
                                            src={require("../assets/images/recieve.png")}
                                          ></img>
                                        </span>
                                        <div>
                                          <h6>Received</h6>
                                          <p>from: {contract.ownerAddress}</p>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div class="trans_col">
                                  <h6>
                                    {Number(contract.amount) / 1000000} TRX
                                  </h6>
                                </div>
                              </div>
                            ) : (
                              <div class="transaction_row">
                                <div class="trans_col">
                                  {contract?.from == context?.address ? (
                                    <>
                                      <div class="d-flex">
                                      <span class="img_trans">
                                          <img
                                            src={require("../assets/images/paper-plane.png")}
                                          ></img>
                                        </span>
                                        <div>
                                        <h6>Send</h6>
                                        <p>To: {contract?.to}</p>
                                        </div>
                                        
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                    <div class="d-flex">
                                    <span class="img_trans recieve">
                                          <img
                                            src={require("../assets/images/recieve.png")}
                                          ></img>
                                        </span>
                                        <div><h6>Received</h6>
                                      <p>from: {contract?.from}</p></div>
                                      
                                    </div>
                                    
                                    </>
                                  )}
                                </div>
                                <div class="trans_col">
                                  <h6>
                                    {Number(contract.value) / 1000000}{" "}
                                    {contract?.token_info?.symbol}
                                  </h6>
                                </div>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                      {/* <table class="overview__table mobile_table mt-4 pt-1">
                        <thead>
                          <tr>
                            <th>Tx Hash</th>
                            <th>Type</th>
                            <th>From</th>
                                                            <th>To</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contractData.map(contract => (

                            <tr key={contract.txID}>
                              <td style={{ cursor: "pointer" }} onClick={copyTxID}>{contract.txID}</td>
                              <td>{contract.type}</td>
                              <td>{contract.owner_address}</td>
                                                                <td>{contract.to_address}</td>
                              <td>{Number(contract.amount) / 1000000}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table> */}
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
                    <div
                      class={
                        window.location.pathname == "/portfolio"
                          ? "col active-tab"
                          : "col"
                      }
                      onClick={() => navigate("/portfolio")}
                    >
                      <div class="trans_tabs">
                        <img src={require("../assets/images/portfolio.png")} />
                        <p>Portfolio</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div
                      class={
                        window.location.pathname == "/add-token"
                          ? "col active-tab"
                          : "col"
                      }
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
                    <div
                      className={
                        window.location.pathname == "/"
                          ? "col active-tab"
                          : "col"
                      }
                      onClick={() => navigate("/")}
                    >
                      <div class="trans_tabs">
                        <img src={require("../assets/images/overview.png")} />
                        <p>Overview</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div
                      class={
                        window.location.pathname == "/add-token"
                          ? "col active-tab"
                          : "col"
                      }
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
};

export default NewOverView;
