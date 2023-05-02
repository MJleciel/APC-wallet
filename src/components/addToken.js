import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import TronWeb from "tronweb";
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
} from "./tronFunctions";
import appContext from "../context/globalContext";
import { tronWeb } from "./tronFunctions";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddToken = () => {
  let context = useContext(appContext);
  let navigate = useNavigate()
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [balance, setBalance] = useState("");
  const [tokenAddress, setTokenAddress] = useState();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [icon, setIcon] = useState("");
  const [error, setError] = useState("");
  const [tokens, setTokens] = useState([]);

  let tronWeb2 = new TronWeb({
    fullHost: "https://api.shasta.trongrid.io",
    solidityNode: "https://api.shasta.trongrid.io",
    eventServer: "https://api.shasta.trongrid.io",
    privateKey: context.key,
  });

  useEffect(() => {
    async function fetchTokens() {
    try { const response = await getTokens(context.id,context.token);
      console.log("response is---->", response);
      const tokens = response.data.data;

      const balanceRequests = tokens.map(async (token) => {
        console.log("address is---->", context.address)
        const contract = await tronWeb2.contract().at(token.token_address);
        let balance = await contract.balanceOf(context.address).call();
        console.log("balance oof token--->", token.token_address, balance.toString());
        let res = balance.toString();
        res = parseFloat(res)
        return res / 1000000;
      });
      const balances = await Promise.all(balanceRequests);

      const tokensWithBalances = tokens.map((token, index) => ({ ...token, balance: balances[index] }));
      console.log("updated tokens result is", tokensWithBalances);
      setTokens(tokensWithBalances);}

      catch(err){
        if(err.response.status==401){
          toast.error(err.response.data.message)
          navigate('/login')
        }
      }
    }

    fetchTokens();
  }, [context.address]);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const getTokenBalance = async (tokenAddress) => {
    console.log("token addrss is--->")
    const contract = await tronWeb2.contract().at(tokenAddress);
    let balance = await contract.balanceOf(context.address).call();
    console.log("balance is--->", balance.toString());
    let res = balance.toString();
    return 0;
  };

  const handleTokenDetails = async () => {
    try {
      // const tronWeb = new TronWeb({
      //   fullHost: 'https://api.trongrid.io',
      // });

      console.log("token address is--------->", address, context.key);
      const contract = await tronWeb2.contract().at(address);
      const name = await contract.name().call();
      const symbol = await contract.symbol().call();
      // const icon = await contract.icon().call();
      setName(name);
      setSymbol(symbol);

      console.log("name and symbol is--->", name, symbol);
      const payload = {
        user: context.id,
        token: address,
        name: name,
        symbol: symbol,
        decimal: 6,
      };

      addToken(payload)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire("", "Token added successfully", "success");
          }
        })
        .catch((err) => {
          Swal.fire("", err.response.data.message, "error");
        });

      // setIcon(icon);
      setError("");
    } catch (e) {
      console.log("error is---->", e);
      setName("");
      setSymbol("");
      setIcon("");
      setError("Invalid token address.");
    }
  };

  return (
    <>
      <section class="klevar-extention text-white sidebar-width add_token_screen">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 col-md-8 col-sm-12">
              <div class="klevar-inner restore-connect add-token__screen">
                <div class="top-wallet">
                  {/* <h1>&#60;</h1> */}
                  <div className="BackBtn arrow_back" onClick={() => navigate(-1)}>
                    <IoMdArrowRoundBack />
                  </div>
                  {/* <div class="all-assets">
                    <h4>All Assets</h4>
                    <h5>Custom Token</h5>
                  </div> */}
                </div>
                <div class="assests-input">
                  <div class="input-group">
                    <div class="form-outline">
                      <input
                        value={tokenAddress}
                        type="search"
                        id="form1"
                        class="form-control"
                        placeholder="Token Contract Address"
                        onChange={handleAddressChange}
                      />
                      <i class="fas fa-search"></i>
                    </div>
                  </div>
                </div>
                <div class="assests-menu">
                  <div>
                    <h5>Assest Collectibles</h5>
                    <h5></h5>
                  </div>
                  <form>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Hide Small Balances
                      </label>
                    </div>
                  </form>
                </div>
                <div class="assest_inner">
                  {error && <div>{error}</div>}
                  {name && symbol && (
                    <div>
                      <p>Name: {name}</p>
                      <p>Symbol: {symbol}</p>
                      <img src={icon} alt="Token Icon" />
                    </div>
                  )}
                  <div class="row">
                    <table className="add-token__screen">
                      <thead>
                        <tr>
                          <th>Token Address</th>
                          <th>Name</th>
                          <th>Symbol</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {console.log("checkin for token map is----->", tokens)}
                        {tokens.map(token => (
                          <tr key={token.id}>
                            <td>{token.token_address}</td>
                            <td>{token.name}</td>
                            <td>{token.symbol}</td>
                            <td>{token.balance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* <div class="col-lg-2 col-md-2 col-2">
                      <img src={require("../assets/images/token.png")} />
                    </div> */}
                    {/* <div class="col-lg-9 col-md-9 col-5 col-two">
                      <h3>
                        TRX <span class="text-muted">TRX</span>
                      </h3>
                      <h4>
                        15,010 <span class="text-muted">(85459)</span>
                      </h4>
                    </div> */}
                    <div class="col-lg-1 col-md-2 col-1">
                      <i class="far fa-check-circle"></i>
                    </div>
                  </div>
                  <div class="row row-addtoken">
                    <button class="add__token" onClick={handleTokenDetails}>
                      Add Token
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddToken;
