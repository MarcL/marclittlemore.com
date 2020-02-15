var URLSearchParams = require('@ungap/url-search-params');

function appendSignupLocation(formId) {
    var SIGNUP_KEY = 'signup';

    var urlParams = new URLSearchParams(window.location.search);
    signUpCode = urlParams.get(SIGNUP_KEY);

    if (signUpCode) {
        var mailChimpForm = document.getElementById(formId);
        if (mailChimpForm) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'SIGNUP';
            input.value = signUpCode;
            mailChimpForm.appendChild(input);
        }
    }
}

module.exports = appendSignupLocation;
