import { useContext } from "react";
import appContext from "../context/globalContext";
import { useNavigate } from "react-router-dom";

const TermServices = () => {
    // const context= useContext(appContext)
    let navigate = useNavigate()
    return (
        <>
            <section class="site_section d-flex align-items-center sidebar-width terms_services">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-md-10 col-sm-12 col-12 text-left text-white site_scale">
                            <div class="text-center  mb-4">
                                <img src={require("../assets/images/apc-logo.png")} alt="" width="200px"/>
                            </div>
                            <div class="wallet_note text-center">
                                <div class="walet_title px-3 pt-4">
                                    <h3 class="m-0"> Terms of Services</h3>
                                </div>


                                <div class="phrase_box my-3 d-block text-left">
                                    <h3 class="text-start">LEGAL DISCLAIMER</h3>
                                    <ul class="terms_service_pp">
                                        <p>Welcome to APC Wallet, a Tron TRC20-based crypto wallet! By using our wallet, you agree to the following terms and conditions:</p>
                                        <li>
                                        Ownership and Control: You are solely responsible for maintaining the confidentiality and security of your private keys, passwords, and any other authentication credentials used to access your wallet. You are solely responsible for any loss, damage, or unauthorized access to your wallet resulting from your failure to maintain the confidentiality and security of such credentials.
                                        </li>
                                        <li>
                                        Use of the Wallet: You may use the APC Wallet to store, send, and receive Tron TRC20-based cryptocurrencies, subject to the terms and conditions of the Tron network. You may not use the APC Wallet for any illegal, fraudulent, or unauthorized purposes.
                                        </li>
                                        <li>
                                        Availability and Access: We will make every effort to ensure that the APC Wallet is available and accessible at all times. However, we do not guarantee the continuous and uninterrupted availability of the APC Wallet. We reserve the right to suspend or terminate your access to the APC Wallet at any time and for any reason.
                                        </li>
                                        <li>
                                        Fees and Charges: You may be subject to transaction fees and other charges when using the APC Wallet. We reserve the right to modify or impose fees and charges for the use of the APC Wallet at any time and without prior notice.
                                        </li>
                                        <li>
                                        Risks and Disclaimer: The use of the APC Wallet involves risks, including but not limited to the risk of loss of funds due to technical failures, fraud, hacking, and other factors. We do not guarantee the security, integrity, or accuracy of the APC Wallet, and we disclaim any liability for any loss or damage resulting from your use of the APC Wallet.
                                        </li>
                                        <li>Changes to Terms: We reserve the right to modify these terms and conditions at any time and without prior notice. Your continued use of the APC Wallet following any changes to these terms and conditions constitutes your acceptance of such changes.</li>
                                        <li>
                                        Governing Law: These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which APC Wallet is located.
                                        </li>
                                        <p>By using APC Wallet, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you may not use APC Wallet.</p>
                                    </ul>
                                </div>
                                <hr class="m-0" />
                                <div class="submit_sec p-3">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12 col-sm-12 text-lg-center text-md-center text-center">
                                            {/* <a href="#" onClick={()=>{navigate('/')}} class="btn btn-primary w-auto">Reject</a> */}
                                            <a onClick={()=>{navigate('/')}} class="btn btn-primary w-auto">Accept</a>
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

export default TermServices;