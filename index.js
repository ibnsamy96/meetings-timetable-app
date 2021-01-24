import {
    facebookSignInUsingPopup,
    facebookSignInUsingRedirect,
    facebookSignOut,
    saveUserToken,
    saveUserInfo
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

const playNavbarBrand = () => {
    let playingSeparatorCounter = 0
    const playingSeparator = setInterval(() => {
        document.querySelector('#navbarBrandSeparator').classList.toggle('d-none')
        playingSeparatorCounter += 1
        if (playingSeparatorCounter === 6) {
            document.querySelector('#navbarBrandSeparator').classList.remove('d-none')
            document.querySelector('#projectName').style.opacity = 1
            document.querySelector('#projectName').style.left = 0
            clearInterval(playingSeparator)
        }
    }, 500)
}

function calculateMainHeight() {
    const navbarHeightPlusPadding = 30 + 18
    const mainElementTopMargin = 24
    const mainElementBottomPadding = 24
    const mainHeight = window.innerHeight - navbarHeightPlusPadding - mainElementTopMargin - mainElementBottomPadding;
    document.querySelector('main').style.height = `${mainHeight}px`
    const loginSection = document.querySelector('#login-component')
    if (loginSection) {
        document.querySelector('#login-component').style.height = `${mainHeight}px`
    }
    const loadingSection = document.querySelector('#loading-component')
    if (loadingSection) {
        document.querySelector('#loading-component').style.height = `${mainHeight}px`
    }
    const fbSignOutBtn = document.querySelector('#fbSignOutBtn')
    if (fbSignOutBtn) {
        fbSignOutBtn.style.height = getComputedStyle(document.getElementsByTagName('nav')[0]).getPropertyValue('height')
    }
    const newMeetingBtn = document.querySelector('#newMeetingBtn')
    if (newMeetingBtn) {
        newMeetingBtn.style.height = getComputedStyle(document.getElementsByTagName('nav')[0]).getPropertyValue('height')
    }
}

window.addEventListener('resize', calculateMainHeight)


const autoSignIn = async () => {
    document.querySelector('header').innerHTML = getSharedComponentCode('navbar')
    await mainRouter('login')

    const fbLoginSpinner = document.querySelector('#fbLoginSpinner')
    const fbSignInBtn = document.querySelector('#fbSignInBtn')

    // fbLoginSpinner.classList.remove('d-none')
    // fbSignInBtn.classList.add('d-none')

    fbSignInBtn.style.height = getComputedStyle(fbSignInBtn).getPropertyValue('height')
    fbSignInBtn.style.width = getComputedStyle(fbSignInBtn).getPropertyValue('width')

    fbSignInBtn.disabled = true
    fbSignInBtn.innerHTML = getSharedComponentCode('loading', {
        loadingSize: 'Small'
    })

    playNavbarBrand()

    console.log('function loaded');
    firebase.auth().onAuthStateChanged((user) => {
        // console.log();
        if (user) {
            console.log('wow');
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const userId = user.uid;
            const userName = user.displayName;
            const userEmail = user.email;
            console.log(user);
            userToken = user.ya;
            saveUserToken(userToken)
            saveUserInfo({
                userId,
                userName,
                userEmail
            })
            // console.log(uid);
            postLoginInfo(user)
            getTeams()
            getMeetings()
            console.log('signed in successfully - auto check');
            console.log(userToken);
            controlBtns.classList.remove('d-none')
            mainRouter('meetings-dashboard')
            // ...
        } else {
            // User is signed out
            // ...
            console.log('sign in failed - auto check');
            updateLoggingUI()
        }
        isSignedIn = !!user
        console.log(isSignedIn);
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

        if (isSignedIn) {
            await mainRouter('meetings-dashboard')
        } {
            updateLoggingUI(errorMessage)
        }

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
    console.log('hi');
    // TODO controlBtns appear with homepage not before it
    const fbSignInBtn = document.querySelector('#fbSignInBtn')
    const fbLoginMessage = document.querySelector('#fbLoginMessage')
    // const fbLoginSpinner = document.querySelector('#fbLoginSpinner')
    const controlBtns = document.querySelector('#controlBtns')

    if (isSignedIn) {
        // if user is signed in
        fbSignInBtn.disabled = true
        fbSignInBtn.innerHTML = getSharedComponentCode('loading', {
            loadingSize: 'Small'
        })
        // fbLoginMessage.classList.remove('d-none')
        // fbLoginMessage.innerText = "تم تسجيل دخولك و سيتم الآن توجيهك إلى صفحة الاجتماعات"

    } else {
        // if user isn't signed in - maybe signed out and may be error
        fbSignInBtn.disabled = false
        fbSignInBtn.innerText = "SIGN IN"
        controlBtns.classList.add('d-none')
        fbLoginMessage.classList.toggle('d-none', !errorMessage)
        fbLoginMessage.innerText = errorMessage
    }
    // fbLoginSpinner.classList.add('d-none') //spinner none because user has a known state
}


window.routeToAnotherPage = async (pageBtn) => {
    if (!pageBtn.classList.contains('active')) {
        pageBtn.classList.add('active')
        pageBtn.style.cursor = 'default'
        pageBtn.style.opacity = '0.5'
        await mainRouter('meeting-form')
    }
    // console.log(selectedElement);
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
    await submitMeetingForm()
    // TODO route to home component instead of the login component
    await mainRouter('meetings-dashboard')
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