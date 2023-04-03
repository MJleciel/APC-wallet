import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom';
// import { signin } from '../../services';
// import { toast } from 'react-toastify';
// import appContext from '../../context/globalContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getWallet, signin } from '../services/services';
import { toast } from 'react-toastify';
// import Swal from 'sweetalert2';

export const LoginPage = () => {
    //    const contextData = useContext(appContext)
    const [passwordType, setPasswordType] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm()
    let navigate = useNavigate()
  

    const onSubmit = data => {
        
        // contextData.setLoad(true)
        signin(data).then(response => {
            if (response.status === 200) {
                //     contextData.setLoad(false)
                //     contextData.setToken(response.data.data.token)
                //     localStorage.setItem('token',response.data.data.token)
                //     contextData.setId(response.data.data.id)
                    localStorage.setItem('id',response.data.data.id)
                //     contextData.setName(response.data.data.fullname)
                //     localStorage.setItem('name',response.data.data.fullname)
                //     contextData.setEmail(response.data.data.email)
                //     localStorage.setItem('email',response.data.data.email)
                //     contextData.setUserImg(response.data.data.user_img)
                //     localStorage.setItem('user-img',response.data.data.user_img)
                //     contextData.setIsActive(response.data.data.is_active)
                //     contextData.setUserLevel(response.data.data.level)
                //     localStorage.setItem("level",response.data.data.level)
                //     localStorage.setItem('is_active',response.data.data.is_active)
                //     contextData.setReferralCode(response.data.data.referral_code)
                //     localStorage.setItem('code',response.data.data.referral_code)
                //     contextData.setWalletBalance(response.data.data.wallet_balance)
                //     localStorage.setItem('balance',response.data.data.wallet_balance)
                //     contextData.setReferredBy(response.data.data.referred_by)
                //     localStorage.setItem('referrBy',response.data.data.referred_by)
                //     Swal.fire({
                //         "text":`${response.data.data.fullname} you are logged in successfully.`,
                //         "icon":"success",
                //         "timer":2500
                //     })
                getWallet(response.data.data.id).then(res=>{
                    if(res.status===200){
                        if(res.data.data.length==0){
                            navigate('/create-wallet')
                        }
                        else{
                            navigate('/overview')
                        }
                    }
                }).catch(err=>{
                    console.log(err.response.data.message)
                })
                
            }
        }).catch(err => {
            console.log(err);
            // contextData.setLoad(false)
            toast.error(err.response.data.message)
        })
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
        }
        else {
            setPasswordType("password")
        }
    }

    return (
        <>
            <section className='background-radial-gradient position-relative' style={{ minHeight: '100vh' }}>
                <Container fluid>
                    <Row className='d-flex justify-content-center align-items-center h-100'>
                        {/* <Col lg={6} className='mb-5 mb-lg-0' style={{ zIndex: '10' }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 85%' }}>
                                Lorem Ipsum is<br />
                                <span style={{ color: 'hsl(218, 81%, 75%' }}>simply dummy text</span>
                            </h1>
                            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%' }}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                                ab ipsum nisi dolorem modi. Quos?
                            </p>
                        </Col> */}
                        <Col lg={12} className=''>
                            <Card className='bg-glass mx-auto loginContainer overflow-hidden' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                                <Card.Body className='px-3 py-3 px-md-4'>
                                    <Form className='w-100' onSubmit={handleSubmit(onSubmit)} >
                                        <div className="d-flex align-items-center mb-3 pb-1 justify-content-center">
                                            <span class="h1 fw-bold mb-0 w-25">
                                                <img className="img-fluid" src={require("../assets/images/logo.png")} alt="" />
                                            </span>
                                        </div>
                                        <h5 className="fw-normal fw-bold mb-3 pb-3 text-center" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                                        <Form.Group className="mb-4 main-div">
                                            <Form.Label className="mb-1">Login ID</Form.Label>
                                            <Form.Control type="text" {...register('code', { required: "Referral code is required.", setValueAs: val => val.trim() })} />
                                            {errors.code && <span className='error-msg'>{errors.code.message}</span>}
                                        </Form.Group>
                                        <Form.Group className="mb-2 form-outline position-relative password_field main-div">
                                            <Form.Label for="form3Example1" className="mb-1">Password</Form.Label>
                                            <Form.Control id="form3Example1" type={passwordType} minLength={6} {...register("password", { required: "Password is required." })} />
                                            <span className='toggle_eye' onClick={() => togglePassword()}>{passwordType === "password" ? <FaEye /> : <FaEyeSlash />}</span>
                                            {errors.password && <span className='error-msg'>{errors.password.message}</span>}
                                        </Form.Group>
                                        {/* {<div className='d-flex justify-content-end '>
                                            <Button className='bg-transparent border-0 text-dark txt-btn frgt-link'>
                                                Forgot Password?
                                            </Button>
                                        </div>} */}
                                        {/* <Link to='/forgot' className="frgt-link">Forgot Password</Link> */}
                                        <Row className="d-flex justify-content-center mt-4">
                                            <Col md={6} className=''>
                                                <Button type="submit" className="w-100 sbmt-bttn">
                                                    Sign in
                                                </Button>
                                            </Col>
                                        </Row>
                                        {/* <Row className='mt-4'>
                                            <div className="d-flex justify-content-center align-item-center">
                                                <h5 className="fs-6 fw-normal text-center d-flex align-items-center">Don't have an account? <Button className='ps-1 bg-transparent text-dark fw-bold border-0 txt-btn'
                                                    onClick={() => navigate('/signup')}
                                                >Sign up Now</Button></h5>
                                            </div>
                                        </Row> */}
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>


        // <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        //     <div class="row gx-lg-5 align-items-center mb-5">
        //         <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
        //             <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
        //                 The best offer <br />
        //                 <span style="color: hsl(218, 81%, 75%)">for your business</span>
        //             </h1>
        //             <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
        //                 Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        //                 Temporibus, expedita iusto veniam atque, magni tempora mollitia
        //                 dolorum consequatur nulla, neque debitis eos reprehenderit quasi
        //                 ab ipsum nisi dolorem modi. Quos?
        //             </p>
        //         </div>

        //         <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
        //             <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
        //             <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

        //             <div class="card bg-glass">
        //                 <div class="card-body px-4 py-5 px-md-5">
        //                     <form>

        //                         <div class="row">
        //                             <div class="col-md-6 mb-4">
        //                                 <div class="form-outline">
        //                                     <input type="text" id="form3Example1" class="form-control" />
        //                                     <label class="form-label" for="form3Example1">First name</label>
        //                                 </div>
        //                             </div>
        //                             <div class="col-md-6 mb-4">
        //                                 <div class="form-outline">
        //                                     <input type="text" id="form3Example2" class="form-control" />
        //                                     <label class="form-label" for="form3Example2">Last name</label>
        //                                 </div>
        //                             </div>
        //                         </div>


        //                         <div class="form-outline mb-4">
        //                             <input type="email" id="form3Example3" class="form-control" />
        //                             <label class="form-label" for="form3Example3">Email address</label>
        //                         </div>


        //                         <div class="form-outline mb-4">
        //                             <input type="password" id="form3Example4" class="form-control" />
        //                             <label class="form-label" for="form3Example4">Password</label>
        //                         </div>


        //                         <div class="form-check d-flex justify-content-center mb-4">
        //                             <input class="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
        //                             <label class="form-check-label" for="form2Example33">
        //                                 Subscribe to our newsletter
        //                             </label>
        //                         </div>


        //                         <button type="submit" class="btn btn-primary btn-block mb-4">
        //                             Sign up
        //                         </button>


        //                         <div class="text-center">
        //                             <p>or sign up with:</p>
        //                             <button type="button" class="btn btn-link btn-floating mx-1">
        //                                 <i class="fab fa-facebook-f"></i>
        //                             </button>

        //                             <button type="button" class="btn btn-link btn-floating mx-1">
        //                                 <i class="fab fa-google"></i>
        //                             </button>

        //                             <button type="button" class="btn btn-link btn-floating mx-1">
        //                                 <i class="fab fa-twitter"></i>
        //                             </button>

        //                             <button type="button" class="btn btn-link btn-floating mx-1">
        //                                 <i class="fab fa-github"></i>
        //                             </button>
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default LoginPage