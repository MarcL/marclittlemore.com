import mailChimpTracking from './mailChimpTracking';
import countdownTimer from './countdownTimer';

window.onload = function() {
    countdownTimer('timer', 'progressTimer', 300);
    mailChimpTracking('mailChimpSignupForm');
}