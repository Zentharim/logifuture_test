const loginPageMobile = {
    // Login elements
    loginPageUsername: ':nth-child(2) > .form-input__wrap > .form-input',
    loginPagePassword: ':nth-child(3) > .form-input__wrap > .form-input',
    loginPageLoginBtn: '.btn',
    loginPageError: '.txt-danger-dark',
    loginPageInfo: '.info',
    forgottenPassword: '.login-form--link',


    // Label and Messages
    forgottenPasswordMessage: 'Forgot your password?',
    loginBtnMessage: 'Login',
    loginPageInfo_DetailsNotRecognized: 'Your details weren\'t recognized.',
    loginPageInfo_FourAttempts: 'Your details weren\'t recognized. Account will be locked after 4 attempts.',
    loginPageInfo_ThreeAttempts: 'Your details weren\'t recognized. Account will be locked after 3 attempts.',

}
export default {...loginPageMobile}