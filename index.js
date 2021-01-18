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

const mainRouter = (pageName) => {
    //function to replace main element with the right pageComponent
    document.querySelector('main').innerHTML = getPageComponentCode(pageName)
}


const autoSignIn = () => {
    document.querySelector('header').innerHTML = getSharedComponentCode('navbar')
    mainRouter('login')

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
    mainRouter('login')

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


window.routeToNewMeeting = (pageBtn) => {
    // console.log(selectedElement);
    pageBtn.classList.add('d-none')
    mainRouter('meeting-form')
}

window.chooseThisChoice = (selectedElement) => {
    // console.log(selectedElement);
    console.log(typeof selectedElement.parentElement.dataset.multiple);
    if (selectedElement.parentElement.dataset.multiple === 'true') {
        selectedElement.classList.toggle('btn-success')
        selectedElement.classList.toggle('btn-info')
    } else {
        if (selectedElement.classList.contains('btn-info')) {

            [...selectedElement.parentElement.children].splice(1).forEach(choice => {
                // console.log(choice);
                choice.classList.remove('btn-success')
                choice.classList.add('btn-info')
            })

        }
        selectedElement.classList.toggle('btn-success')
        selectedElement.classList.toggle('btn-info')
    }


}

window.submitForm = () => {
    const questions = [...document.querySelectorAll('li')].map(question => {
        const answerChoices = [...question.children].splice(1)
        const chosenAnswers = answerChoices.filter(choice => {
                const isChoiceSelected = choice.classList.contains('btn-success')
                return isChoiceSelected
            })
            .map(selectedElement => selectedElement.innerText)

        return {
            id: question.id,
            answers: chosenAnswers
        }
    })


    if (questions.some(question => question.answers.length < 1)) {
        document.querySelector('#warning').classList.remove('d-none')
    } else {
        console.log(questions);
        document.querySelector('#warning').classList.add('d-none')
        document.querySelector('#newMeetingBtn').classList.remove('d-none')

        // TODO route to home component instead of the login component
        mainRouter('login')
    }

}