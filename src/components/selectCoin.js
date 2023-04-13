import { useNavigate } from "react-router-dom";

const SelectCoin = () => {
    let navigate=useNavigate()
    return (
        <>
            <section class="site_section d-flex align-items-center sidebar-width">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-7 col-md-10 col-sm-12 col-12 text-left text-white site_scale">
                            <div class="text-center  mb-4">
                                <img src={require("../assets/images/apc-logo.png")} alt="" width="200px" />
                            </div>
                            <div class="wallet_note text-center selecct_coinnn">
                                <div class="walet_title px-3 pt-4">
                                    <h3 class="m-0">Select Coin</h3>
                                </div>
                                <div class="note_discription p-3 pt-0 text-center">
                                    <p class="text-center">Select the Coins you wish to use with the wallet.<br/>
                                        (You can always add more later.)</p>
                                </div>

                                <div class="advance_setting px-3 mt-3">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mt-lg-0 mt-md-0 mt-0">
                                            <div class="form-field mb-2">
                                                <input type="search" placeholder="Search for a Coin"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="advance_setting p-3">
                                    <div class="row">
                                        <div
                                            class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mb-4 d-flex align-items-center">
                                            <div class="custom_checkbox w-100">
                                                <label>
                                                    <span class="d-flex align-items-center">
                                                        <input type="checkbox" value="Bitcoin" id="select-coins"
                                                            class="form-check-input" checked />
                                                            <span class="custom_d_checkbox"></span>
                                                    </span>
                                                    <span class="d-flex justify-content-between align-items-center w-100">
                                                        <span>
                                                            <img src={require("../assets/images/bitcoin.png")} alt="" width="30px" class="me-1" />
                                                                Bitcoin
                                                        </span>
                                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                            fill="#ffffff63" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                                        </svg></span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div
                                            class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mb-4 d-flex align-items-center mt-3">
                                            <div class="custom_checkbox w-100">
                                                <label>
                                                    <span class="d-flex align-items-center">
                                                        <input type="checkbox" value="Bitcoin" id="select-coins"
                                                            class="form-check-input" checked />
                                                            <span class="custom_d_checkbox"></span>
                                                    </span>
                                                    <span class="d-flex justify-content-between align-items-center w-100">
                                                        <span>
                                                            <img src={require('../assets/images/algorand.png')} alt="" width="30px" class="me-1" />
                                                                Algorand
                                                        </span>
                                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                            fill="#ffffff63" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                                        </svg></span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr class="m-0"/>
                                    <div class="submit_sec p-3">
                                        <div class="row">
                                            <div class="col-lg-12 col-md-12 col-sm-12 text-lg-center text-md-center text-center">
                                                <a onClick={()=>navigate('/terms-services')} class="btn btn-primary w-auto">Skip</a>
                                                <a onClick={()=>navigate('/terms-services')} class="btn btn-primary w-auto transparent_button">Next</a>
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


export  default SelectCoin;