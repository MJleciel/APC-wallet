import { React, useState } from "react"
import { createWallet } from "../services/services";
import { generateTronAccount } from "./tronFunctions";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoCopy, IoIosCopy } from 'react-icons/io';
const IndexFile = () => {
    let navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [memonic,setMemonic]=useState('')
    const handleClose = () => {
        setShow(false);
        navigate('/overview')
    }
    // const handleShow = () => setShow(true);

    const handleCreateWallet = (e) => {
        e.preventDefault();
        generateTronAccount().then(res => {
            console.log(res)
            setMemonic(res.mnemonic)
      
            navigate('/cwallet',{state:res})
            // createWallet({ "wallet_address": res.address, "key": res.privateKey, "id": localStorage.getItem('id') }).then(res => {
            //     if (res.status === 200) {
            //         console.log("success")
            //         localStorage.setItem("account", res.address);
                   
            //         setShow(true)

                    
            //     }
            // })
        })
    }

    const copyMnemonic=()=>{
        let txt = document.getElementById('copy-mnemonic').innerHTML
        // console.log(txt);
        navigator.clipboard.writeText(txt)
    }
    return (
        <>
            <section class="site_welcome sidebar-width">
                <div class="section_overlay">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-6 col-md-8 col-sm-12 col-12">
                                <div class="welcome_logo text-center  mb-4">
                                    <img src={require('../assets/images/apc-logo.png')} alt="" />
                                </div>
                                <div class="welcome_note text-center">
                                    <h4>Welcome to</h4>
                                    <h1 class="my-3">Aarohi Partner Crypto Wallet</h1>
                                    <img src={require('../assets/images/crypto-img.png')} alt="" width="200px" class="mb-3" />
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-0 mb-4">
                                            <a onClick={(e) => handleCreateWallet(e)} class="btn btn-primary">Create a new Wallet</a>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-0 mb-4">
                                            <a onClick={()=>navigate('/restore-wallet')} class="btn btn-primary transparent_button">Restore a Wallet</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="memonic-modal">
                    <Modal className="memonic-modal" show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>Mnemonic <small>*please copy this mnemonic. it is showing only one time. </small></Modal.Title>
                        </Modal.Header>
                        <Modal.Body id="memonic-text">
                           <div className="row">
                            <div className="col-lg-10" id="copy-mnemonic">
                            {memonic}
                            </div>
                            <div class="col-lg-2">
                            <p className="memonic-content"  onClick={copyMnemonic}><IoIosCopy /> copy</p>
                            </div>
                            </div> 
                        </Modal.Body>
                        
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Okay
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </section>
        </>
    )
}

export default IndexFile;