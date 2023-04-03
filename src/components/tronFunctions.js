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


export async function sendTrx(fromAddress, toAddress, amount,privateKey) {

  let tronWeb1 = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',
    solidityNode: 'https://api.shasta.trongrid.io',
    eventServer: 'https://api.shasta.trongrid.io',
    privateKey:privateKey
   
  });
  const fromAccount = await tronWeb1.trx.getAccount(fromAddress);
  const fromBalance = fromAccount.balance;
  
  if (fromBalance < amount) {
    throw new Error('Insufficient balance');
  }

  const transaction = await tronWeb1.transactionBuilder.sendTrx(toAddress, amount, fromAddress);
  const signedTransaction = await tronWeb1.trx.sign(transaction);
  const result = await tronWeb1.trx.sendRawTransaction(signedTransaction);
  
  console.log(`Transaction ID: ${result.txid}`);
}
