import {
    facebookSignInUsingPopup,
    facebookSignInUsingRedirect,
    facebookSignOut,
    saveUserToken
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

import {
    disableMeetingForm,
    checkMeetingForm,
    submitMeetingForm
} from "./components/pages/meeting-form/meeting-form.js";

import {
    chooseThisChoice
} from "./components/shared/choice.js";
import {
    LoginComponent
} from "./components/pages/login/login.component.js";

// next boolean indicates if user signed in -> will be true at sign in manually or automatically and will be false at sign out
let isSignedIn
let userToken

// next boolean indicates if meeting form is disabled -> if user clicked 'checkForm' button it will be disabled until he clicks on another choice
let isMeetingFormDisabled = false


const mainRouter = async (pageName) => {
    const pageComponent = await getPageComponentCode(pageName)
    //function to replace main element with the right pageComponent
    document.querySelector('main').innerHTML = pageComponent
    // if (pageName === 'login') {
    calculateMainHeight()

}

function calculateMainHeight() {
    const navbarHeightPlusPadding = 40 + 16
    const mainElementTopMargin = 24
    const mainElementBottomPadding = 24
    const mainHeight = window.innerHeight - navbarHeightPlusPadding - mainElementTopMargin - mainElementBottomPadding;
    document.querySelector('main').style.height = `${mainHeight}px`
    const loginSection = document.querySelector('#login-component')
    if (loginSection) {
        document.querySelector('#login-component').style.height = `${mainHeight}px`
    }
    const fbSignOutBtn = document.querySelector('#fbSignOutBtn')
    if (fbSignOutBtn) {
        fbSignOutBtn.style.height = getComputedStyle(fbSignOutBtn.parentElement.parentElement).getPropertyValue('height')
    }
}

window.addEventListener('resize', calculateMainHeight)


const autoSignIn = async () => {
    document.querySelector('header').innerHTML = getSharedComponentCode('navbar')
    await mainRouter('login')

    const fbLoginSpinner = document.querySelector('#fbLoginSpinner')
    const fbSignInBtn = document.querySelector('#fbSignInBtn')

    fbLoginSpinner.classList.remove('d-none')
    fbSignInBtn.classList.add('d-none')

    console.log('function loaded');
    firebase.auth().onAuthStateChanged((user) => {
        // console.log();
        if (user) {
            console.log('wow');
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const userId = user.uid;
            console.log(user);
            userToken = user.ya;
            saveUserToken(userToken)
            // console.log(uid);
            postLoginInfo(user)
            getTeams()
            getMeetings()
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
        updateLoggingUI()
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
    if (window.innerWidth >= 767) {
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
    await mainRouter('login')

    const fbLoginSpinner = document.querySelector('#fbLoginSpinner')
    const fbSignOutBtn = document.querySelector('#fbSignOutBtn')

    fbLoginSpinner.classList.add('d-none')
    fbSignOutBtn.classList.remove('d-none')

    await facebookSignOut()
    isSignedIn = false
    updateLoggingUI()
}


function updateLoggingUI(errorMessage = undefined) {
    // TODO controlBtns appear with homepage not before it
    const fbSignInBtn = document.querySelector('#fbSignInBtn')
    const fbLoginMessage = document.querySelector('#fbLoginMessage')
    const fbLoginSpinner = document.querySelector('#fbLoginSpinner')
    const controlBtns = document.querySelector('#controlBtns')

    if (isSignedIn) {
        // if user is signed in
        fbSignInBtn.classList.add('d-none')
        controlBtns.classList.remove('d-none')
        fbLoginMessage.classList.remove('d-none')
        fbLoginMessage.innerText = "تم تسجيل دخولك و سيتم الآن توجيهك إلى صفحة الاجتماعات"

    } else {
        // if user isn't signed in - maybe signed out and may be error
        fbSignInBtn.classList.remove('d-none')
        controlBtns.classList.add('d-none')
        fbLoginMessage.classList.toggle('d-none', !errorMessage)
        fbLoginMessage.innerText = errorMessage
    }
    fbLoginSpinner.classList.add('d-none') //spinner none because user has a known state

}


window.routeToNewMeeting = async (pageBtn) => {
    // console.log(selectedElement);
    pageBtn.classList.add('d-none')
    await mainRouter('meeting-form')
}

window.fireChooseThisChoice = (selectedElement) => {
    if (!(selectedElement.classList.contains('timeQuestion') || selectedElement.classList.contains('dateQuestion'))) {
        chooseThisChoice(selectedElement)
    }
    if (isMeetingFormDisabled) {
        isMeetingFormDisabled = false
        disableMeetingForm(false)
    }
}

window.fireCheckMeetingForm = () => {
    checkMeetingForm()
    isMeetingFormDisabled = true
}

window.fireSubmitMeetingForm = async () => {
    submitMeetingForm()
    // TODO route to home component instead of the login component
    await mainRouter('login')
}



// next method to toggle team data section
const mainLeftMargin = parseFloat(getComputedStyle(document.querySelector('main')).marginLeft)
document.querySelector('#root').style.marginLeft = mainLeftMargin.toString() + 'px';
window.openTeamData = (doOpen) => {
    if (doOpen) {
        document.querySelector('#hideContent').classList.remove('d-none')
        setTimeout(() => {
            document.querySelector('#hideContent').style.opacity = doOpen ? 1 : 0;
        }, 1)
    } else {
        document.querySelector('#hideContent').style.opacity = doOpen ? 1 : 0;
        setTimeout(() => {
            document.querySelector('#hideContent').classList.add('d-none')
        }, 501)
    }

    const mainNewLeftMargin = doOpen ? mainLeftMargin * 0.8 : mainLeftMargin
    const teamDataNewRight = doOpen ? 0 : -400
    console.log(mainNewLeftMargin);
    console.log(mainNewLeftMargin.toString() + 'px');
    document.querySelector('#root').style.marginLeft = mainNewLeftMargin.toString() + 'px';
    document.querySelector('#closeTeamData').style.right = teamDataNewRight.toString() + 'px';
    console.log(document.querySelector('#root'));
    console.log(document.querySelector('#closeTeamData').style.right);
}