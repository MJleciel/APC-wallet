const TermServices = () => {
    return (
        <>
            <section class="site_section d-flex align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-md-10 col-sm-12 col-12 text-left text-white site_scale">
                            <div class="text-center  mb-4">
                                <img src={require("../assets/images/apc-logo.png")} alt="" width="200px"/>
                            </div>
                            <div class="wallet_note text-center">
                                <div class="walet_title px-3 pt-4">
                                    <h3 class="m-0">Coint terms of Service</h3>
                                </div>


                                <div class="phrase_box my-3 d-block text-left" style={{"height":"220px","overflow-y":"scroll","overflow-x":"hidden"}}>
                                    <h3 class="text-start">LEGAL DISCLAIMER</h3>
                                    <p class="m-0 text-start">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                        has been the industry's standard dummy text ever since the 1500s, when an unknown
                                        printer took a galley of type and scrambled it to make a type specimen book. It has
                                        survived not only five centuries, but also the leap into electronic typesetting,
                                        remaining essentially unchanged. It was popularised in the 1960s with the release of
                                        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                        publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>
                                <hr class="m-0" />
                                <div class="submit_sec p-3">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12 col-sm-12 text-lg-center text-md-center text-center">
                                            <a href="#" class="btn btn-primary w-auto">Reject</a>
                                            <a href="#" class="btn btn-primary w-auto transparent_button">Accept</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TermServices;