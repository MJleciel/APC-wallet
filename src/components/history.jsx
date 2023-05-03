import { useContext, useState } from "react";
import appContext from "../context/globalContext";
import { useEffect } from "react";

const TransactionHistory = () => {
    let context = useContext(appContext);
    const [contractData, setContractData] = useState([]);

    const getTransactions=()=>{
        const options = { method: "GET", headers: { accept: "application/json" } };

        fetch(
            `https://api.shasta.trongrid.io/v1/accounts/${context.address}/transactions`,
            options
        )
            .then((response) => response.json())
            .then((response) => {

                const transactions = response.data;
                console.log("transaction data is--->", transactions);
                const contractTransactions = transactions.filter(txn => {
                    const { raw_data } = txn;
                    return raw_data.contract && raw_data.contract.length > 0;
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
            <div class="tab-pane fade active show" id="transection" role="tabpanel" aria-labelledby="transection-tab">
                <h2 class="text-white">Transaction history</h2>
                <table class="overview__table mobile_table mt-4 pt-1">
                    <thead>
                        <tr>
                            <th>Tx Hash</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contractData.map(contract => (

                            <tr key={contract.txID}>
                                <td>{contract.txID}</td>
                                <td>{contract.type}</td>
                                <td>{Number(contract.amount) / 1000000}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TransactionHistory;