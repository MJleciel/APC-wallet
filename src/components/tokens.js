import { Table } from "react-bootstrap";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import { getTokens } from "../services/services";

const TokenList = () => {
    const [tokens,setToken]=useState([])
    const getUserTokens=()=>{
            getTokens(localStorage.getItem('id')).then(res=>{
                if(res.status===200){
                    // console.log(res.data.data);
                    setToken(res.data.data)
                }
            }).catch(err=>{
                console.log(err);
            })
        }


    useEffect(()=>{
        getUserTokens()
    },[])



    return (
    <>
    <Sidebar />
        <section className='scn-1 bg-white p-3 rounded-2'>
            <h5 className='light-blck heading'>Tokens</h5>
            <Table striped borderless hover variant='light' className='p-3 d_table mt-4' responsive>
                <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>Token address</th>
                        {/* <th>Amount</th> */}
                    </tr>
                </thead>
                <tbody>
                    {tokens.length!==0 && tokens.map((token,index)=>
                        <tr>
                            <td>1</td>
                            <td>{token.token_address}</td>
                            {/* <td>{index+1}</td> */}
                        {/* <td colSpan={5} className='fs-6 text-center py-3'>
                            No data available in table
                        </td> */}
                    </tr>
                    )}
                    
                </tbody>
            </Table>
        </section>
    </>)
}

export default TokenList;