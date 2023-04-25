import TronWeb from 'tronweb'; 
import * as bip39 from 'bip39';
// import { ethers } from "ethers";

// const AbiCoder = ethers.utils.AbiCoder;
// const ADDRESS_PREFIX_REGEX = /^(41)/;
// const ADDRESS_PREFIX = "41";

const fullNode = 'https://api.shasta.trongrid.io';
const solidityNode = 'https://api.shasta.trongrid.io';
const eventServer = 'https://api.shasta.trongrid.io';
export  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);
const tronWebMainnet = new TronWeb(fullNode, solidityNode, eventServer);

const tronWebMainet = new TronWeb(fullNode, solidityNode, eventServer);

export async function generateTronAccount(mnemonic = null) {
  // If no mnemonic is provided, generate a random one
  if (!mnemonic) {
    mnemonic = bip39.generateMnemonic();
  }
try{
  const privateKey = await TronWeb.fromMnemonic(mnemonic);
  let c=await TronWeb.fromMnemonic(mnemonic);
  console.log("c isssssiiss------>",c);
  console.log("private key is",privateKey);
  let validprivatekey=isValidTronPrivateKey(privateKey.privateKey);
  console.log("valid private kys is---->",validprivatekey);
  
  
  
    console.log("address is----->",privateKey.address);
  
    return {
      mnemonic: mnemonic,
      privateKey: validprivatekey,
      address: privateKey.address
    };
}catch(e){
  console.log("error is",e.Error)
  alert(e)
}
 
 


}

// export async function decodeParams(types, output, ignoreMethodHash) {
//   if (!output || typeof output === "boolean") {
//     ignoreMethodHash = output;
//     output = types;
//   }

//   if (ignoreMethodHash && output.replace(/^0x/, "").length % 64 === 8)
//     output = "0x" + output.replace(/^0x/, "").substring(8);

//   const abiCoder = new AbiCoder();

//   if (output.replace(/^0x/, "").length % 64)
//     throw new Error(
//       "The encoded string is not valid. Its length must be a multiple of 64."
//     );
//   return abiCoder.decode(types, output).reduce((obj, arg, index) => {
//     if (types[index] == "address")
//       arg = ADDRESS_PREFIX + arg.substr(2).toLowerCase();
//     obj.push(arg);
//     return obj;
//   }, []);
// }

function isValidTronPrivateKey(privateKey) {
  try {
    // Remove the "0x" prefix if present
    if (privateKey.startsWith("0x")) {
      privateKey = privateKey.slice(2);
    }
    return privateKey
    
    
   
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getBalance(address) {
  console.log("address is---->",address,await tronWeb.trx);
  let balance = (await tronWeb.trx.getBalance(address))/1000000;

  return balance;
}


export async function sendTrx(data) {

  console.log("send trx function is called",data);
  let tronWeb1 = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',
    solidityNode: 'https://api.shasta.trongrid.io',
    eventServer: 'https://api.shasta.trongrid.io',
    privateKey:data.privateKey
   
  });
  console.log("11111111")
  if(data.tokenAddress=="0Tx000"){
    console.log("in TRX");
    const fromAccount = await tronWeb1.trx.getAccount(data.fromAddress);
    console.log("22222222")
    const fromBalance = fromAccount.balance;
    console.log("3333333333333")
    if (fromBalance < parseFloat((data.amount)*1000000)) {
      alert("Insufficient Balance")
      throw new Error('Insufficient balance');
    }
    try{
      const transaction = await tronWeb1.transactionBuilder.sendTrx(data.toAddress, parseFloat((data.amount)*1000000), data.fromAddress)
      console.log("44444444",transaction)
      console.log("44444444",transaction.txID)
     
      const signedTransaction = await tronWeb1.trx.sign(transaction);
      console.log("555555",signedTransaction);
      const result = await tronWeb1.trx.sendRawTransaction(signedTransaction);
      console.log("66666666",result);
      
      // let a=await tronWeb.trx.getUnconfirmedTransactionInfo(transaction.txID);
      // console.log("status is------>",a);
      
      console.log(`Transaction ID: ${result.txid}`);
      return result;
    }catch(e){
         console.log("error is",e)
    }
  }else{
    console.log("in trc20")
    try{
      const contract = await tronWeb1.contract().at(data.tokenAddress);
      const amountWithDecimals = data.amount * Math.pow(10, 6);

      const transaction = await contract.transfer(data.toAddress, amountWithDecimals).send({
        shouldPollResponse: true,
        feeLimit: 1e8, // Set the maximum amount of TRX to spend on transaction fees
      });
      
      return transaction;

    }catch(e){
      console.log("error is--->",e);
      return e;

    }
    

  }
  

 
}

export const fetchTokenData = async (tokenAddress,privateKey) => {
  let tronWeb2 = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',
    solidityNode: 'https://api.shasta.trongrid.io',
    eventServer: 'https://api.shasta.trongrid.io',
    privateKey:privateKey
   
  });
  console.log("private key is---->",privateKey);
  try {
    console.log("token address is----->",tokenAddress);
    const contract = await tronWeb2.contract().at(tokenAddress);
    console.log("contract is---->",contract);
    const name=await contract.name().call();

    console.log("name decimal and symbol is---->",name);
   
    const symbol = await contract.symbol().call();
    console.log("symbol is---->",symbol);
    const decimals = await contract.decimals().call();
   
    
   
    if (symbol && decimals) {
     

      return {symbol,decimals,name};
     
      // setTokenExists(true);
    } else {
      console.log("Token does not exist on Tron blockchain.");
    }
  } catch (error) {
    console.log("Error checking token:", error);
    // alert(error);
  }
};

export async function fetchTransactionHistory(address) {
  const transactions = await tronWeb.trx.getTransactionsRelated(address, "all");
  const formattedTransactions = transactions.map((transaction) => ({
    hash: transaction.txID,
    from: transaction.raw_data.contract[0].parameter.value.owner_address,
    to: transaction.raw_data.contract[0].parameter.value.to_address,
    value: tronWeb.fromSun(transaction.raw_data.contract[0].parameter.value.amount),
    timestamp: new Date(transaction.raw_data.timestamp),
  }));
  return formattedTransactions;
}