export const LoginComponent = {
    render: () => {
        return `
        <section id='login-component' class=" text-center mainHeight d-flex justify-content-center align-items-center ">
        <div>
            <h1 class="h2 mb-3 pageHeadingText"> أهلًا بيك صديقي الليدر المعوي العزيز <i
                    class="h4 fw-bolder fas fa-heart" style="color: #e85a71;"></i>
            </h1>
            <button class="btn btn-primary primaryBoxShadow" onclick="signIn()" id='fbSignInBtn'>
                <span class="h6">SIGN IN</span>
                <!-- <img src="./assets/images/fbSignInBtn.svg" /> -->
            </button>
            <div id='fbLoginSpinner' class="d-none spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p id='fbLoginMessage' class="d-none h6"></p>
        </div>
    </section>
        `
    }
}