import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { useContext, useEffect, useState } from "react";
import axios from "axios"
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
import appContext from "../context/globalContext";
import Loader from "./Loader";

const UserWallet = () => {
  let navigate = useNavigate();

  let context = useContext(appContext);
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [contractData, setContractData] = useState([]);
  useEffect(() => {
    // setWalletAddress(localStorage.getItem("address"));
    // setPrivateKey(localStorage.getItem("key"));
    // console.log("local storage private key is---->", privateKey);
    const getWalletDetails = async () => {
      getWallet(localStorage.getItem("id"))
        .then(async (res) => {
          console.log("wallet details result is----->", res);
          if (res.status === 200) {
            setWalletAddress(res.data.data[0].wallet_address);
            setPrivateKey(res.data.data[0].private_key);

            let bal = await getBalance(walletAddress);
            console.log("balance is---->", bal);
            if (bal) {
              setBalance(bal);
            }
          }
        })
        .catch((err) => {
          console.log(err?.response?.data?.message);
        });
    };

    getWalletDetails();
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.shasta.trongrid.io/v1/accounts/${walletAddress}/transactions`,
      options
    )
      .then((response) => response.json())
      .then((response) => {console.log("transaction histroy is", response)
      const transactions = response.data;
      console.log("transaction data is--->",transactions);
      const contractTransactions = transactions.filter(txn => {
            const { raw_data } = txn;
            return raw_data.contract && raw_data.contract.length > 0;
          });
          console.log("contract transaction is--->",contractTransactions);
          const formattedData = contractTransactions.map(txn => {
            const { txID, raw_data } = txn;
            const contract = raw_data.contract[0];
            const { type, value } = contract.parameter;
            const { owner_address, to_address, amount } = value;
            return { txID, type, owner_address, to_address, amount };
          });
          console.log("formatedd data is--->",formattedData);

          setContractData(formattedData);
    })
      .catch((err) => console.error(err));
  }, [walletAddress]);

//   useEffect(() => {
//     const options = { method: "GET", headers: { accept: "application/json" } };
//     async function fetchData() {
//      fetch(
//       `https://api.shasta.trongrid.io/v1/accounts/${walletAddress}/transactions`,
//       options
//     )
//       .then((response) => {response.json()
       
//     })
//       .then((response) => {
//         console.log("transaction histroy is", response)
//         console.log("response of history isss---->",response)
        // const transactions = response.data;
    //   console.log("transaction of historey is--->",transactions)
    //   const contractTransactions = transactions.filter(txn => {
    //     const { raw_data } = txn;
    //     return raw_data.contract && raw_data.contract.length > 0;
    //   });
    //   const formattedData = contractTransactions.map(txn => {
    //     const { txID, raw_data } = txn;
    //     const contract = raw_data.contract[0];
    //     const { type, value } = contract.parameter;
    //     const { owner_address, to_address, amount } = value;
    //     return { txID, type, owner_address, to_address, amount };
    //   });
    //   setContractData(formattedData);
    
//     })
//       .catch((err) => console.error(err));
     
     
//     }
//     fetchData();
//   }, [walletAddress]);

  const handleSendTrxModal = () => {
    Swal.fire({
      title: "Send",
      html:
        'To:<input id="swal-input1" class="swal2-input"></br>' +
        'Amount:<input id="swal-input2" class="swal2-input">',
      preConfirm: () => {
        return {
          walletAddrress: document.getElementById("swal-input1").value,
          amount: document.getElementById("swal-input2").value,
        };
      },
    }).then((result) => {
      console.log("token", result);
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const payload = {
          fromAddress: walletAddress,
          toAddress: result.value.walletAddrress,
          amount: result.value.amount,
          privateKey: privateKey,
        };
        setLoading(true);
        console.log("payload is---->", payload);
        sendTrx(payload)
          .then((res) => {
            console.log("resulut is", res);
            if (res.result === true) {
              setLoading(false);
              Swal.fire({
                html:
                  `<p>Transaction id: ${res.txid}</p>` +
                  "<p>Transaction successfull</p>",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            setLoading(false);
            Swal.fire("", err.response.data.message, "error");
          });
      } else if (result.isDenied) {
        setLoading(false);
        Swal.close();
      }
    });
  };

  return (
    <>
      <section class="dashboard sidebar-width">
      {loading?<Loader/>:""}
        <div class="container-fluid ps-lg-0 pe-lg-4 p-0">
          <div class="row">
            {/* <div class="col-lg-2 col-md-3 col-sm-12 col-12 p-0">
                            <div class="bitcoin_list">
                                <ul>
                                    <li class="active">
                                        <img src={require("../assets/images/bitcoin.png")} alt="" />
                                        Bitcoin
                                    </li>
                                    <li>
                                        <img src={require("../assets/images/bitcoin.png")} alt="" />
                                        Bitcoin
                                    </li>
                                    <li>
                                        <img src={require("../assets/images/bitcoin.png")} alt="" />
                                        Bitcoin
                                    </li>
                                    <li>
                                        <img src={require("../assets/images/algorand.png")} alt="" />
                                        Bitcoin
                                    </li>
                                    <li>
                                        <img src={require("../assets/images/bitcoin.png")} alt="" />
                                        Bitcoin
                                    </li>
                                    <li>
                                        <img src={require("../assets/images/algorand.png")} alt="" />
                                        Bitcoin
                                    </li>
                                </ul>
                            </div>
                        </div> */}

            <div class="col-lg-10 col-md-6 col-sm-12 col-12 px-lg-5 px-md-4 px-4 pb-lg-0 pb-md-0 pb-4 pt-lg-0 pt-md-0 pt-4">
              <div class="coin_right_body">
                <div class="bitcoin_details d-lg-flex d-md-flex align-items-center justify-content-between">
                  <div class="coin_title mb-lg-0 mb-md-0 mb-4">
                    <h1 class="m-0 p-0">
                      <img
                        src={require("../assets/images/bitcoin.png")}
                        alt=""
                      />
                      Overview <span>BTC</span>
                    </h1>
                  </div>
                  <div class="bitcoin_detail d-flex align-items-center">
                    <div class="bitoin_content text-lg-end text-md-end text-start">
                      <p class="m-0">1 BTC = 24,659.86352872 USD</p>
                      <p class="m-0">Height: 781044</p>
                    </div>
                    <div class="bitoin_co_d">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="row mt-5">
                  <div class="col-lg-12 col-md-6 col-sm-12 col-12 d-flex align-items-center">
                    <div class="coin_balance_outer inner_balance w-100">
                      <div class="coin_balance mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-file-bar-graph-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z" />
                        </svg>
                        Balance
                      </div>
                      <div class="USD_balane inner_BTC">
                        <span>{balance ? balance : "0"}</span> TRX
                      </div>
                      {/* <div class="USD_balane">
                                                0.00 USD
                                            </div> */}
                    </div>
                  </div>
                </div>
                <div class="row my-4">
                  <div class="col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-3 mb-md-4 mb-4">
                    <a href="" class="btn btn-primary bg-green text-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-cloud-arrow-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"
                        />
                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                      </svg>
                      Receive
                    </a>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-3 mb-md-4 mb-4">
                    <a
                      class="btn btn-primary bg-purple text-start"
                      onClick={handleSendTrxModal}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-cloud-arrow-up"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                        />
                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                      </svg>
                      Send
                    </a>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-4 mb-4">
                    <a href="" class="btn btn-primary bg-blue text-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-cash-coin"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                        />
                        <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                        <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                        <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                      </svg>
                      Buy
                    </a>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                    <a href="" class="btn btn-primary bg-pink text-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-currency-exchange"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z" />
                      </svg>
                      Exchange
                    </a>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12 col-md-6 col-sm-12 col-12 d-flex align-items-center">
                    <div class="coin_balance_outer inner_balance w-100">
                      <div class="coin_balance mb-2 d-flex align-items-center justify-content-between">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-down-up"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                            />
                          </svg>
                          Transactions (0)
                        </div>
                        <div class="search_transection">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-search"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                          </svg>
                        </div>
                      </div>
                      <div class="transection_history">
                      <table>
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
            <td>{contract.txID}</td>
            <td>{contract.type}</td>
            <td>{contract.owner_address}</td>
            <td>{contract.to_address}</td>
            <td>{contract.amount}</td>
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
            <div class="col-lg-12">
              <div class="coin_footer d-flex align-items-center justify-content-between">
                <ul class="footer_list">
                  <li>
                    <a href="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-sliders2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5ZM12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5ZM1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8Zm9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5Zm1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z"
                        />
                      </svg>{" "}
                      Setting
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-person-rolodex"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1H1Zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1V2Z" />
                      </svg>{" "}
                      Address book
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-globe"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                      </svg>{" "}
                      Data Browser
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-globe"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                      </svg>{" "}
                      FIO
                    </a>
                  </li>
                </ul>
                <ul class="footer_list">
                  <li>
                    <a href="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-exclamation-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                      </svg>{" "}
                      About
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-person-rolodex"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1H1Zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1V2Z" />
                      </svg>{" "}
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserWallet;
