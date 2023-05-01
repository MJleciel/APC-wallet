import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom';
// import { signin } from '../../services';
// import { toast } from 'react-toastify';
// import appContext from '../../context/globalContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { getWallet, signin } from '../services/services';
import { toast } from 'react-toastify';
import appContext from '../context/globalContext';
import { signin } from '../services/services';
// import Swal from 'sweetalert2';

export const LoginPage = () => {
    const context = useContext(appContext)
    const [passwordType, setPasswordType] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm()
    let navigate = useNavigate()


    // const onSubmit = data => {

    //     // contextData.setLoad(true)
    //     signin(data).then(response => {
    //         if (response.status === 200) {
    //             //     contextData.setLoad(false)
    //             //     contextData.setToken(response.data.data.token)
    //             //     localStorage.setItem('token',response.data.data.token)
    //             //     contextData.setId(response.data.data.id)
    //             localStorage.setItem('id', response.data.data.id)
    //             //     contextData.setName(response.data.data.fullname)
    //             //     localStorage.setItem('name',response.data.data.fullname)
    //             //     contextData.setEmail(response.data.data.email)
    //             //     localStorage.setItem('email',response.data.data.email)
    //             //     contextData.setUserImg(response.data.data.user_img)
    //             //     localStorage.setItem('user-img',response.data.data.user_img)
    //             //     contextData.setIsActive(response.data.data.is_active)
    //             //     contextData.setUserLevel(response.data.data.level)
    //             //     localStorage.setItem("level",response.data.data.level)
    //             //     localStorage.setItem('is_active',response.data.data.is_active)
    //             //     contextData.setReferralCode(response.data.data.referral_code)
    //             //     localStorage.setItem('code',response.data.data.referral_code)
    //             //     contextData.setWalletBalance(response.data.data.wallet_balance)
    //             //     localStorage.setItem('balance',response.data.data.wallet_balance)
    //             //     contextData.setReferredBy(response.data.data.referred_by)
    //             //     localStorage.setItem('referrBy',response.data.data.referred_by)
    //             //     Swal.fire({
    //             //         "text":`${response.data.data.fullname} you are logged in successfully.`,
    //             //         "icon":"success",
    //             //         "timer":2500
    //             //     })
    //             getWallet(response.data.data.id).then(res => {
    //                 if (res.status === 200) {
    //                     if (res.data.data.length == 0) {
    //                         navigate('/create-wallet')
    //                     }
    //                     else {
    //                         navigate('/overview')
    //                     }
    //                 }
    //             }).catch(err => {
    //                 console.log(err.response.data.message)
    //             })

    //         }
    //     }).catch(err => {
    //         console.log(err);
    //         // contextData.setLoad(false)
    //         toast.error(err.response.data.message)
    //     })
    // }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
        }
        else {
            setPasswordType("password")
        }
    }

    const onSubmit = data => {
        const payload = {
            email: data.email,
            password: data.password
        }
        signin(payload).then(res => {
            if (res.status === 200) {
                context.setToken(res.data.data.token)
                context.setId(res.data.data.id)
                context.setEmail(res.data.data.email)
                context.setAddress(res.data.data.wallet_address)
                context.setKey(res.data.data.private_key)
                localStorage.setItem('token', res.data.data.token)
                localStorage.setItem('id', res.data.data.id)
                localStorage.setItem('email', res.data.data.email)
                localStorage.setItem('address', res.data.data.wallet_address)
                localStorage.setItem('key', res.data.data.private_key)
                navigate('/overview')
            }
        }).catch(err => toast.error(err.response.data.message))
    }

    return (
        <>

            <div class="d-lg-block d-md-block d-none w-100">
                <section class="klevar-extention text-white">
                    <div class="container">
                        <div class="row justify-content-center text-center">
                            <div class="col-lg-8 col-md-8 col-sm-12">
                                <div class="klevar-inner multi-connect login_page">
                                    <div class="logo-klevar"><img src={require("../assets/images/apc-logo.png")} /></div>
                                    <p class="connects"> Stay Multi-Connected Wherever you go</p>
                                    <form class="multi-form" onSubmit={handleSubmit(onSubmit)}>
                                        <div class="input-form">
                                            <label>Email</label>
                                            <input type="email" id="email" placeholder="Insert Your Email" {...register('email', { required: "Email is required." })} />
                                            {errors.email && <span>{errors.email.message}</span>}
                                        </div>
                                        <div class="input-form">
                                            <label>Password</label>
                                            <input type="password" id="email" placeholder="Insert Your Password" {...register('password', { required: 'Password is required.' })} />
                                            <i class="far fa-eye"></i>
                                            {errors.password && <span>{errors.password.message}</span>}
                                        </div>
                                        <button type="submit" class="btn-danger" >Unlock</button>
                                    </form>
                                    <p>You Cannot login? Try another method</p>
                                    <div class="wallet-links">
                                        <a style={{ cursor: "pointer" }} onClick={() => navigate('/create-wallet')} class="text-danger">New User? Create account </a>
                                        {/* <span class="or">Or </span>
                                    <a href="#" class="text-danger">Import Wallet </a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div class="d-lg-none d-md-none d-block w-100">
                
            <section class="klevar-extention text-white mobile_login d-flex align-items-center">
                    <div class="container">
                        <div class="row justify-content-center text-center">
                            <div class="col-lg-8 col-md-8 col-sm-12">
                                <div class="klevar-inner multi-connect login_page">
                                    <div class="logo-klevar"><img src={require("../assets/images/apc-logo.png")} /></div>
                                    <p class="connects"> Stay Multi-Connected Wherever you go</p>
                                    <form class="multi-form" onSubmit={handleSubmit(onSubmit)}>
                                        <div class="input-form">
                                            <label>Email</label>
                                            <input type="email" id="email" placeholder="Insert Your Email" {...register('email', { required: "Email is required." })} />
                                            {errors.email && <span>{errors.email.message}</span>}
                                        </div>
                                        <div class="input-form">
                                            <label>Password</label>
                                            <input type="password" id="email" placeholder="Insert Your Password" {...register('password', { required: 'Password is required.' })} />
                                            <i class="far fa-eye"></i>
                                            {errors.password && <span>{errors.password.message}</span>}
                                        </div>
                                        <button type="submit" class="btn-danger" >Unlock</button>
                                    </form>
                                    <p>You Cannot login? Try another method</p>
                                    <div class="wallet-links">
                                        <a style={{ cursor: "pointer" }} onClick={() => navigate('/create-wallet')} class="text-danger">New User? Create account </a>
                                        {/* <span class="or">Or </span>
                                    <a href="#" class="text-danger">Import Wallet </a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>


    )
}
export default LoginPage