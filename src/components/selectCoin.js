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
} from "./tronFunctions";
import Sidebar from "./sidebar";
import { icons } from "react-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { BiCopy } from "react-icons/bi";
import appContext from "../context/globalContext";

const SelectCoin = () => {
  let navigate = useNavigate();
  let context = useContext(appContext);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenAddress, setTokenAddress] = useState();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTokens, setSelectedTokens] = useState([]);

  // Filter the token list based on the search query

  const tokens = [
    {
      name: "Tether USD",
      symbol: "USDT",
      totalSupply: 999000000000000,
      address: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
      image: "https://static.tronscan.org/production/logo/usdtlogo.png",
    },
    {
      name: "TrueUSD",
      symbol: "TUSD",
      totalSupply: 0,
      address: "TUpMhErZL2fhh4sVNULAbNKLokS4GjC1F4",
      image:
        "https://static.tronscan.org/production/logo/TUpMhErZL2fhh4sVNULAbNKLokS4GjC1F4.png",
    },
    {
      name: "SUN",
      symbol: "SUN",
      totalSupply: 99000000000000000,
      address: "TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S",
      image: "https://static.tronscan.org/production/logo/TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S.png",
    },
    {
      name: "Dogecoin",
      symbol: "DOGE",
      totalSupply: 19800000000000000,
      address: "THbVQp8kMjStKNnf2iCY6NEzThKMK5aBHg",
      image:
        "https://static.tronscan.org/production/upload/logo/THbVQp8kMjStKNnf2iCY6NEzThKMK5aBHg.png",
    },
  ];
  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function toggleTokenSelection(token) {
    if (selectedTokens.some(selectedToken => selectedToken.address === token.address)) {
      setSelectedTokens(selectedTokens.filter(selectedToken => selectedToken.address !== token.address));
    } else {
      setSelectedTokens([...selectedTokens, token]);
    }
  }

  // const [tokens, setTokens] = useState([]);

  // useEffect(() => {
  //   async function fetchTokens() {
  //     const response = await fetch('https://api.shasta.trongrid.io/v1/tokens?limit=10&sort=-market_cap');
  //     const data = await response.json();
  //     console.log("token data is---->",data.data);

  //     setTokens(data.data);
  //   }
  //   fetchTokens();
  // }, []);

  // useEffect(()=>{

  //     async function tokenData(){
  //         let tokenData = await fetchTokenData(tokenAddress, context.key);

  //         console.log("tokenData is------------->",tokenData)
  //         if(tokenData){
  //             setTokenName(tokenData.name);
  //             setTokenSymbol(tokenData.symbol)
  //             setError(false);
  //         }
  //         if(tokenData=="Invalid contract address provided"){
  //             setError(true)
  //             // alert(tokenData);
  //         }
  //     }

  //   try{

  //     console.log("token data is---->", tokenData());
  //     // const payload = {
  //     //     "user": context.id,
  //     //     "token": result.value,
  //     //     "name": tokenData.name,
  //     //     "symbol": tokenData.symbol,
  //     //     "decimal": tokenData.decimals
  //     // }

  //   }catch(e){

  //   }
  // },[tokenAddress])

  const handleTokenModal = () => {
    /* Read more about isConfirmed, isDenied below */

    console.log("selected tokens are------>", selectedTokens);

    selectedTokens.forEach(token => {

      const payload = {
        user: context.id,
        token: token.address,
        name: token.name,
        symbol: token.symbol,
        decimal: 6,
      };

      addToken(payload);
      navigate("/terms-services")
    });




    // if (!error) {
    //   addToken(payload)
    //     .then((res) => {
    //       if (res.status === 200) {
    //         Swal.fire("", "Token added successfully", "success");
    //       }
    //     })
    //     .catch((err) => {
    //       Swal.fire("", err.response.data.message, "error");
    //     });
    // } else {
    //   Swal.fire("", "somethind went wrong", "error");
    // }
  };
  return (
    <>
      <div class="d-lg-block d-md-block d-none w-100">
        <section class="site_section d-flex align-items-center sidebar-width">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7 col-md-10 col-sm-12 col-12 text-left text-white site_scale">
                <div class="text-center  mb-4">
                  <img
                    src={require("../assets/images/apc-logo.png")}
                    alt=""
                    width="200px"
                  />
                </div>
                <div class="wallet_note text-center selecct_coinnn">
                  <div class="walet_title px-3 pt-4">
                    <h3 class="m-0">Add Coin</h3>
                  </div>
                  <div class="note_discription p-3 pt-0 text-center">
                    <p class="text-center">
                      Add the Coins you wish to use with the wallet.
                      <br />
                      (You can always add more later.)
                    </p>
                  </div>

                  <div class="advance_setting px-3 mt-3">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mt-lg-0 mt-md-0 mt-0">
                        <div class="form-field mb-2">
                          <input
                            type="search"
                            placeholder="Search tokens by name"
                            value={searchQuery}
                            onChange={(event) =>
                              setSearchQuery(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* {tokenName?<>
                                        <p>Coin Name: {tokenName}</p>
                                        <p>Coin Symbol: {tokenSymbol}</p>
                                    </>:""}
                                    {error?<>
                                        <p>Invalid token Address</p>
                                        
                                    </>:""} */}
                  </div>
                  {/* <div class="col-lg-6 col-md-6 col-6 text-end">
                                        <button class="btn-danger" onClick={handleTokennModal}>Add Token</button>
                                    </div> */}

                  <div class="advance_setting p-3">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mb-4 d-flex align-items-center">
                        <div class="custom_checkbox w-100">
                          <label>
                            <span class="d-flex align-items-center">
                              <input
                                type="checkbox"
                                value="Bitcoin"
                                id="select-coins"
                                class="form-check-input"
                                checked
                              />
                              <span class="custom_d_checkbox"></span>
                            </span>
                            <span class="d-flex justify-content-between align-items-center w-100">
                              <span>
                                <img
                                  src={require("../assets/images/aarohi-coin.png")}
                                  alt=""
                                  width="30px"
                                  class="me-1"
                                />
                                APC
                              </span>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="#ffffff63"
                                  class="bi bi-gear-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                </svg>
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>
                      <div class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mb-4 d-flex align-items-center mt-3">
                        <div class="custom_checkbox w-100">
                          <label>
                            <span class="d-flex align-items-center">
                              <input
                                type="checkbox"
                                value="Bitcoin"
                                id="select-coins"
                                class="form-check-input"
                                checked
                              />
                              <span class="custom_d_checkbox"></span>
                            </span>
                            <span class="d-flex justify-content-between align-items-center w-100">
                              <span>
                                <img
                                  src={require("../assets/images/algorand.png")}
                                  alt=""
                                  width="30px"
                                  class="me-1"
                                />
                                TRX
                              </span>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="#ffffff63"
                                  class="bi bi-gear-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                </svg>
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>
                      {filteredTokens.map((token) => (
                        <li key={token.address}>
                          <div class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mb-4 d-flex align-items-center mt-3">
                            <div class="custom_checkbox w-100">
                              <label>
                                <span class="d-flex align-items-center">
                                  <input
                                    type="checkbox"
                                    value="Bitcoin"
                                    id="select-coins"
                                    class="form-check-input"
                                    checked={selectedTokens.some(selectedToken => selectedToken.address === token.address)}
                                    onChange={() => toggleTokenSelection(token)}
                                  />
                                  <span class="custom_d_checkbox"></span>
                                </span>
                                <span class="d-flex justify-content-between align-items-center w-100">
                                  <span>
                                    <img
                                      src={token.image}
                                      alt=""
                                      width="30px"
                                      class="me-1"
                                    />
                                    {token.name}
                                  </span>
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="#ffffff63"
                                      class="bi bi-gear-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                    </svg>
                                  </span>
                                </span>
                              </label>
                            </div>
                          </div>
                          {/* <img src={token.image} alt={`${token.name} logo`} /> */}
                          {/* <div>
              <p>{token.name}</p>
              <p>{token.symbol}</p>
              <p>Total Supply: {token.totalSupply}</p>
              <p>Address: {token.address}</p>
            </div> */}
                        </li>
                      ))}
                    </div>
                  </div>
                  <hr class="m-0" />
                  <div class="submit_sec p-3">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 col-sm-12 text-lg-center text-md-center text-center">
                        <a
                          onClick={() => navigate("/terms-services")}
                          class="btn btn-primary w-auto"
                        >
                          Skip
                        </a>
                        <a
                          onClick={() => {
                            handleTokenModal()
                            // navigate("/terms-services")
                          }}
                          class="btn btn-primary w-auto transparent_button"
                        >
                          Next
                        </a>
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
        <section class="site_section mobile_add_token text-white mobile_login d-flex align-items-center d-flex align-items-center sidebar-width pass_word">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7 col-md-10 col-sm-12 col-12 text-left text-white site_scale">
                <div class="text-center  mb-4">
                  <img
                    src={require("../assets/images/apc-logo.png")}
                    alt=""
                    width="200px"
                  />
                </div>
                <div class="wallet_note text-center wallet_mobile">
                  <div class="walet_title px-3 pt-4">
                    <h3 class="m-0">Add Coin</h3>
                  </div>
                  <div class="note_discription p-3 pt-0 text-center">
                    <p class="text-center">
                      Add the Coins you wish to use with the wallet.
                      <br />
                      (You can always add more later.)
                    </p>
                  </div>

                  <div class="advance_setting px-0 my-3">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mt-lg-0 mt-md-0 mt-0">
                        <div class="form-field mb-2">
                          <input
                            type="search"
                            placeholder="Search tokens by name"
                            value={searchQuery}
                            onChange={(event) =>
                              setSearchQuery(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* {tokenName?<>
                                        <p>Coin Name: {tokenName}</p>
                                        <p>Coin Symbol: {tokenSymbol}</p>
                                    </>:""}
                                    {error?<>
                                        <p>Invalid token Address</p>
                                        
                                    </>:""} */}
                  </div>
                  {/* <div class="col-lg-6 col-md-6 col-6 text-end">
                                        <button class="btn-danger" onClick={handleTokennModal}>Add Token</button>
                                    </div> */}

                  <div class="advance_setting select_coin_outer p-0">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mb-0 d-flex align-items-center">
                        <div class="custom_checkbox w-100">
                          <label>
                            <span class="d-flex align-items-center">
                              <input
                                type="checkbox"
                                value="Bitcoin"
                                id="select-coins"
                                class="form-check-input"
                                checked
                              />
                              <span class="custom_d_checkbox"></span>
                            </span>
                            <span class="d-flex justify-content-between align-items-center w-100">
                              <span>
                                <img
                                  src={require("../assets/images/aarohi-coin.png")}
                                  alt=""
                                  width="30px"
                                  class="me-1"
                                />
                                APC
                              </span>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="#ffffff63"
                                  class="bi bi-gear-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                </svg>
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>
                      <div class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mb-0 d-flex align-items-center mt-3">
                        <div class="custom_checkbox w-100">
                          <label>
                            <span class="d-flex align-items-center">
                              <input
                                type="checkbox"
                                value="Bitcoin"
                                id="select-coins"
                                class="form-check-input"
                                checked
                              />
                              <span class="custom_d_checkbox"></span>
                            </span>
                            <span class="d-flex justify-content-between align-items-center w-100">
                              <span>
                                <img
                                  src={require("../assets/images/algorand.png")}
                                  alt=""
                                  width="30px"
                                  class="me-1"
                                />
                                TRX
                              </span>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="#ffffff63"
                                  class="bi bi-gear-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                </svg>
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>
                      {filteredTokens.map((token) => (
                        <li key={token.address}>
                          <div class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mb-0 d-flex align-items-center mt-3">
                            <div class="custom_checkbox w-100">
                              <label>
                                <span class="d-flex align-items-center">
                                  <input
                                    type="checkbox"
                                    value="Bitcoin"
                                    id="select-coins"
                                    class="form-check-input"
                                    checked={selectedTokens.some(selectedToken => selectedToken.address === token.address)}
                                    onChange={() => toggleTokenSelection(token)}
                                  />
                                  <span class="custom_d_checkbox"></span>
                                </span>
                                <span class="d-flex justify-content-between align-items-center w-100">
                                  <span>
                                    <img
                                      src={token.image}
                                      alt=""
                                      width="30px"
                                      class="me-1"
                                    />
                                    {token.name}
                                  </span>
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="#ffffff63"
                                      class="bi bi-gear-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                    </svg>
                                  </span>
                                </span>
                              </label>
                            </div>
                          </div>
                          {/* <img src={token.image} alt={`${token.name} logo`} /> */}
                          {/* <div>
              <p>{token.name}</p>
              <p>{token.symbol}</p>
              <p>Total Supply: {token.totalSupply}</p>
              <p>Address: {token.address}</p>
            </div> */}
                        </li>
                      ))}
                    </div>
                  </div>
                  <div class="crypto_account_detail p-0 border-0 m-0">
                    <hr />
                  </div>
                  <div class="submit_sec p-0 m-0">
                    <div class="row m-0">
                      <div class="col-lg-12 col-md-12 col-sm-12 text-lg-center text-md-center text-center d-flex p-0">
                        <button
                          onClick={() => navigate("/terms-services")}
                          class="btn-danger me-2 mt-0"
                        >
                          Skip
                        </button>
                        <button
                          onClick={() => {
                            handleTokenModal()
                            // navigate("/terms-services")
                          }}
                          class="btn-danger mt-0"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SelectCoin;
