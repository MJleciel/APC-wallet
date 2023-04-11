import { useEffect, useState } from "react"
import appContext from "./globalContext"

const ContextState = (props) => {
    const [token, setToken] = useState('')
    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [key, setKey] = useState('')
    const [load, setLoad] = useState(false)
   

    const value = {
        token, setToken,
        id, setId,
        email, setEmail,
        address, setAddress,
        key, setKey,
        load, setLoad,
        
    }

    useEffect(() => {
        if (localStorage.getItem('id')) {
            setToken(localStorage.getItem('token'))
            setId(localStorage.getItem('id'))
            setEmail(localStorage.getItem('email'))
            setAddress(localStorage.getItem('address'))
            setKey(localStorage.getItem('key'))
        }

    }, [])

    return (
        <appContext.Provider value={value}>
            {props.children}
        </appContext.Provider>
    )
}

export default ContextState;