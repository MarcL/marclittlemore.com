var mailChimpTracking = require('./mailChimpTracking');
var countdownTimer = require('./countdownTimer');

window.onload = function() {
    countdownTimer('timer', 'progressTimer', 300);
    mailChimpTracking('mailChimpSignupForm');
}