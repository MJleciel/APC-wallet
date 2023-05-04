import React, { useState } from 'react';
import { generateTronAccount,getBalance,sendTrx } from './tronFunctions';

// import * as bip39 from 'bip39';
// import HDWalletProvider from '@truffle/hdwallet-provider';
import TronWeb from 'tronweb'
// import  bip32 from "bip32"

function CreateAccount() {
  // const [mnemonic, setMnemonic] = useState('');
  // const [privateKey, setPrivateKey] = useState('');
  // const [address, setAddress] = useState('');

  const [mnemonic, setMnemonic] = useState("");

  const [privateKey, setPrivateKey] = useState("d19f9f22b671fde41d56103bb816d2ae982a2d2b1ed4031311a47795614faa56");
  const [address, setAddress] = useState("TTkg76A7bTd8RPHtChd5KYVX8xz5WKHiUq");
  const [tokenAddress, setTokenAddress] = useState('THvucWaZoh9GKWUupmu2rBdM5dhbMKKHVM');
  const [tokenAmount, setTokenAmount] = useState('');
 

 

  const handleGenerateAccount = async () => {
    const tronAccount = await generateTronAccount();
    console.log("tron account is---->",tronAccount)
    setMnemonic(tronAccount.mnemonic);
    setPrivateKey(tronAccount.privateKey);
    setAddress(tronAccount.address);
  };
  const tronWeb = new TronWeb({
    fullHost: process.env.REACT_APP_TRON_FULL_NODE,
    solidityNode: process.env.REACT_APP_TRON_SOLIDITY_NODE,
    eventServer: process.env.REACT_APP_TRON_EVENT_SERVER,
    privateKey:privateKey
   
  });
  const addToken = async () => {

   try{
    const contractInstance = await tronWeb.contract().at(tokenAddress);
    console.log("contract instance is---->",contractInstance);
    const name = await contractInstance.name().call();
    const symbol = await contractInstance.symbol().call();
  
    console.log("name and symbol is---->",name,symbol,address);
    console.log("tronweb is----->",tronWeb);

const balance = await getBalance(address);
console.log(`Account balance: ${balance / 1000000} TRX`);
const toAddress = tronWeb.address.toHex("TL4BQt3yyCyhN35y1CXRJpiNRomtDnWQ9E");
const result1 = await contractInstance.transfer(toAddress, 100000000).send();
 
console.log("result is--->",result1)
    
    const fromAddress = tronWeb.address.toHex(tronWeb.address.fromPrivateKey(privateKey))
    console.log("to address nad from address are",toAddress,fromAddress);
    const tx = await tronWeb.transactionBuilder.triggerSmartContract(
      tokenAddress,
      'transfer',
      {},
      [
        { type: 'address', value: fromAddress },
        { type: 'address', value: toAddress },
        { type: 'uint256', value: 1 },
      ],
      { feeLimit: 100000000, callValue: 0 },
    );
  
    const signedTx = await tronWeb.trx.sign(tx.transaction);
    const result = await tronWeb.trx.sendRawTransaction(signedTx);
  
    console.log(`Imported ${name} (${symbol}) with transaction ID: ${result}`);
   }catch(e){
        console.log("error is",e);
   }

   
    // try {
    //   const tronWeb = new TronWeb({
    //     fullHost: 'https://api.shasta.trongrid.io',
    //     headers: { 'TRON-PRO-API-KEY': 'cba6aac5-d0f8-48d9-93ff-4887cad5cdd9' }, // replace with your own API key
    //   });
    //   // const privateKey = 'YOUR_PRIVATE_KEY_HERE'; // replace with your own private key
    //   const fromAddress = address;
    //   const contractAddress = tokenAddress;
    //   const tokenValue = tronWeb.toSun(tokenAmount);
    //   const tx = await tronWeb.transactionBuilder.triggerSmartContract(
    //     contractAddress,
    //     'transfer',
    //     {},
    //     [
    //       { type: 'address', value: fromAddress },
    //       { type: 'address', value: fromAddress },
    //       { type: 'uint256', value: tokenValue },
    //     ],
    //     { feeLimit: 100000000, callValue: 0 },
    //   );
    //   const signedTx = await tronWeb.trx.sign(tx, privateKey);
    //   const result = await tronWeb.trx.sendRawTransaction(signedTx);
    //   console.log(result);
    // } catch (error) {
    //   console.error(error);
    // }
  };
  const sendTron=async()=>{
   
    let toAddress = tronWeb.address.toHex("TL4BQt3yyCyhN35y1CXRJpiNRomtDnWQ9E");
    let res=await sendTrx(address,toAddress,tokenAmount,privateKey);
    console.log("res of send tron is",sendTron);
  }

  return (
    <div>
      <button onClick={handleGenerateAccount}>Generate Account</button>
      {mnemonic && (
        <div>
          <p>Mnemonic: {mnemonic}</p>
          <p>Private Key: {privateKey}</p>
          <p>Address: {address}</p>
        </div>
      )}

      <div>
      <label>
        Token Address:
        <input type="text" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
      </label>
      <br />
      <label>
        Token Amount:
        <input type="text" value={tokenAmount} onChange={(e) => setTokenAmount(e.target.value)} />
      </label>
      <br />
      <button onClick={sendTron}>Add Token</button>
    </div>
    </div>
  );
}

export default CreateAccount;