import { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const CreateWallet = () => {
    const loc = useLocation()
    const [check, setCheck] = useState(false)
    let navigate = useNavigate()

    console.log(check);
    return (
        <>
            <div class="d-lg-block d-md-block d-none w-100">
                <section class="site_section d-flex align-items-center sidebar-width create__wallet">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-7 col-md-10 col-sm-12 col-12 text-left text-white site_scale">
                                <div class="text-center  mb-4">
                                    <img src={require("../assets/images/apc-logo.png")} alt="" width="100px" />
                                </div>
                                <div class="wallet_note">
                                    <div class="walet_title px-3">
                                        <h3 class="m-0">Create Wallet</h3>
                                    </div>
                                    <div class="notes px-3">
                                        <h5>Aarohi Partner is displayign sensitive information</h5>
                                    </div>
                                    <div class="note_discription p-3">
                                        <p>Please write it down on paper and keep it in a safe, offline place.
                                            Never share your recovery phrase with anyone, and never enter it in any online website
                                            or
                                            service.</p>
                                    </div>
                                    <div class="lost_note p-3 pt-0">
                                        <h6>If you have lose your recovery phrase, your wallet cannot be recovered!</h6>
                                    </div>
                                    <div class="phrase_box">
                                        <p class="m-0">
                                            {/* gym used route identify fan fiction voyage sleep floor room gold tell abandon credit
                                        elder
                                        loan brief lonely impose tiny toward grocery surprise slender */}
                                            {loc.state.mnemonic}
                                        </p>
                                    </div>
                                    {/* <div class="advance_setting p-3 pb-1">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 col-sm-12 mb-lg-0 mb-md-0 mb-4 d-flex align-items-center">
                                            <div class="custom_checkbox">
                                                <label>
                                                    <input type="checkbox" value="advance_setting" id="advance_setting"
                                                        class="form-check-input" checked />
                                                        <span class="custom_d_checkbox"></span>
                                                        Advanced Setting
                                                </label>
                                            </div>
                                        </div>
                                        <div
                                            class="col-lg-6 col-md-6 col-sm-12 mb-lg-0 mb-md-0 mb-4 text-lg-end text-md-end text-left">
                                            <a href="#" class="btn btn-primary w-auto">Regenerate</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="advance_setting px-3 mt-3">
                                    <div class="row">
                                        <div
                                            class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mb-4 d-flex align-items-center">
                                            <div class="custom_checkbox">
                                                <label>
                                                    <input type="checkbox" value="advance_setting" id="advance_setting"
                                                        class="form-check-input" checked />
                                                        <span class="custom_d_checkbox" cehcked></span>
                                                        Use BIP39
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mt-lg-4 mt-md-4 mt-0">
                                            <div class="form-field mb-2">
                                                <input type="text" placeholder="BIP39 Purchase"/>
                                            </div>
                                            <div class="lost_note">
                                                <h6>This will be required along with your Recovery phrase every time you restore
                                                    on a different device.</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                    <div class="custom_checkbox p-3">
                                        <label>
                                            <input type="checkbox" value="recovery" id="recovery" class="form-check-input" onChange={(e) => setCheck(e.target.checked)} />
                                            <span class="custom_d_checkbox"></span>
                                            I have safely stored my recovery phrase
                                        </label>
                                    </div>
                                    <hr class="m-0" />
                                    <div class="submit_sec p-3">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-3 d-flex align-items-center mb-lg-0 mb-md-0 mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ff0000"
                                                    class="bi bi-file-earmark-lock-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M7 7a1 1 0 0 1 2 0v1H7V7zM6 9.3c0-.042.02-.107.105-.175A.637.637 0 0 1 6.5 9h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 12h-3a.637.637 0 0 1-.395-.125C6.02 11.807 6 11.742 6 11.7V9.3z" />
                                                    <path
                                                        d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0z" />
                                                </svg>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-9 text-lg-end text-md-end text-left">
                                                <a onClick={() => navigate(-1)} class="btn btn-primary w-auto">Cancel</a>
                                                <a onClick={() => check && navigate('/recovery', { state: loc.state })} class="btn btn-primary w-auto">Next</a>
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
                <section class="site_section d-flex align-items-center mobile_login">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-7 col-md-10 col-sm-12 col-12 text-left text-white site_scale">
                                <div class="text-center mb-4">
                                    <img src={require("../assets/images/apc-logo.png")} alt="" width="100px" />
                                </div>
                                <div class="wallet_note wallet_mobile">
                                    <div class="walet_title px-3">
                                        <h3 class="m-0">Create Wallet</h3>
                                    </div>
                                    <div class="notes px-3">
                                        <h5>Aarohi Partner is displayign sensitive information</h5>
                                    </div>
                                    <div class="note_discription p-3">
                                        <p>Please write it down on paper and keep it in a safe, offline place.
                                            Never share your recovery phrase with anyone, and never enter it in any online website
                                            or
                                            service.</p>
                                    </div>
                                    <div class="lost_note p-3 pt-0">
                                        <h6>If you have lose your recovery phrase, your wallet cannot be recovered!</h6>
                                    </div>
                                    <div class="crypto_account_detail">
                                        <p class="m-0">
                                            {loc.state.mnemonic}
                                        </p>
                                    </div>
                                    <div class="custom_checkbox p-3">
                                        <label>
                                            <input type="checkbox" value="recovery" id="recovery" class="form-check-input" onChange={(e) => setCheck(e.target.checked)} />
                                            <span class="custom_d_checkbox">hi</span>
                                            I have safely stored my recovery phrase
                                        </label>
                                    </div>
                                    <hr class="m-0" />
                                    <div class="submit_sec p-3">
                                        <div class="row">
                                            {/* <div class="col-lg-3 col-md-3 col-2 d-flex align-items-center mb-lg-0 mb-md-0 mb-0 d-flex align-items-center p-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fff"
                                                    class="bi bi-file-earmark-lock-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M7 7a1 1 0 0 1 2 0v1H7V7zM6 9.3c0-.042.02-.107.105-.175A.637.637 0 0 1 6.5 9h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 12h-3a.637.637 0 0 1-.395-.125C6.02 11.807 6 11.742 6 11.7V9.3z" />
                                                    <path
                                                        d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0z" />
                                                </svg>
                                            </div> */}
                                            <div class="col-lg-9 col-md-9 col-12 text-lg-end text-md-end text-left d-flex p-0">
                                                <button onClick={() => navigate(-1)} class="btn-danger me-1 mt-0">Cancel</button>
                                                <button onClick={() => check ? navigate('/recovery', { state: loc.state }): toast.info("Please tick the checkbox.")} class="btn-danger mt-0">Next</button>
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

export default CreateWallet