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




const WalletOverview = () => {

    let context=useContext(appContext)
    const [walletAddress, setWalletAddress] = useState('');
    const [privateKey, setPrivateKey] = useState('')
    const [balance, setBalance] = useState('')
    const getWalletDetails = async () => {
        getWallet(localStorage.getItem('id')).then(async (res) => {
            if (res.status === 200) {
                setWalletAddress(res.data.data[0].wallet_address);
                setPrivateKey(res.data.data[0].private_key);
                let bal = await getBalance(res.data.data[0].wallet_address)
                console.log("balance is---->", bal);
                if (bal) {
                    setBalance(bal);
                }
                //   let transaction=await fetchTransactionHistory(res.data.data[0].wallet_address)
                //   console.log("transaction histroy is---->",transaction);
            }
        }).catch(err => {
            console.log(err?.response?.data?.message)
        })
    }



    const handleTokennModal = () => {
        Swal.fire({
            title: 'Token address',
            input: 'text',
            inputLabel: 'Your token address',
            inputPlaceholder: 'Enter your token address',
            confirmButtonText: "ADD",
            inputValidator: (value) => {
                if (!value) {
                    return 'Please add token address'
                }
            }
        }).then(async (result) => {
            console.log("token", result);
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const payload = {
                    "user_id": localStorage.getItem('id'),
                    "token_add": result.value
                }
                let tokenData = await fetchTokenData(result.value, privateKey);
                console.log("token data is---->", tokenData);
                // if (tokenData) {
                //     addToken(payload).then(res => {
                //         if (res.status === 200) {
                //             Swal.fire("", "Token added successfully", "success")
                //         }
                //     }).catch(err => {

                //         Swal.fire('', err.response.data.message, "error")
                //     })
                // } else {
                //     Swal.fire('', "somethind went wrong", "error")
                // }

            } else if (result.isDenied) {
                Swal.close()
            }
        })


    }

    const handleSendTrxModal = () => {
        Swal.fire({
            title: 'Send',
            html: 'To:<input id="swal-input1" class="swal2-input"></br>' +
                'Amount:<input id="swal-input2" class="swal2-input">',
            preConfirm: () => {
                return {
                    walletAddrress: document.getElementById('swal-input1').value,
                    amount: document.getElementById('swal-input2').value
                }
            }

        }).then((result) => {
            console.log("token", result);
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const payload = {
                    fromAddress: walletAddress,
                    toAddress: result.value.walletAddrress,
                    amount: result.value.amount,
                    privateKey: privateKey

                }
                sendTrx(payload).then(res => {
                    console.log("resulut is", res)
                    if (res.result === true) {
                        Swal.fire({
                            html: `<p>Transaction id: ${res.txid}</p>` +
                                "<p>Transaction successfull</p>",
                            icon: "success"
                        })
                    }
                }).catch(err => {

                    Swal.fire('', err.response.data.message, "error")
                })
            } else if (result.isDenied) {
                Swal.close()
            }
        })


    }

    const handleKeyModal = () => {
        Swal.fire({
            title: 'Verification',
            input: 'text',
            inputLabel: 'Password',
            inputPlaceholder: 'Enter your password',
            confirmButtonText: "Verify",
            confirmButtonColor: "red",
            inputValidator: (value) => {
                if (!value) {
                    return 'Please enter your password'
                }
            }
        }).then((result) => {
            // console.log("token",result);
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const payload = {
                    "user_id": localStorage.getItem('id'),
                    "password": result.value
                }
                getPrivateKey(payload).then(res => {
                    if (res.status === 200) {
                        Swal.fire("", res.data.key, "success")
                    }
                }).catch(err => {

                    Swal.fire('', err.response.data.message, "error")
                })
            } else if (result.isDenied) {
                Swal.close()
            }
        })
    }

    const handleAddWallet = (e) => {
        e.preventDefault();
        generateTronAccount().then(res => {

            createWallet({ "wallet_address": res.address, "key": res.privateKey, "id": localStorage.getItem('id') }).then(res => {
                if (res.status === 200) {
                    console.log("success")
                    localStorage.setItem("account", res.address);
                    Swal.fire("", "Wallet added successfully.", "success")
                    // navigate('/overview')
                }
            })
        })
    }

    //GET USER ADDED TOKEN API

    // const getUserTokens=()=>{
    //     getTokens(localStorage.getItem('id')).then(res=>{
    //         if(res.status===200){
    //             console.log(res.data.data);
    //         }
    //     }).catch(err=>{
    //         console.log(err);
    //     })
    // }

   const copyAddress=()=>{
    let txt = document.getElementById('usdt-address').innerHTML
    navigator.clipboard.writeText(txt)
    }

    useEffect(() => {
        getWalletDetails()
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch('https://api.shasta.trongrid.io/v1/accounts/TLtQ2dRkWBcrdFKmEgdzWTAj3QNytisTzV/transactions', options)
          .then(response => response.json())
          .then(response => console.log("transaction histroy is",response))
          .catch(err => console.error(err))
    }, [])
    return (
        <>
            <section class="dashboard sidebar-width">
                <div class="container-fluid ps-lg-0 pe-lg-4 p-0">
                    <div class="row">
                        <div class="col-lg-12 col-md-9 col-sm-12 col-12 px-lg-5 p-4">
                            <div class="coin_right_body coin-inner-body">
                                <div class="coin_title">
                                    <h1>Overview</h1>
                                </div>
                                <div class="row align-items-center overview__pp">
                                    <div class="col-lg-6 col-md-6 col-6 text-start">
                                        <div class="dropdown-over">
                                            <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                Dropdown button
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li><a class="dropdown-item" href="#">Action</a></li>
                                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-6 text-end">
                                        <button class="btn-danger" onClick={handleTokennModal}>Add Token</button>
                                    </div>
                                </div>
                                
                                <div class="address">
                                    <div class="row  balance-row">
                                        <div class="col-lg-6 col-md-6 col-sm-12 text-start">
                                            <h5>Address</h5>
                                            <div class="address_txt"><p id="usdt-address">{context.address} </p><BiCopy onClick={copyAddress}/></div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 balance-row text-end">
                                            <h5 class="mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z" />
                                                </svg>
                                                Balance
                                            </h5>
                                            <div class="USD_balane">
                                                    {balance} TRX
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="row mt-lg-5 mt-4">
                                    <div class="col-lg-12 col-sm-12 col-12">
                                        <table class="table bitcoun_table m-0 table-striped">
                                            <tr>
                                                <td>
                                                    <img src={require("../assets/images/bitcoin.png")} alt="" />
                                                </td>
                                                <td>
                                                    <h4>Bitcoin</h4>
                                                    <p>= 24,659.86 USD</p>
                                                </td>
                                                <td>
                                                    0 BTC
                                                </td>
                                                <td>
                                                    <b>0.00 USD</b>
                                                </td>
                                                <td>
                                                    <b>14.29 % <span class="status yellow"></span></b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src={require("../assets/images/bitcoin.png")} alt="" />
                                                </td>
                                                <td>
                                                    <h4>Bitcoin</h4>
                                                    <p>= 24,659.86 USD</p>
                                                </td>
                                                <td>
                                                    0 BTC
                                                </td>
                                                <td>
                                                    <b>0.00 USD</b>
                                                </td>
                                                <td>
                                                    <b>14.29 % <span class="status blue"></span></b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src={require("../assets/images/bitcoin.png")} alt="" />
                                                </td>
                                                <td>
                                                    <h4>Bitcoin</h4>
                                                    <p>= 24,659.86 USD</p>
                                                </td>
                                                <td>
                                                    0 BTC
                                                </td>
                                                <td>
                                                    <b>0.00 USD</b>
                                                </td>
                                                <td>
                                                    <b>14.29 % <span class="status green"></span></b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src={require("../assets/images/bitcoin.png")} alt="" />
                                                </td>
                                                <td>
                                                    <h4>Bitcoin</h4>
                                                    <p>= 24,659.86 USD</p>
                                                </td>
                                                <td>
                                                    0 BTC
                                                </td>
                                                <td>
                                                    <b>0.00 USD</b>
                                                </td>
                                                <td>
                                                    <b>14.29 % <span class="status green"></span></b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src={require("../assets/images/bitcoin.png")} alt="" />
                                                </td>
                                                <td>
                                                    <h4>Bitcoin</h4>
                                                    <p>= 24,659.86 USD</p>
                                                </td>
                                                <td>
                                                    0 BTC
                                                </td>
                                                <td>
                                                    <b>0.00 USD</b>
                                                </td>
                                                <td>
                                                    <b>14.29 % <span class="status green"></span></b>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="coin_footer d-flex align-items-lg-center justify-content-between">
                                <ul class="footer_list">
                                    <li>
                                        <a href="javascript:void"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-sliders2" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5ZM12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5ZM1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8Zm9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5Zm1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z" />
                                        </svg> Setting</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-person-rolodex" viewBox="0 0 16 16">
                                            <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                            <path
                                                d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1H1Zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1V2Z" />
                                        </svg> Address book</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                                            <path
                                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                                        </svg> Data Browser</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                                            <path
                                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                                        </svg> FIO</a>
                                    </li>
                                </ul>
                                <ul class="footer_list">
                                    <li>
                                        <a href="javascript:void"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
                                            <path
                                                d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                                        </svg> About</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-person-rolodex" viewBox="0 0 16 16">
                                            <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                            <path
                                                d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1H1Zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1V2Z" />
                                        </svg> Support</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    )
}

export default WalletOverview;