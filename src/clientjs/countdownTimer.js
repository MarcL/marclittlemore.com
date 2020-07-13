function setTime(element, timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60).toString();
    const seconds = Math.floor(timeInSeconds % 60).toString();
    element.innerText = minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
}

function setProgressBar(element, screenReaderElement, percentage) {
    const roundedPercentage = Math.floor(percentage);
    element.style.width = percentage + '%';
    element.setAttribute('aria-valuenow', roundedPercentage);
    screenReaderElement.innerText = (100 - roundedPercentage) + '% Complete';
}

function setTimerCountdown(timerTextId, progressBarId, maxTimeSeconds) {
    const timer = document.getElementById(timerTextId);
    if (timer) {
        const maxTime = maxTimeSeconds;
        let timeLeft = maxTime;

        const progressTimer = document.getElementById(progressBarId);
        const progressBarScreenReader = document.getElementById('progressBarScreenReader');
        const timerInterval = setInterval(function() {
            timeLeft--;

            const timeWidth = (timeLeft / maxTime) * 100;
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

export default setTimerCountdown;