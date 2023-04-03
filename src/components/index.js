import {React} from "react"
import { createWallet } from "../services/services";
import { generateTronAccount } from "./tronFunctions";
import { useNavigate } from "react-router";

const IndexFile = () => {
    let navigate=useNavigate()


    const handleCreateWallet=(e)=>{
        e.preventDefault();
        generateTronAccount().then(res=>{
            
            createWallet({"wallet_address":res.address,"key":res.privateKey,"id":localStorage.getItem('id')}).then(res=>{
                if(res.status===200){
                    console.log("success")
                    localStorage.setItem("account",res.address);
                   
                    navigate('/overview')
                }
            })
        })
    }
    return (
        <>
            <section class="site_welcome">
                <div class="section_overlay">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-6 col-md-8 col-sm-12 col-12">
                                <div class="welcome_logo text-center  mb-4">
                                    <img src={require('../assets/images/apc-logo.png')} alt=""/>
                                </div>
                                <div class="welcome_note text-center">
                                    <h4>Welcome to</h4>
                                    <h1 class="my-3">Aarohi Partner Crypto Wallet</h1>
                                    <img src={require('../assets/images/crypto-img.png')} alt="" width="200px" class="mb-3" />
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-0 mb-4">
                                                <a onClick={(e)=>handleCreateWallet(e)} class="btn btn-primary">Create a new Wallet</a>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-0 mb-4">
                                                <a href="/recovery" class="btn btn-primary transparent_button">Restore a Wallet</a>
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

export default IndexFile;