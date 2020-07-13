import URLSearchParams from '@ungap/url-search-params';

function appendSignupLocation(formId) {
    const SIGNUP_KEY = 'signup';

    const urlParams = new URLSearchParams(window.location.search);
    const signUpCode = urlParams.get(SIGNUP_KEY);

    if (signUpCode) {
        const mailChimpForm = document.getElementById(formId);
        if (mailChimpForm) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'SIGNUP';
            input.value = signUpCode;
            mailChimpForm.appendChild(input);
        }
    }
}

export default appendSignupLocation;
