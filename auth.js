const FacebookAuth = new firebase.auth.FacebookAuthProvider();
// FacebookAuth.addScope('user_birthday');

export const facebookSignInUsingPopup = () => {
    return firebase.auth().signInWithPopup(FacebookAuth)
        .then((result) => {
            /*** @type {firebase.auth.OAuthCredential} */
            const credential = result.credential;

            // The signed-in user info.
            const user = result.user;
            const userToken = user.ya;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const accessToken = credential.accessToken;

            // console.log(credential);
            // console.log(accessToken);
            console.log(user.ya);

            return {
                state: true,
                userToken,
                errorMessage: undefined
            }


        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;

            // ...
            console.log('SignIn failed')
            console.log(errorMessage);
            console.log(credential);

            console.log(email);
            console.log(errorCode);
            return {
                state: false,
                userToken: undefined,
                errorMessage
            }


        });
}

export const facebookSignInUsingRedirect = async () => {
    firebase.auth().signInWithRedirect(FacebookAuth);
    firebase.auth()
        .getRedirectResult()
        .then(async (result) => {
            if (result.credential) {
                /** @type {firebase.auth.OAuthCredential} */
                const credential = result.credential;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const token = credential.accessToken;
                // ...
            }
            // The signed-in user info.
            const user = await result.user;
            const userToken = await user.ya;

            console.log('signed in successfully');
            console.log(user);
            return {
                state: true,
                userToken,
                errorMessage: undefined
            }

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
            console.log('sign in failed')

            return {
                state: false,
                userToken: undefined,
                errorMessage
            }

        });


}

export const facebookSignOut = () => {

    return firebase.auth().signOut()
        .then(function () {
            console.log('signed out successfully');
        }, function (error) {
            console.log(error);
            console.log('sign out failed')
        });
}