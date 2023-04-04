import TronWeb from 'tronweb'; 
import * as bip39 from 'bip39';

const fullNode = 'https://api.shasta.trongrid.io';
const solidityNode = 'https://api.shasta.trongrid.io';
const eventServer = 'https://api.shasta.trongrid.io';
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

export async function generateTronAccount(mnemonic = null) {
  // If no mnemonic is provided, generate a random one
  if (!mnemonic) {
    mnemonic = bip39.generateMnemonic();
  }

 
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
}

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
  console.log("address is---->",address);
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
   
    
    // Check if token exists
    if (symbol && decimals) {

      return {symbol,decimals,name};
      // Add token to database
      // ...
      // setTokenExists(true);
    } else {
      console.log("Token does not exist on Tron blockchain.");
    }
  } catch (error) {
    console.log("Error checking token:", error);
    alert(error);
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