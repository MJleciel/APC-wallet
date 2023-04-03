
import { Route, Routes } from "react-router"
import IndexFile from "../components"
import CreateAccount from "../components/createAccount";
import CreateWallet from "../components/create_wallet";
import LoginPage from "../components/login";
import WalletOverview from "../components/overview";
import Password from "../components/password";
import ConfirmRecovery from "../components/recovery";
import SelectCoin from "../components/selectCoin";
import Setting from "../components/setting";
import TermServices from "../components/term-services";
import UserWallet from "../components/wallet";


const Routing = () => {
    return (
        <>
            <Routes>
                <Route path='*' element={<LoginPage/>}/>
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/create-wallet' element={<IndexFile/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/password' element={<Password/>}/>
                {/* <Route path='/create-wallet' element={<CreateWallet/>}/> */}
                <Route path='/recovery' element={<ConfirmRecovery/>}/>
                <Route path='/tron-wallet' element={<CreateAccount/>}/>
                <Route path='/select' element={<SelectCoin/>}/>
                <Route path='/wallet' element={<UserWallet/>}/>
                <Route path='/overview' element={<WalletOverview/>}/>
                <Route path='/setting' element={<Setting/>}/>
                <Route path='/terms-services' element={<TermServices/>}/>
            </Routes>
        </>
    )
}

export default Routing;