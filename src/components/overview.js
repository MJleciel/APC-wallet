import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { addToken, getPrivateKey, getTokens, getWallet } from "../services/services";
import { getBalance,sendTrx,fetchTransactionHistory,fetchTokenData } from "./tronFunctions";

const WalletOverview = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [balance,setBalance]=useState('')
    const [transactionHistory, setTransactionHistory] = useState([]);
    const getWalletDetails = async() => {
        getWallet(localStorage.getItem('id')).then(async(res) => {
            if (res.status === 200) {
                setWalletAddress(res.data.data[0].wallet_address);
                let bal=await getBalance(res.data.data[0].wallet_address)
                console.log("balance is---->",bal);
                if(bal){ 
                    setBalance(bal);
                }
            //   let transaction=await fetchTransactionHistory(res.data.data[0].wallet_address)
            //   console.log("transaction histroy is---->",transaction);
            }
        }).catch(err => {
            console.log(err?.response?.data?.message)
        })
    }



    const handleTokennModal=()=>{
       Swal.fire({
            title: 'Token address',
            input: 'text',
            inputLabel: 'Your token address',
            inputPlaceholder: 'Enter your token address',
            confirmButtonText:"ADD",
            inputValidator:(value) => {
                if (!value) {
                  return 'Please add token address'
                }
              }
          }).then(async(result) => {
            console.log("token",result);
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const payload={
                    "user_id":localStorage.getItem('id'),
                    "token_add":result.value
                }
                let tokenData=await fetchTokenData(result.value);
                console.log("token data is---->",tokenData);
                addToken(payload).then(res=>{
                    if(res.status===200){
                        Swal.fire("","Token added successfully","success")
                    }
                }).catch(err=>{

                    Swal.fire('',err.response.data.message,"error")
                })
            } else if (result.isDenied) {
              Swal.close()
            }
          })
          
         
    }

    const handleSendTrxModal=()=>{
       Swal.fire({
            title: 'Send',
            input: 'text',
            inputLabel: 'To',
            
            inputPlaceholder: 'Enter Receiver address',
            confirmButtonText:"SEND TRX",
            inputValidator:(value) => {
                if (!value) {
                  return 'Please add token address'
                }
              }

          }).then((result) => {
            console.log("token",result);
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const payload={
                    fromAddress:walletAddress, 
                    toAddress:result.value, 
                    amount:1,
                    privateKey:"private key"
                    
                }
                sendTrx(payload).then(res=>{
                    if(res.status===200){
                        Swal.fire("","Token added successfully","success")
                    }
                }).catch(err=>{

                    Swal.fire('',err.response.data.message,"error")
                })
            } else if (result.isDenied) {
              Swal.close()
            }
          })
          
         
    }

    const handleKeyModal=()=>{
        Swal.fire({
            title: 'Verification',
            input: 'text',
            inputLabel: 'Password',
            inputPlaceholder: 'Enter your password',
            confirmButtonText:"Verify",
            confirmButtonColor:"red",
            inputValidator:(value) => {
                if (!value) {
                  return 'Please enter your password'
                }
              }
          }).then((result) => {
            // console.log("token",result);
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const payload={
                    "user_id":localStorage.getItem('id'),
                    "password":result.value
                }
                getPrivateKey(payload).then(res=>{
                    if(res.status===200){
                        Swal.fire("",res.data.key,"success")
                    }
                }).catch(err=>{

                    Swal.fire('',err.response.data.message,"error")
                })
            } else if (result.isDenied) {
              Swal.close()
            }
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

    useEffect(() => {
        getWalletDetails()
    }, [])
    return (
        <>
            <section class="dashboard">
                <div class="container-fluid ps-lg-0 pe-lg-4 p-0">
                    <div class="row">
                        <div class="col-12 d-lg-none d-block">
                            <div class="mobile_header d-flex align-items-center justify-content-between p-3">
                                <div class="mobile_logo">
                                    <img src={require("../assets/images/apc-logo.png")} alt="" width="150px" />
                                </div>
                                <div class="mobile_nav">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-list nav_open" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-x-lg nav_close" viewBox="0 0 16 16">
                                        <path
                                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="sidebar d-none">
                                <div class="sidebar_logo text-center">
                                    {/* <!-- <h3>Aarohi</h3> --> */}
                                    <div class="dropdown mt-4 mb-4">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            Default Wallet
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a class="dropdown-item" href="#">Wallet #1</a></li>
                                            <li><a class="dropdown-item" href="#">Wallet #2</a></li>

                                        </ul>
                                    </div>
                                    <div class="menu_list">
                                        <ul>
                                            <li class="menu_list active">
                                                <a href="javascript:void">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" class="bi bi-pie-chart-fill" viewBox="0 0 16 16">
                                                        <path
                                                            d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z" />
                                                    </svg>
                                                    Overview
                                                </a>
                                            </li>
                                            <li class="menu_list">
                                                <a href="javascript:void">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" class="bi bi-wallet-fill" viewBox="0 0 16 16">
                                                        <path
                                                            d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z" />
                                                        <path
                                                            d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z" />
                                                    </svg>
                                                    Wallet
                                                </a>
                                            </li>
                                            <li class="menu_list">
                                                <a href="javascript:void">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" class="bi bi-currency-exchange" viewBox="0 0 16 16">
                                                        <path
                                                            d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z" />
                                                    </svg>
                                                    Exchange
                                                </a>
                                            </li>
                                            <li class="menu_list">
                                                <a href="javascript:void">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" class="bi bi-gift-fill" viewBox="0 0 16 16">
                                                        <path
                                                            d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7h6zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9H2.5z" />
                                                    </svg>
                                                    Gift Cards
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-3 col-sm-12 col-12 pe-0 d-lg-block d-none">
                            <div class="sidebar">
                                <div class="sidebar_logo text-center">
                                    <img src={require("../assets/images/apc-logo.png")} alt="" width="150px" />
                                    {/* <!-- <h3>Aarohi</h3> --> */}
                                    <div class="dropdown mt-4 mb-4">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            Default Wallet
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a class="dropdown-item" href="#">Wallet #1</a></li>
                                            <li><a class="dropdown-item" href="#">Wallet #2</a></li>

                                        </ul>
                                    </div>
                                    <div class="menu_list">
                                        <ul>
                                            <li class="menu_list active">
                                                <a href="javascript:void">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" class="bi bi-pie-chart-fill" viewBox="0 0 16 16">
                                                        <path
                                                            d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z" />
                                                    </svg>
                                                    Overview
                                                </a>
                                            </li>
                                            <li class="menu_list">
                                                <a href="javascript:void">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" class="bi bi-wallet-fill" viewBox="0 0 16 16">
                                                        <path
                                                            d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z" />
                                                        <path
                                                            d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z" />
                                                    </svg>
                                                    Wallet
                                                </a>
                                            </li>
                                            <li class="menu_list">
                                                <a href="javascript:void">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" class="bi bi-currency-exchange" viewBox="0 0 16 16">
                                                        <path
                                                            d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z" />
                                                    </svg>
                                                    Exchange
                                                </a>
                                            </li>
                                            <li class="menu_list">
                                                <a href="javascript:void">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" class="bi bi-gift-fill" viewBox="0 0 16 16">
                                                        <path
                                                            d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7h6zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9H2.5z" />
                                                    </svg>
                                                    Gift Cards
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-10 col-md-9 col-sm-12 col-12 px-lg-5 p-4">
                            <div class="coin_right_body">
                                <div class="coin_title">
                                    <h1>Overview</h1>
                                </div>

                                <div class="row">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-0 mb-4">
                                        <div class="pie_chart text-center">
                                            <img src={require("../assets/images/chart.png")} alt="" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-12 d-flex align-items-center">


                                        <div class="coin_balance_outer w-100">
                                            <div class="button-apc">
                                                <button class="btn-danger" onClick={handleTokennModal}>Add Token</button>
                                                <button class="key-btn" onClick={handleSendTrxModal}>Sent TRX</button>
                                                <button class="key-btn" onClick={handleKeyModal}>Show private key </button>
                                            </div>
                                            
                                            <div class="coin_balance mb-2">
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z" />
                                                </svg> */}
                                                Account Address
                                            </div>
                                            <div class="coin_balance mb-2">{walletAddress || "0Tx"}</div>

                                            <div class="coin_balance mb-2">
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z" />
                                                </svg> */}
                                                Balance
                                            </div>
                                            <div class="coin_balance mb-2">{balance || "0"} TRX</div>
                                            {/* <div class="USD_balane">
                                                {localStorage.getItem("account")?localStorage.getItem("account"):"0Tx"}
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-lg-5 mt-4">
                                    <div class="col-lg-12 col-sm-12 col-12">
                                        <table class="table bitcoun_table m-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Hash</th>
                                                    <th scope="col">From</th>
                                                    <th scope="col" class="th-three">To</th>
                                                    <th scope="col">Value</th>
                                                </tr>
                                            </thead>
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