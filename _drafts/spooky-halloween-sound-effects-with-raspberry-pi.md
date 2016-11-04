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

For Halloween back in 2015, I had an unused Raspberry Pi and decided that I should hook it up with a big red button to scare the local children as they came trick or treating. I connected the Raspberry Pi GPIO pins to a breadboard with a [big red dome push button](https://www.coolcomponents.co.uk/big-dome-push-button-red.html). I then painted a shoe box black and hid the electronics inside and made it look like a spooky spider as you can see in the picture below.

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="7" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/9eGMutCXUh/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">Our Raspberry Pi powered Halloween spider. Press the big red button if you dare! LEDs to be added tonight. #halloween #spider #raspberrypi #spooky</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A photo posted by Marc Littlemore (@marclittlemore) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2015-10-30T17:33:27+00:00">Oct 30, 2015 at 10:33am PDT</time></p></div></blockquote>
<script async defer src="//platform.instagram.com/en_US/embeds.js"></script>

Unfortunately, this year I'd had a major operation so wasn't feeling up to recreating or bettering my Raspberry Pi project from last year. Instead, I decided to simplify it in order to play random spooky sound effects combined with some spooky music from Spotify. This is a simple project to set up so read on if you want to do it next year.

### What You'll Need

* A Raspberry Pi
* A PC or Mac with a Spotify account
* An audio mixer (or an input into your Mac or PC for software mixing)
* A set of speakers
* Some audio cables (probably 3.5mm but it will depend on your setup)

To get started I'm going to assume that you've got a Raspberry Pi, preferably a v2 or v3 but I'm sure it'll work with a Pi Zero too. We're going to need to install Node.js on it if you haven't already and it should already have `git` on there for cloning the project from GitHub.

Next up you'll need your PC or Mac running and you'll need Spotify on it. You can use the Spotify free account but bear in mind that you'll have adverts popping up which might not scare the neighbours as much as the spooky sound effects will. Alternatively, you can use your own playlist of spooky music or find another one on SoundCloud or YouTube. Your speakers should be turned on too and attached to your computer. I have an amplifier and a speakers attached to the PC I was running Spotify on but a small pair of computer speakers will work too but just make sure they're loud enough.

![Stanton DJ Mixer](/images/posts/stanton-dj-mixer.jpg){: title="Stanton DJ Mixer" alt="Stanton DJ Mixer"}

Finally, you'll need something to mix together the two sound sources with. I've spend nearly 30 years DJing so I had my Stanton DJ mixer to hand and plugged both the PC and the Raspberry Pi into it and the output went to my amplifier. If you don't have an audio mixer, you can easily achieve the same thing by using a software mixer on your PC or Mac. Simply attach the output of the Raspberry Pi to the microphone input of your computer using a 3.5mm jack audio cable and start the audio mixer in your settings or preferences panel. Note that the output of the Raspberry Pi seems to be really quiet in comparison to the output from the Pi. You may be able to change this but I didn't investigate it too much. It just means that you'll need to allow the Pi audio to be a lot higher than that from the PC using your hardware or software mixer.

### Install Node.js on your Raspberry Pi

As I love working with Node.js and JavaScript, and I do so daily at work, I decided to create the project using JavaScript and running it with Node.js. I installed Node when I first got the Raspberry Pi back in April 2015 so I've installed an early version (0.10) by following [this guide](http://weworkweplay.com/play/raspberry-pi-nodejs/). However, at the time of writing, I think this will install v4.2.1. If you follow the instructions on the [Node Arm GitHub project](https://github.com/nathanjohnson320/node_arm) then you it should work fine.

```shell
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb
```

As Linux doesn't have the best audio support, you'll have to install the [Advanced Linux Sound Architecture (ALSA)](http://www.alsa-project.org/main/index.php/Main_Page) library to allow easier playback of MP3 files. One of the NPM packages used is [node-speaker](https://github.com/TooTallNate/node-speaker) and it relies on this library to play audio files. It should be a simple installation using `apt-get` as follows:

```shell
sudo apt-get install libasound2-dev
```

### Install the code

https://github.com/MarcL/halloweenpi/tree/random-play-sounds

```shell
git clone -b random-play-sounds git@github.com:MarcL/halloweenpi.git
cd halloweenpi
npm install
```


### Audio mixing


### Updating the sound effects

![Raspberry Pi and Spotify](/images/posts/raspberry-pi-spooky-halloween-sound-effects.jpg){: title="Raspberry Pi and Spotify Setup" alt="Raspberry Pi and Spotify Setup"}

Spotify playlist:

https://open.spotify.com/user/marclittlemore/playlist/18JeNeypZVxJLMqVcGvR84

You can find the original code for the push button version of this on my GitHub repository for the [Halloweenpi](https://github.com/MarcL/halloweenpi). Feel free to fork it and shape it for your own projects.
