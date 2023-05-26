import { IoMdArrowRoundBack } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import appContext from "../context/globalContext";
import { getBalance, sendTrx, fetchTokenData } from "./tronFunctions";
import Swal from "sweetalert2";
import Loader from "./Loader";
import "../App.css";
import { toast } from "react-toastify";

const SendCoin = () => {
  const [sendWalletAddress, setSendWalletAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  let loc = useLocation();
  let context = useContext(appContext);


  const handleSendTrxModal = () => {


    if (sendWalletAddress == "" || sendWalletAddress == undefined) {
      toast.error("Please Enter Receiver wallet address");
      return;
    }
    if (amount <= 0) {
      toast.error("Please Enter Amount");
      return;
    }

    let bal = parseFloat(loc.state.balance);
    console.log("balance of token is", bal);

    if (bal < parseFloat(amount)) {
      toast.error(`you dont have ${amount} in your wallet`);
      //   setAmount(0);
      return;
    }

    console.log("here");

    /* Read more about isConfirmed, isDenied below */

    const payload = {
      fromAddress: context.address,
      toAddress: sendWalletAddress,
      amount: amount,
      privateKey: context.key,
      tokenAddress: loc.state.address,
    };
    setLoading(true);
    // console.log("payload is---->", payload);
    sendTrx(payload)
      .then((res) => {
        console.log("result is",res);
        if (res) {
          console.log("result 2 is",res);
          setLoading(false);
          Swal.fire({
            html:
              // `<p>Transaction id: ${res?.txid}</p>` +
              "<p>Transaction successfull</p>",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("error is--->", err);
        Swal.fire("", err?.response?.data?.message, "error");
      });
  };
  console.log("loc passed data is----->", loc);
  return (
    <>
      <section class="transfer-page send-page">
        {loading ? <Loader /> : ""}
        <div class="container">
          <div class="page page--main" data-page="buy">
            <div class="page__content page__content--with-header page__content--with-bottom-nav padding_send">
              <h2 class="page__title">Send {loc.state.tokenName}</h2>
              <div class="send_form">
                <form class="send_inner_form">
                  <div class="form_flex">
                    <label>To</label>
                    <input
                      type="text"
                      placeholder="Please Enter Wallet Address"
                      onChange={(e) => {
                        setSendWalletAddress(e.target.value);
                        console.log("wallet address is---->", e.target.value);
                      }}
                    />
                  </div>
                  <div class="form_flex">
                    <label>Amount</label>
                    <input
                      type="text"
                      placeholder="Please Enter Amount"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </div>
                </form>
              </div>
              <button
                class="btn-danger"
                type="submit"
                onClick={handleSendTrxModal}
              >
                Send {loc.state.tokenName}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="transfer-page recieve_page rr_pg">
        <div class="container">
          <div class="page page--main" data-page="buy">
            <div class="page__content page__content--with-header page__content--with-bottom-nav padding_send">
              <div className="BackBtn" onClick={() => navigate(-1)}>
                <IoMdArrowRoundBack />
              </div>
              <div class="recieve_page mobile_login">
                <h5 class="text-purple">Send {loc.state.tokenName}</h5>
                {loading ? <Loader /> : ""}
                <div class="container p-0">
                  <div class="page page--main" data-page="buy">
                    <div class="page__content text-center page__content--with-header page__content--with-bottom-nav padding_send">
                      <div class="send_form">
                        <form class="send_inner_form multi-form m-0">
                          <div class="form_flex m-0 text-start">
                            <label class="text-start">To</label>
                            <input
                              type="text"
                              placeholder="Please Enter Wallet Address"
                              onChange={(e) => {
                                setSendWalletAddress(e.target.value);
                                console.log("wallet address is---->", e.target.value);
                              }}
                            />
                          </div>
                          <div class="form_flex m-0 mt-4 text-start">
                            <label class="text-start">Amount</label>
                            <input
                              type="text"
                              placeholder="Please Enter Amount"
                              // value={amount}
                              onChange={(e) => {
                                setAmount(e.target.value);
                              }}
                            />
                          </div>
                        </form>
                      </div>
                      <button
                        class="btn-danger"
                        type="submit"
                        onClick={handleSendTrxModal}
                      >
                        Send {loc.state.tokenName}
                      </button>
                    </div>
                  </div>
                </div>
              </div >
            </div></div></div>
      </section >




    </>
  );
};

export default SendCoin;
