import axios from "axios"
import { useContext } from "react"
import appContext from "../context/globalContext"

let api_url = 'http://localhost:3008/api/'
// let api_url = "https://bwallet.apcblockchain.com/api/"


const header=(token,id)=> {return {"Authorization":`Bearer ${token}`,'userId':id}} 

export const create = (payload) => {
     return axios.post(api_url + 'user/create-user', payload)
}

export const signin = (payload) => {
     return axios.post(api_url + 'user/signin', payload)
}

export const createWallet = (payload) => {
     return axios.post(api_url + 'user/create-wallet', payload);
}

export const getWallet = (id) => {
     return axios.get(api_url + `wallet/get-wallet/${id}`)
}

export const addToken = (payload) => {
     return axios.post(api_url + `user/add-token`,payload);
}

export const getTokens = (id,token) => {
     return axios.get(api_url + `user/get-tokens/${id}`,{
          headers:header(token,id)
     });
}
export const getPrivateKey = (payload) => {
     return axios.post(api_url + `user/getPrivateKey`,payload);
}

export const getTokenPrice = (payload) => {
     return axios.post(api_url + `wallet/get-price`,payload);
}

export const getTokenImage = (payload) => {
    
     return axios.post(api_url + `wallet/get-image`,payload);
}