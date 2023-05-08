import { useContext, useEffect, useState } from "react";

import { useLocation, useNavigate } from 'react-router-dom';
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
import { IoMdArrowRoundBack } from "react-icons/io";

const RestoreWallet = () => {
    const [seedPhrase, setSeedPhrase] = useState()
    let navigate = useNavigate()

    const restoreWallet = (seedPhrase) => {
        generateTronAccount(seedPhrase).then(res => {
            console.log("result is--->", res)
            navigate('/password', { state: res })
            // setMemonic(res.mnemonic)

            // navigate('/cwallet',{state:res})
            // createWallet({ "wallet_address": res.address, "key": res.privateKey, "id": localStorage.getItem('id') }).then(res => {
            //     if (res.status === 200) {
            //         console.log("success")
            //         localStorage.setItem("account", res.address);

            //         setShow(true)


            //     }
            // })
        })
    }
    const handleSeedPhrase = async () => {
        console.log("seed phrase is----->", seedPhrase);
        if (seedPhrase == "" || seedPhrase == undefined) {
            alert("Please Enter Mnemonic");
            return;
        }
        let res = await restoreWallet(seedPhrase);
        console.log("result of restore waller ", res);
    }
    return (
        <>
            <div class="d-lg-block d-md-block d-none w-100">
                <section class="klevar-extention text-white restore__wall_et">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8 col-md-8 col-sm-12">
                                <div class="klevar-inner restore-connect">
                                    <div class="top-wallet">
                                        <h5>Restore Wallet</h5>
                                        <i class="fas fa-times"></i>
                                    </div>
                                    <div class="required">
                                        <p><img src={require("../assets/images/restore_ap.png")} />APC Wallet is requiring you to perform a secure action</p>
                                    </div>
                                    <div class="restre-inner-text">
                                        <h5>Recovery Phase</h5>
                                        <form>
                                            <textarea class="form-control" id="textAreaExample1" onChange={(e) => {
                                                console.log("value of input is", e.target.value)
                                                setSeedPhrase(e.target.value);
                                            }} rows="4"></textarea>
                                            {/* <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Advanced Settings
                                                </label>
                                        </div> */}
                                        </form>
                                    </div>
                                    <div class="restore-footer">
                                        <div class="restore-buttons">
                                            <img src={require("../assets/images/icon.png")} />
                                            <button class="btn-danger btn-1" onClick={handleSeedPhrase}>ok</button>
                                            <button class="btn-danger" onClick={() => {
                                                navigate("/")
                                            }}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="d-lg-none d-md-none d-block w-100">
                <section class="klevar-extention text-white mobile_login d-flex align-items-center mobile_restore">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8 col-md-8 col-sm-12">
                                <div class="klevar-inner restore-connect">
                                <div className="BackBtn" onClick={() => navigate(-1)}><IoMdArrowRoundBack /></div>
                                    <div class="top-wallet">
                                        <h5>Restore Wallet</h5>
                                        <i class="fas fa-times"></i>
                                    </div>
                                    <div class="required">
                                        <p><img src={require("../assets/images/restore_ap.png")} />APC Wallet is requiring you to perform a secure action</p>
                                    </div>
                                    <div class="restre-inner-text px-0 pb-0">
                                        <h5>Recovery Phase</h5>
                                        <form>
                                            <textarea class="form-control" id="textAreaExample1" onChange={(e) => {
                                                console.log("value of input is", e.target.value)
                                                setSeedPhrase(e.target.value);
                                            }} rows="4"></textarea>
                                        </form>
                                    </div>
                                    <div class="crypto_account_detail p-0 border-0 m-0">
                                        <hr />
                                    </div>
                                    <div class="restore-footer border-0">
                                        <div class="row align-items-center m-0">
                                            {/* <div class="col-lg-3 col-md-3 col-2 d-flex align-items-center mb-lg-0 mb-md-0 mb-0 d-flex align-items-center p-0">
                                                <img src={require("../assets/images/icon.png")} width="50px"/>
                                            </div> */}
                                            <div class="col-lg-12 col-md-12 col-12 text-lg-end text-md-end text-left d-flex p-0">
                                                <button class="btn-danger me-1 mt-0" onClick={handleSeedPhrase}>ok</button>
                                                <button class="btn-danger m-0" onClick={() => {
                                                    navigate("/")
                                                }}>Cancel</button>
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
    )
}

export default RestoreWallet;