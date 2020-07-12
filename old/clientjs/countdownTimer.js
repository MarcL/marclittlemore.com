var leftPad = require('leftpad');

function setTime(element, timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60);
    var seconds = Math.floor(timeInSeconds % 60);
    element.innerText = leftPad(minutes, 2, '0') + ':' + leftPad(seconds, 2, '0');
}

function setProgressBar(element, screenReaderElement, percentage) {
    var roundedPercentage = Math.floor(percentage);
    element.style.width = percentage + '%';
    element.setAttribute('aria-valuenow', roundedPercentage);
    screenReaderElement.innerText = (100 - roundedPercentage) + '% Complete';
}

function setTimerCountdown(timerTextId, progressBarId, maxTimeSeconds) {
    var timer = document.getElementById(timerTextId);
    if (timer) {
        var maxTime = maxTimeSeconds;
        var timeLeft = maxTime;

        var progressTimer = document.getElementById(progressBarId);
        var progressBarScreenReader = document.getElementById('progressBarScreenReader');
        var timerInterval = setInterval(function() {
            timeLeft--;

            var timeWidth = (timeLeft / maxTime) * 100;
            setProgressBar(progressTimer, progressBarScreenReader, timeWidth);

            if (timeLeft > 0) {
                setTime(timer, timeLeft);
            } else {
                timer.innerText = 'DONE!';
                clearInterval(timerInterval);
            }

        }, 1000);
    }
}

module.exports = setTimerCountdown;
