
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
import TokenList from "../components/tokens";
import NewWallet from "../components/new-wallet";
import NewSidebar from "../components/sidebar";
import Home from "../components/home";
import GetStarted from "../components/getStarted";
import RestoreWallet from "../components/restore-wallet";
import AddToken from "../components/addToken";


const Routing = () => {
    return (
        <>
            <Routes>
                <Route path='*' element={<GetStarted/>}/>
                <Route path='/' element={<GetStarted/>}/>
                <Route path='/create-wallet' element={<IndexFile/>}/>
                <Route path='/restore-wallet' element={<RestoreWallet/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/password' element={<Password/>}/>
                <Route path='/cwallet' element={<CreateWallet/>}/>
                <Route path='/recovery' element={<ConfirmRecovery/>}/>
                <Route path='/tron-wallet' element={<CreateAccount/>}/>
                <Route path='/select' element={<SelectCoin/>}/>
                <Route path='/wallet' element={<UserWallet/>}/>
                <Route path='/overview' element={<WalletOverview/>}/>
                <Route path='/add-token' element={<AddToken/>}/>
                <Route path='/token-list' element={<TokenList/>}/>
                <Route path='/setting' element={<Setting/>}/>
                <Route path='/terms-services' element={<TermServices/>}/>
                <Route path='/new-wallet' element={<NewWallet/>}/>
                <Route path='/new-sidebar' element={<NewSidebar/>}/>
                <Route path='/home' element={<Home/>}/>
            </Routes>
        </>
    )
}

export default Routing;