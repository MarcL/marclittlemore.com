function leftPad (str, len, ch) {
  // convert `str` to `string`
  str = str + '';
  // `len` is the `pad`'s length now
  len = len - str.length;
  // doesn't need to pad
  if (len <= 0) return str;
  // `ch` defaults to `' '`
  if (!ch && ch !== 0) ch = ' ';
  // convert `ch` to `string`
  ch = ch + '';
  // `pad` starts with an empty string
  var pad = '';
  // loop
  while (true) {
    // add `ch` to `pad` if `len` is odd
    if (len & 1) pad += ch;
    // divide `len` by 2, ditch the remainder
    len >>= 1;
    // "double" the `ch` so this operation count grows logarithmically on `len`
    // each time `ch` is "doubled", the `len` would need to be "doubled" too
    // similar to finding a value in binary search tree, hence O(log(n))
    if (len) ch += ch;
    // `len` is 0, exit the loop
    else break;
  }
  // pad `str`!
  return pad + str;
}

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
    var maxTime = maxTimeSeconds;
    var timeLeft = maxTime;
    var timer = document.getElementById(timerTextId);
    var progressTimer = document.getElementById(progressBarId);
    var progressBarScreenReader = progressTimer.getElementsByClassName('sr-only')[0];
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