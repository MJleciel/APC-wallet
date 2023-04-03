import axios from "axios"

let api_url = 'http://localhost:3000/api/'
// let api_url = "https://backend.apcblockchain.com/api/"

export const signin = (payload) => {
     return axios.post(api_url + 'user/signin', payload)
}

export const createWallet = (payload) => {
     return axios.post(api_url + 'user/create-wallet', payload)
}

export const getWallet = (id) => {
     return axios.get(api_url + `user/get-wallet/${id}`)
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