import {
    facebookSignInUsingPopup,
    facebookSignInUsingRedirect,
    facebookSignOut,
} from "./auth.js";
import {
    getMeetings,
    getTeams,
    postLoginInfo
} from "./database.js";
import {
    getPageComponentCode,
    getSharedComponentCode
} from "./components-manager.js";

let isSignedIn
let userToken


const autoSignIn = () => {
    document.querySelector('header').innerHTML = getSharedComponentCode('navbar')
    // TODO uncomment next line to enable the ui
    // document.querySelector('main').innerHTML = getPageComponentCode('login')

    const fbLoginSpinner = document.querySelector('#fbLoginSpinner')
    const fbSignInBtn = document.querySelector('#fbSignInBtn')

    fbLoginSpinner.classList.remove('d-none')
    fbSignInBtn.classList.add('d-none')

    console.log('function loaded');
    firebase.auth().onAuthStateChanged((user) => {

        if (user) {
            console.log('wow');
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const userId = user.uid;
            console.log(user);
            userToken = user.ya;
            // console.log(uid);
            postLoginInfo(user, userToken)
            getTeams(userToken)
            getMeetings(userToken)
            console.log('signed in successfully - auto check');
            console.log(userToken);
            // ...
        } else {
            // User is signed out
            // ...
            console.log('sign in failed - auto check');
        }
        isSignedIn = !!user
        console.log(isSignedIn);
        // TODO uncomment next line to enable the ui
        // updateLoggingUI()
    });
}
window.addEventListener('load', autoSignIn)


window.signIn = async () => {
    const fbLoginSpinner = document.querySelector('#fbLoginSpinner')
    const fbSignInBtn = document.querySelector('#fbSignInBtn')

    fbLoginSpinner.classList.remove('d-none')
    fbSignInBtn.classList.add('d-none')
    // let data
    console.log(window.innerWidth);
    // let state, credential
    if (window.innerWidth > 750) {
        var {
            state,
            userToken,
            errorMessage
        } = await facebookSignInUsingPopup()
        console.log(state)
        console.log(userToken)
        console.log(errorMessage)

        isSignedIn = state
        updateLoggingUI(errorMessage)

    } else {
        facebookSignInUsingRedirect()
    }


}

window.signOut = async () => {
    const fbLoginSpinner = document.querySelector('#fbLoginSpinner')
    const fbSignOutBtn = document.querySelector('#fbSignOutBtn')

    fbLoginSpinner.classList.add('d-none')
    fbSignOutBtn.classList.remove('d-none')

    await facebookSignOut()
    isSignedIn = false
    updateLoggingUI()
}


function updateLoggingUI(errorMessage = undefined) {
    const fbSignInBtn = document.querySelector('#fbSignInBtn')
    const fbLoginMessage = document.querySelector('#fbLoginMessage')
    const fbLoginSpinner = document.querySelector('#fbLoginSpinner')
    const fbSignOutBtn = document.querySelector('#fbSignOutBtn')

    if (isSignedIn) {
        // if user is signed in
        fbSignInBtn.classList.add('d-none')
        fbSignOutBtn.classList.remove('d-none')
        fbLoginMessage.classList.remove('d-none')
        fbLoginMessage.innerText = "تم تسجيل دخولك و سيتم الآن توجيهك إلى صفحة الاجتماعات"

    } else {
        // if user isn't signed in - maybe signed out and may be error
        fbSignInBtn.classList.remove('d-none')
        fbSignOutBtn.classList.add('d-none')
        fbLoginMessage.classList.toggle('d-none', !errorMessage)
        fbLoginMessage.innerText = errorMessage
    }
    fbLoginSpinner.classList.add('d-none') //spinner none because user has a known state

}


window.routeToNewMeeting = (selectedElement) => {
    console.log(selectedElement);
    // document.querySelector('main').innerHTML = getPageComponentCode('meeting-form')
    selectedElement.classList.toggle('btn-primary')
    selectedElement.classList.toggle('btn-secondary')

}

window.submitForm = () => {
    const selectedMembers = [...document.querySelectorAll('#q1 .btn-secondary')]
    const selectedTeam = [...document.querySelectorAll('#q2 .btn-secondary')]
    const selectedBranch = [...document.querySelectorAll('#q3 .btn-secondary')]
    const members = selectedMembers.map(element => element.innerText)
    const team = selectedTeam.map(element => element.innerText)
    const branch = selectedBranch.map(element => element.innerText)

    console.log(members);
    console.log(team);
    console.log(branch);
}