import {
    getSharedComponentCode
} from "../../../components-manager.js";

export const LoginComponent = {
    render: () => {
        return `
        <section id='login-component' class=" text-center d-flex justify-content-center align-items-center mt-4 pb-4">
        <div>
            <h1 class="h2 mb-3 pageHeadingText"> أهلًا بيك صديقي الليدر المعوي العزيز <i
                    class="h4 fw-bolder fas fa-heart" style="color: #e85a71;"></i>
            </h1>
            ${getSharedComponentCode('button', {btnData:{
                id: 'fbSignInBtn',
                activationMethod: 'signIn()',
                content: 'SIGN IN',
                buttonColorClass:'btn-primary',
                buttonClasses:'ms-2',
                spanClasses:'h6',
                buttonStyle: '',
                spanStyle: ''
            }})}
 
            <div id='fbLoginSpinner' class="d-none spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p id='fbLoginMessage' class="d-none h6"></p>
        </div>
    </section>
        `
    }
}