import mailChimpTracking from './mailChimpTracking';
import countdownTimer from './countdownTimer';
import addResponsiveNavigationHandler from './responsiveMenuHandler';

window.onload = function() {
    countdownTimer('timer', 'progressTimer', 300);
    mailChimpTracking('mailChimpSignupForm');
    addResponsiveNavigationHandler();
}