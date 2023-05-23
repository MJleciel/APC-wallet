import { useContext, useState } from "react";
import appContext from "../context/globalContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TransactionHistory = () => {
    let context = useContext(appContext);
    const [contractData, setContractData] = useState([]);
    let navigate = useNavigate()
    const getTransactions = () => {
        const options = { method: "GET", headers: { accept: "application/json" } };

        fetch(
            `${process.env.REACT_APP_TRON_FULL_NODE}/v1/accounts/${context.address}/transactions`,
            options
        )
            .then((response) => response.json())
            .then((response) => {

                const transactions = response.data;
                console.log("transaction data in history page is--->", transactions);
                const contractTransactions = transactions.filter(txn => {
                    const { raw_data } = txn;
                    return raw_data?.contract && raw_data?.contract?.length > 0;
                });

                const formattedData = contractTransactions.map(txn => {
                    const { txID, raw_data } = txn;
                    const contract = raw_data.contract[0];

                    let type = contract?.type

                    const amount = contract?.parameter?.value?.amount;

                    return { txID, type, amount };
                });


                setContractData(formattedData);
            })
            .catch((err) => console.error(err));
    }
    useEffect(() => {
        getTransactions()
    }, [context.address]);
    return (
        <>

            <section class="transection_history w-100">
                <div class="container">
                    <div class="row">
                        <div class="col-12 mobile_add_token">
                            <div class="top-wallet">
                                <div className="BackBtn arrow_back" onClick={() => navigate(-1)}>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"></path></svg>
                                </div>
                            </div>
                            <div class="mt-5 pt-1 crypto_tabs">
                                <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="tokens-tab" data-bs-toggle="tab" data-bs-target="#tokens" type="button" role="tab" aria-controls="tokens" aria-selected="true">Transaction history</button>
                                    </li>
                                </ul>
                                <div class="tab-pane fade show active" id="tokens" role="tabpanel" aria-labelledby="tokens-tab">
                                    <div class="Transaction_all">
                                        {contractData.map(contract => (
                                            <div class="transaction_row">
                                                <div class="trans_col">
                                                    <h6>Send</h6>
                                                    <p>To: {contract.txID.substring(0,5)}...{contract.txID.substring(contract.txID.length-5)}</p>
                                                </div>
                                                <div class="trans_col">
                                                    <h6>{Number(contract.amount) / 1000000} TRX</h6>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* <table class="portfolitable">
                                        <thead>
                                            <tr>
                                                <th class="p-0">Tx Hash</th>
                                                <th class="p-0">Type</th>
                                                <th class="p-0">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contractData.map(contract => (

                                                <tr key={contract.txID}>
                                                    <td><h3 class="text-center m-0">{(contract.txID).slice(0,5)}...{(contract.txID).slice(0,5)}</h3></td>
                                                    <td><h3 class="text-center m-0">{contract.type}</h3></td>
                                                    <td><h3 class="text-center m-0">{Number(contract.amount) / 1000000}</h3></td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TransactionHistory;