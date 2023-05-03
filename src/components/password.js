import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { create } from "../services/services";
import { useContext } from "react";
import appContext from "../context/globalContext";
import { toast } from "react-toastify";

const Password = () => {
    let navigate = useNavigate()
    let context = useContext(appContext)
    let loc = useLocation()
    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    const onSubmit = data => {
        console.log(loc);
        const payload = {
            email: data.email,
            password: data.password,
            address: loc.state.address,
            key: loc.state.privateKey
        }
        create(payload).then(res => {
            if (res.status == 200) {
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
                navigate('/select')
            }
        }).catch(err => toast.error(err.response.data.message))
    }

    return (
        <>
            <div class="d-lg-block d-md-block d-none w-100">
                <section class="site_section d-flex align-items-center sidebar-width pass_word">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-7 col-md-10 col-sm-12 col-12 text-left text-white site_scale">
                                <div class="text-center  mb-4">
                                    <img src={require("../assets/images/apc-logo.png")} alt="" width="250px" />
                                </div>
                                <div class="wallet_note pass____words">
                                    <div class="walet_title px-3">
                                        <h3 class="m-0">Create Account</h3>
                                    </div>
                                    <div class="notes px-3">
                                        <h5>Aarohi Partner is required you to perform a secure action</h5>
                                    </div>
                                    <div class="password_inner">
                                        <div class="advance_setting p-3">
                                            <div class="row">
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                                        <div class="form-field mb-2">
                                                            <input type="email" id="secure" placeholder="Email" {...register('email', { required: "Email is required" })} />
                                                        </div>
                                                        {errors.email && <span>{errors.email.message}</span>}
                                                    </div>
                                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                                        <div class="form-field mb-2">
                                                            <input type="password" id="secure" placeholder="Password" {...register('password', { required: "Password is required" })} />
                                                        </div>
                                                        {errors.password && <span>{errors.password.message}</span>}
                                                    </div>
                                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                                        <div class="form-field mb-2 last-input">
                                                            <input type="password" id="secure" placeholder="Repeat Password" {...register('confirmPassword', { required: "Confirm password is required", validate: val => val === watch("password") || "Password did'nt match." })} />
                                                        </div>
                                                        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                                                    </div>

                                                    <div class="submit_sec p-3">
                                                        <div class="row">
                                                            <div class="col-lg-3 col-md-3 col-3 d-flex align-items-center mb-lg-0 mb-md-0 mb-4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ff0000"
                                                                    class="bi bi-file-earmark-lock-fill" viewBox="0 0 16 16">
                                                                    <path
                                                                        d="M7 7a1 1 0 0 1 2 0v1H7V7zM6 9.3c0-.042.02-.107.105-.175A.637.637 0 0 1 6.5 9h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 12h-3a.637.637 0 0 1-.395-.125C6.02 11.807 6 11.742 6 11.7V9.3z" />
                                                                    <path
                                                                        d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0z" />
                                                                </svg>
                                                            </div>
                                                            <div class="col-lg-9 col-md-9 col-9 text-lg-end text-md-end text-left">
                                                                <button class="btn btn-primary w-auto" type="button" onClick={() => navigate(-1)}>Cancel</button>
                                                                <button class="btn  w-auto btn-primary " type="submit">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div class="d-lg-none d-md-none d-block w-100">
                <section class="site_section mobile_add_token text-white mobile_login d-flex align-items-center sidebar-width pass_word">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-7 col-md-10 col-sm-12 col-12 text-left text-white site_scale">
                                <div class="text-center  mb-4">
                                    <img src={require("../assets/images/apc-logo.png")} alt="" width="250px" />
                                </div>
                                <div class="wallet_note w-100 wallet_mobile">
                                    <div class="walet_title px-3">
                                        <h3 class="m-0">Create Account</h3>
                                    </div>
                                    <div class="notes px-3">
                                        <h5>Aarohi Partner is required you to perform a secure action</h5>
                                    </div>
                                    <div class="password_inner">
                                        <div class="advance_setting p-3">
                                            <div class="row">
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                                        <div class="form-field mb-2">
                                                            <input type="email" id="secure" placeholder="Email" {...register('email', { required: "Email is required" })} />
                                                        </div>
                                                        {errors.email && <span>{errors.email.message}</span>}
                                                    </div>
                                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                                        <div class="form-field mb-2">
                                                            <input type="password" id="secure" placeholder="Password" {...register('password', { required: "Password is required" })} />
                                                        </div>
                                                        {errors.password && <span>{errors.password.message}</span>}
                                                    </div>
                                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                                        <div class="form-field mb-2 last-input">
                                                            <input type="password" id="secure" placeholder="Repeat Password" {...register('confirmPassword', { required: "Confirm password is required", validate: val => val === watch("password") || "Password did'nt match." })} />
                                                        </div>
                                                        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                                                    </div>

                                                    <div class="submit_sec p-3">
                                                        <div class="row">
                                                            <div class="col-lg-3 col-md-3 col-2 d-flex align-items-center mb-lg-0 mb-md-0 mb-0 d-flex align-items-center p-0">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fff"
                                                                    class="bi bi-file-earmark-lock-fill" viewBox="0 0 16 16">
                                                                    <path
                                                                        d="M7 7a1 1 0 0 1 2 0v1H7V7zM6 9.3c0-.042.02-.107.105-.175A.637.637 0 0 1 6.5 9h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 12h-3a.637.637 0 0 1-.395-.125C6.02 11.807 6 11.742 6 11.7V9.3z" />
                                                                    <path
                                                                        d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0z" />
                                                                </svg>
                                                            </div>
                                                            <div class="col-lg-9 col-md-9 col-10 text-lg-end text-md-end text-left d-flex p-0">
                                                                <button class="btn-danger me-2 mt-0" type="button" onClick={() => navigate(-1)}>Cancel</button>
                                                                <button class="btn-danger mt-0" type="submit">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>)
}

export default Password;