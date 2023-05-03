import { useLocation, useNavigate } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { useEffect, useState } from 'react';
const ConfirmRecovery = () => {
    let loc = useLocation()
    let navigate = useNavigate()
    let mnemonic = loc.state.mnemonic.split(' ')
    const [confirmPhrase, setConfirmPhrase] = useState([])
    // const [match, setMatch] = useState(true)
    const [shuffledMnemnoics, setShuffledMnemonics] = useState([])


    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            [array[i], array[j]] = [array[j], array[i]];
        }
        console.log(array);
        setShuffledMnemonics(array);
    }



    const insertInList = (event, item) => {
        if (confirmPhrase.length != mnemonic.length) {
            let item_index = shuffledMnemnoics.indexOf(item)
            shuffledMnemnoics.splice(item_index, 1)
            var temp = [...confirmPhrase]
            temp.push(item)
            setConfirmPhrase(temp)
        }
    }
    const removeFromList = (event, item, index) => {
        var shuffleTemp = [...shuffledMnemnoics]
        shuffleTemp.push(item)
        setShuffledMnemonics(shuffleTemp)
        var temp = [...confirmPhrase]
        temp.splice(index, 1)
        setConfirmPhrase(temp)
    }

    const checkPhrase = () => {
        if (confirmPhrase.length != 0) {
            let match = true
            for (let i = 0; i < confirmPhrase.length; i++) {
                console.log('hi');
                if (confirmPhrase[i] !== mnemonic[i]) {
                    match = false;
                    break;
                }
            }

            if (match) {
                navigate('/password', { state: loc.state })

            }
        }
        else {
            alert('Please confirm you recovery phrase.')
        }
    }

    useEffect(() => {
        console.log(mnemonic);
        shuffle(mnemonic)
    }, [])


    return (
        <>
            <div class="d-lg-block d-md-block d-none w-100">
                <section class="site_section d-flex align-items-center sidebar-width recovery_page">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-9 col-md-10 col-sm-12 col-12 text-left text-white site_scale">
                                <div class="text-center  mb-4">
                                    <img src={require('../assets/images/apc-logo.png')} alt="" width="100px" />
                                </div>
                                <div class="wallet_note">
                                    <div class="walet_title px-3">
                                        <h3 class="m-0">Confirm Recovery Phrase</h3>
                                    </div>
                                    <div class="notes px-3">
                                        <h5>Aarohi Partner is displayign sensitive information</h5>
                                    </div>
                                    <div class="note_discription p-3">
                                        <p>Please confirm your recovery phrase by clicking the words in the right order</p>
                                    </div>
                                    <div class="phrase_box">
                                        <ul class="recovery-text">
                                            {confirmPhrase && confirmPhrase.map((item, index) =>
                                                <li>
                                                    <p class="m-0">{item}<ImCancelCircle onClick={(e) => removeFromList(e, item, index)} /></p>
                                                </li>
                                            )}


                                        </ul>
                                    </div>
                                    <div class="advance_setting p-3 pb-0">
                                        <div class="row">
                                            <div
                                                class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mb-4 text-lg-end text-md-end text-left">
                                                <a onClick={() => setConfirmPhrase([])} class="btn btn-primary w-auto">Remove</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="phrase_list">
                                        <ul class="text-center">
                                            {shuffledMnemnoics.map((item) =>
                                                <li onClick={(e) => insertInList(e, item)}>{item}</li>

                                            )}
                                            {/* <li>fan</li>
                                        <li>floor</li>
                                        <li>abandon</li>
                                        <li>cradits</li>
                                        <li>fan</li>
                                        <li>floor</li>
                                        <li>abandon</li>
                                        <li>cradits</li>
                                        <li>fan</li>
                                        <li>floor</li>
                                        <li>abandon</li> */}
                                        </ul>
                                    </div>
                                    <hr class="m-0" />
                                    <div class="submit_sec p-3">
                                        <div class="row align-items-center">
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
                                                {/* <a href="#" class="btn btn-primary w-auto transparent_button">Skip</a> */}
                                                <a onClick={checkPhrase} class="btn btn-primary w-auto  mt-lg-0 mt-md-0 mt-1" >Confirm</a>
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
                <section class="site_section d-flex align-items-center mobile_login recovery_mobile">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-9 col-md-10 col-sm-12 col-12 text-left text-white site_scale">
                                <div class="text-center  mb-4">
                                    <img src={require('../assets/images/apc-logo.png')} alt="" width="100px" />
                                </div>
                                <div class="wallet_note wallet_mobile">
                                    <div class="walet_title px-3">
                                        <h3 class="m-0">Confirm Recovery Phrase</h3>
                                    </div>
                                    <div class="notes px-3">
                                        <h5>Aarohi Partner is displayign sensitive information</h5>
                                    </div>
                                    <div class="note_discription p-3">
                                        <p>Please confirm your recovery phrase by clicking the words in the right order</p>
                                    </div>
                                    <div class="crypto_account_detail">
                                        <ul class="recovery-text">
                                            {confirmPhrase && confirmPhrase.map((item, index) =>
                                                <li>
                                                    <p class="m-0">{item}<ImCancelCircle onClick={(e) => removeFromList(e, item, index)} /></p>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div class="advance_setting p-0 pb-0">
                                        <div class="row">
                                            <div
                                                class="col-lg-12 col-md-12 col-sm-12 mb-lg-0 mb-md-0 mb-4 text-lg-end text-md-end text-left">
                                                <button onClick={() => setConfirmPhrase([])} class="btn-danger">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="phrase_list">
                                        <ul class="text-center">
                                            {shuffledMnemnoics.map((item) =>
                                                <li onClick={(e) => insertInList(e, item)}>{item}</li>

                                            )}
                                        </ul>
                                    </div>
                                    <div class="crypto_account_detail p-0 border-0 account_hr">
                                        <hr />
                                    </div>
                                    <div class="submit_sec p-0 m-0">
                                        <div class="row align-items-center">
                                            <div class="col-lg-3 col-md-3 col-2 d-flex align-items-center mb-lg-0 mb-md-0 mb-0 d-flex align-items-center pe-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fff"
                                                    class="bi bi-file-earmark-lock-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M7 7a1 1 0 0 1 2 0v1H7V7zM6 9.3c0-.042.02-.107.105-.175A.637.637 0 0 1 6.5 9h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 12h-3a.637.637 0 0 1-.395-.125C6.02 11.807 6 11.742 6 11.7V9.3z" />
                                                    <path
                                                        d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0z" />
                                                </svg>
                                            </div>
                                            <div class="col-lg-9 col-md-9 col-10 text-lg-end text-md-end text-left d-flex ps-0">
                                                <button onClick={() => navigate(-1)} class="btn-danger me-1 mt-0">Cancel</button>
                                                <button onClick={checkPhrase} class="btn-danger mt-0">Confirm</button>
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

export default ConfirmRecovery;