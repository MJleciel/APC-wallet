import axios from "axios"

let api_url = 'http://localhost:3008/api/'
// let api_url = "https://bwallet.apcblockchain.com/api/"

export const create = (payload) => {
     return axios.post(api_url + 'user/create-user', payload)
}

export const createWallet = (payload) => {
     return axios.post(api_url + 'user/create-wallet', payload)
}

export const getWallet = (id) => {
     return axios.get(api_url + `wallet/get-wallet/${id}`)
}

export const addToken = (payload) => {
     return axios.post(api_url + `user/add-token`,payload)
}

export const getTokens = (id) => {
     return axios.get(api_url + `user/get-tokens/${id}`)
}
export const getPrivateKey = (payload) => {
     return axios.post(api_url + `user/getPrivateKey`,payload)
}