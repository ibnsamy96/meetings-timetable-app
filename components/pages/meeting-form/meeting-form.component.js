export const MeetingFormComponent = {
    render: () => {
        return `
        <section id='meeting-form-component' class="">
            <h1 class="h2 mb-3 pageHeadingText">أضف اجتماع</h1>
            
            <button class="btn fbBtn primaryBoxShadow" onclick="signIn()" id='fbSignInBtn'>
                <span class="h6">SIGN IN</span>
                <!-- <img src="./assets/images/fbSignInBtn.svg" /> -->
            </button>
            <div id='fbLoginSpinner' class="d-none spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p id='fbLoginMessage' class="d-none h6"></p>
    </section>
        `
    }
}