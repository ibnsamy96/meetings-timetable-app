/*

const analyzeError = (error) => {
    error = error.split('/')
    const errorType = error[0]
    const errorCode = error[1]
    return {
        errorType,
        errorCode
    }
}

const getAuthErrorMessage = (authErrorCode) => {
    switch (authErrorCode) {
        case 'popup-closed-by-user':
            'عملية المصادقة لم تكتمل؛ المرة الجاية سيبها تكتمل يا قمر :)'
            break;

        default:
            break;
    }
}



export const getErrorMessage = (error) => {
    //auth/popup-closed-by-user
    const errorObject = analyzeError(error)
    let errorMessage

    switch (errorObject.errorType) {
        case 'auth':
            errorMessage = getAuthErrorMessage(errorObject.errorCode)
            break;

        default:
            break;
    }

    return errorMessage

}

*/