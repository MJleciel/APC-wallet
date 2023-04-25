
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
// import Home from "../components/home";
import GetStarted from "../components/getStarted";
import RestoreWallet from "../components/restore-wallet";
import AddToken from "../components/addToken";
import { useContext } from "react";
import appContext from "../context/globalContext";
import NewOverView from "../components/newOverview";
import CoinList from "../components/coins-list";
import Transfer from "../components/transfer";
import SendCoin from "../components/send-coin";
import Recieve from "../components/recieve";
import Portfolio from "../components/portfolio";


const Routing = () => {
    let context = useContext(appContext)
    return (
        <>
            <Routes>
                {context.token ?
                    <>
                        <Route path='*' element={<NewOverView />} />
                        <Route path='/overview' element={<NewOverView  />} />
                        <Route path='/portfolio' element={<Portfolio  />} />
                        <Route path='/new-overview' element={<NewOverView />} />
                        <Route path='/coins-list' element={<CoinList />} />
                        <Route path='/transfer' element={<Transfer />} />
                        <Route path='/send' element={<SendCoin />} />
                        <Route path='/recieve' element={<Recieve />} />
                        <Route path='/wallet' element={<UserWallet />} />
                        <Route path='/add-token' element={<AddToken />} />
                        <Route path='/token-list' element={<TokenList />} />
                        <Route path='/setting' element={<Setting />} />
                        <Route path='/select' element={<SelectCoin />} />
                        <Route path='/terms-services' element={<TermServices />} />
                    </>
                    :
                    <>
                        <Route path='*' element={<GetStarted />} />
                        <Route path='/' element={<GetStarted />} />
                        <Route path='/create-wallet' element={<IndexFile />} />
                        <Route path='/restore-wallet' element={<RestoreWallet />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/password' element={<Password />} />
                        <Route path='/cwallet' element={<CreateWallet />} />
                        <Route path='/recovery' element={<ConfirmRecovery />} />
                        <Route path='/tron-wallet' element={<CreateAccount />} />


                    </>
                }
               
            </Routes>
        </>
    )
}

export default Routing;