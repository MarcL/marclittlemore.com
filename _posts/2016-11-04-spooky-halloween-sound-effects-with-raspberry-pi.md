---
layout: post
title:  "Halloween Sound Effects Using Spotify And Raspberry Pi"
subtitle: "Scare the neighbours and create a spooky Halloween by using your Raspberry Pi and Spotify"
permalink: /spooky-halloween-sound-effects-with-raspberry-pi-and-spotify/
header-img: images/banners/raspberry-pi.jpg
categories:
    - raspberry-pi
    - development
enableComments: true
description: Scare the trick or treaters with this simple Raspberry Pi Node.js project to play spooky sound effects. 
---

For Halloween back in 2015, I had an unused Raspberry Pi and decided that I should make a Halloween project in order to learn electronics again, and to scare the local children as they came trick or treating. I connected the Raspberry Pi GPIO pins to a breadboard with a [big red dome push button](https://www.coolcomponents.co.uk/big-dome-push-button-red.html). I hid the Pi and electronics inside a shoe box painted black, and made it look like a spooky spider as you can see in the picture below.

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="7" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/9eGMutCXUh/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">Our Raspberry Pi powered Halloween spider. Press the big red button if you dare! LEDs to be added tonight. #halloween #spider #raspberrypi #spooky</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A photo posted by Marc Littlemore (@marclittlemore) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2015-10-30T17:33:27+00:00">Oct 30, 2015 at 10:33am PDT</time></p></div></blockquote>
<script async defer src="//platform.instagram.com/en_US/embeds.js"></script>

Unfortunately, this year I've had a major operation so wasn't feeling up to recreating or bettering my Raspberry Pi project from last year. Instead, I decided to simplify it in order to play random spooky sound effects via the Raspberry Pi and combine it with some spooky ambient music from Spotify. This is a simple project to set up so read on if you want to scare your local trick or treaters!

### What You'll Need

* A Raspberry Pi (v2/3 or Zero) and SD card with Raspbian installed
* A PC or Mac with a Spotify account
* An audio mixer (or an input into your Mac or PC for software mixing)
* A set of speakers
* Some audio cables (probably 3.5mm but it will depend on your setup)

The first thing you'll need to do is to install Node.js on the Rasbperry Pi, assuming that you haven't already. You'll also need `git` installed for for cloning the project from GitHub, but this should come with the standard Rasbian install.

Next you'll need your PC or Mac up and running and you'll want Spotify on it. You can use a Spotify free account but bear in mind that you'll have adverts popping up which might not scare the neighbours as much as the spooky music will. Alternatively, you can use your own playlist of haunting music or find another one on SoundCloud or YouTube. Again, just watch out for adverts playing or you'll ruin the effect.

You'll need a set of speakers attached to your computer in some way. I run the output of my PC to an amplifier and speakers so I can boost the volume, but you can just use a small pair of computer speakers straight from the computer. Just make sure they're loud enough for people to be able to hear them. I kept my speakers indoors and put them by open windows but if you can run your speakers outside, and they're waterproof, then that'll work too.

![Stanton DJ Mixer](/images/posts/stanton-dj-mixer.jpg){: title="Stanton DJ Mixer" alt="Stanton DJ Mixer"}

Finally, you'll need something to mix the two audio sources together. I've spent nearly 30 years DJing so I had my Stanton DJ mixer to hand and plugged both the PC and the Raspberry Pi into it using RCA cables. This allowed me to alter the volumes of the two input sources and the final volume of the output to my amplifier. If you don't have an audio mixer, you can easily achieve the same thing by using a software mixer on your PC or Mac. Simply attach the output of the Raspberry Pi to the microphone input of your computer using a 3.5mm RCA cable and start the audio mixer in your settings or preferences panel. Note that the output of the Raspberry Pi seems to be really quiet in comparison to the output from the PC. You may be able to change this but I didn't investigate it too much. It just means that you'll need to make the Pi audio a lot higher than that from the PC using your hardware or software mixer.

### Install Node.js on your Raspberry Pi

As I love working with Node.js and JavaScript, I decided that this was an easy way to get a project up and running. I installed Node when I first got the Raspberry Pi back in April 2015 so I have version 0.10 by following [this guide](http://weworkweplay.com/play/raspberry-pi-nodejs/). However, at the time of writing, I think the easiest way to install v4.2.1 is by following the instructions on the [Node Arm GitHub project](https://github.com/nathanjohnson320/node_arm) which does the following:

```shell
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb
```

You may need to update the `gcc` compilers too, dependent on what version of Raspbian you're using, but follow the Node Arm guide if you need to do that.

As Linux doesn't have the best out-of-the-box audio support, you'll also have to install the [Advanced Linux Sound Architecture (ALSA)](http://www.alsa-project.org/main/index.php/Main_Page) library to allow easier playback of MP3 files. One of the NPM packages used is [node-speaker](https://github.com/TooTallNate/node-speaker) and it relies on this library to play audio files. It should be a simple installation using `apt-get` on the Raspberry Pi as follows:

```shell
sudo apt-get install libasound2-dev
```

### Install the code

Next you'll need to install my Halloween Pi project in order to play the random sounds. As mentioned above, the original project used a button and some LEDs last year so the master branch of the [Halloweenpi GitHub project](https://github.com/MarcL/halloweenpi) contains that code that uses the GPIOs to send signals from the buttons and to the LEDs. However, I've added a branch which just plays random sound effects in the `random-play-sounds` branch. Just clone the project from this specific branch and install all of the dependencies:

```shell
git clone -b random-play-sounds git@github.com:MarcL/halloweenpi.git
cd halloweenpi
npm install
```

After installation you should have the project and all of the samples necessary. Run the project and you should start hearing sound effects at intervals of between 15 and 40 seconds. I found this to be about right so that you actually get to hear them without them being too repetitive.

```shell
npm start
```

![Raspberry Pi and Spotify](/images/posts/raspberry-pi-spooky-halloween-sound-effects.jpg){: title="Raspberry Pi and Spotify Setup" alt="Raspberry Pi and Spotify Setup"}

Now you need to also play the spooky ambient music from a Spotify playlist. I created this [Spotify Playlist of spooky Halloween noises](https://open.spotify.com/user/marclittlemore/playlist/18JeNeypZVxJLMqVcGvR84) which you can use. It's nearly 7 hours long so it should be enough for playing throughout the night but feel free to make your own too. You'll have to use your audio mixer to determine the correct balance between the ambient music from Spotify and the one-shot sound effects triggered by the Raspberry Pi. As I mentioned earlier, the Raspberry Pi output seems to be incredibly quiet so I probably had my inputs at around 20% of the PC output mixed with 100% of the Pi output.

All you need to do now is leave this running and position your speakers in a place, and at a volume, where they can be heard by your visitors. A lot of children and their parents commented about how great this sounded so I was pleased with the eventual outcome.

Here's a video of it running in my study, the speakers are hidden behind the curtains with the windows open so it could be heard from the street.

<iframe width="560" height="315" src="https://www.youtube.com/embed/77df-OO72U0" frameborder="0" allowfullscreen></iframe>

### Updating the sound effects

If you want to update the sound effects that are being played then it's really simple. First, you need to add the MP3 files to the `/assets` directory. Secondly, you need to update the config file which points at them. I chose to be explicit in what sound effects I wanted playing rather than just playing every file it finds in the assets directory. Just update the `/config/config.js` array of paths to the sound effects and add your new effects, or remove any that you don't want.

```javascript
module.exports = {
    soundFiles: [
        './assets/cuckoo-clock.mp3',
        './assets/foghorn-doorbell.mp3',
        './assets/ghost-scream.mp3',
        './assets/evil-laugh.mp3',
        './assets/female-scream.mp3',
        './assets/funeral-bells.mp3',
        './assets/howling-wolf.mp3',
        './assets/cat-scream.mp3',
        './assets/woman-shrill-scream.mp3',
        './assets/thriller-laugh.mp3',
        './assets/glados-hello-friend.mp3',
        './assets/glados-hello-where-are-you.mp3',
        './assets/glados-i-see-you.mp3',
        './assets/glados-laugh.mp3',
        './assets/glados-come-over-here.mp3',
        './assets/dalek-exterminate.mp3'
       	]
};
```

I hope this guide helps you to easily set up your own Halloween Raspberry Pi spooky sound player. If you have any questions then post them below and I'll answer them, or raise and bugs as GitHub issues and I can get them fixed. 
