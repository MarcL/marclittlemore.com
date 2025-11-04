---
title: "How I Unlocked My MDM-Locked M1 MacBook Pro"
subtitle: ""
permalink: "/how-i-unlocked-my-mdm-locked-m1-macbook-pro/"
date: "2025-10-31"
# headerImage: "/images/banners/how-i-unlocked-my-mdm-locked-m1-macbook-pro.jpg"
headerImage: "/images/banners/write-ideas.jpg"
description: ""
tags:
    -
image:
    source: ""
    creator: ""
    url: ""
---

Back in 2021, I joined a small logistics startup called Beacon. Although, I didn't end up working there for very long, I ended up with a company MacBook Pro M1 sitting in my wardrobe. It should have been sent back but due to a major family health emergency at the same time, it sat forgotten in the back of my wardrobe.

It's now October 2025 and my son has just gone off to university in Glasgow. In his first week he managed to damage his laptop screen with an ill-timed AirPod case incident which made it difficult for him to use. After some digging in the cupboards for an old laptop, I realised I had the MacBook and should see if it was still usable.

It booted up fine but it was completely locked down with MDM (Mobile Device Management) software, JAMF, and I didn't have any credentials to login.

So here's the story of a series of challenges to finally unlock the machine. As I struggled to find any concerete information online, I thought I'd share it here for anyone else who might face similar issues.

## So what was the problem?

Beacon had been using JAMF as their MDM solution to manage company devices so when I tried to boot up the laptop, I was greeted with a JAMF login screen asking for a Google Account.

I contacted an old friend who is stil at Beacon and, as he's now the head of engineering, the were happy for me to keep the laptop. They asked their IT provider, Jigsaw24, to remove it from their MDM system and Apple Business Manager. I spoke to Jigsaw24 on the phone and they confirmed they'd done this, but when I tried to use the laptop again, it still booted to the same JAMF screen. After another phonecall, they confirmed that you have to reformat the machine to remove the MDM profile properly after de-enrolment.

When I tried to boot into recovery mode to reinstall macOS, it asked for an admin recovery key. I'd never been given one so there was now no way to format the machine. I rang Jigsaw24 again and spoke to one of their agents who told me that I had 100% been removed from MDM but they had no records of my recovery key as they'd deleted it from the system. Normally, you or the company should be given the recovery keys but nobody had this.

It looked like I was about to be stuck with a bricked laptop.

## Understanding Mac security

Here's where I went down the rabbit hole of trying to understand how MacBook security works. This was a new Apple Silicon M1 chip so these differ from the old Intel-based Macs.

Older Intel Macs with the T2 chip used a firmware password to lockdown the computer. Apple Silicon Macs use a recovery lock (TODO: Is this for the file vault?) when you're enrolled in MDM. This is a very long unique key which you need to unlock the recovery system.

Even after a device is removed from Apple Business Manager and MDM, M1 Macs can retain cached activation records that still see the machine as a corporate device. Without the recovery key you're a bit buggered as you can't enter the recovery mode.

I was told to call Apple Support by the folks at Jigsaw24. They suggested that they were able to remove the recovery lock if I could provide proof of purchase, which I had. I called Apple Support and when I eventually got through to someone technical, he was somewhat patronising but kind of helpful. He confirmed that they couldn't help to remove the recovery key as it's an important security feature to prevent stolen devices from being unlocked. This totally makes sense and I understand that they don't want stolen laptops to be used. He suggested that MDM hadn't been removed as I could still see the login screen and to ring Jigsaw24 back but this was actually a red herring.

Again, I was stuck with a bricked laptop.

## The solution: DFU restore with Apple Configurator 2

As any good geek does, I did a lot of Googling.

After a lot of research, I discovered that recovery locks on M1 Macs can be bypassed by using something called DFU (Device Firmware Update) mode to completely restore the machine. However, this can only be done if the MDM profile has been removed and the machine has been removed from Apple Business Management.

DFU mode is a special startup mode that allows you to reinstall the firmware and operating system, bypassing all locks including the recovery lock. The downside is that it completely erases everything on the Mac, but since this was a laptop I couldn't access anyway, that wasn't a problem.

In order to do this, I needed:

- Another Mac running macOS Sonoma 14 or later
- Apple Configurator 2 (a free app from the Mac App Store)
- A USB-C to USB-C data cable (importantly, NOT a Thunderbolt cable)
- The power adapter for the locked MacBook Pro
- A hell of a lot of patience!

{% callout "info" %}
**Note:** I found that one of my USB cables didn't work but I'm not 100% sure why. You might have to try a few cables for it to work properly.
{% endcallout %}

## Getting started with Apple Configurator 2

I started by installing Apple Configurator 2 on my working Mac from the App Store. This is a free tool that Apple provides for managing iOS and macOS devices.

I made sure my working Mac was connected to power and had a stable internet connection. As it downloads the firmware and an version of macOS, make sure you've got a decent connection. The OS is around 14 GB so it might take a while.

## Booting into DFU mode (the trickiest part)

Getting the MacBook Pro into DFU mode was by far the hardest part of this process. The timing is incredibly precise and it took me multiple attempts over a few hours to get it right. It's probably the most frustrating part of this process.

Here's what you need to do:

1. Make sure the locked MacBook Pro is completely powered off (you have to hold the power button for 15 seconds)
2. Connect it to your working Mac using the USB-C cable
3. Connect the locked MacBook Pro to its power adapter
4. Open Apple Configurator 2 on your working Mac

Some online articles suggest that you have to plug in the USB-C cable into the furthest back USB port on the left-hand side of the laptop in order to trigger DFU.

Now comes the timing-critical part:

1. Press and release the power button on the locked MacBook Pro
2. Immediately press and hold the following four keys simultaneously: Power button + Left Control + Left Option + Right Shift
3. Hold all four keys for exactly 10 seconds. Yes, you do have to count "one-thousand, two-thousand" etc.!
4. After 10 seconds, release the three keyboard keys but keep holding the power button
5. Continue holding the power button until you see "DFU" appear in Apple Configurator 2 (usually another 5-10 seconds)
6. Tear your hair out when it doesn't work and then repeat!

{% callout "info" %}
**Important:** The MacBook Pro's screen should stay completely black during this entire process. If you see an Apple logo appear, it means the Mac has started booting normally and you need to try again. Why Apple decided that you need a Voodoo incantation with precise timing to boot the machine, I'll never know!
{% endcallout %}

I had to try this at least 20 times before I got the timing right. Don't give up! And don't forget to count out loud to maintain the timing!

## Downloading the IPSW file first

Once I could get into DFU mode, I faced yet another problem: the restore process kept failing with the following error message:

TODO: Add error message image that I took.

After the fourth failed attempt, and much swearing, I used Claude to try to see if there were any alternatives. It was incredibly helpful and shared the key to my eventual victory: pre-downloading the macOS firmware file (called an IPSW file) instead of letting Apple Configurator 2 download it during the restore.

Here's what you need to do:

1. Go to https://ipsw.me on the working Mac
2. Select MacBook Pro from the list
3. Select the specific model (for me it was a MacBook Pro 16-inch, 2021, M1)
4. Download the latest signed IPSW file (it was about 13-15 GB). I chose to install Sonoma 14.6 because it's what I was using on the working Mactop

This single change made all the difference.

## Performing the DFU restore

With the IPSW file downloaded and my MacBook Pro in DFU mode, I was ready to try again.

In Apple Configurator 2, I could see a large "DFU" icon representing my locked MacBook Pro. You have to drag the downloaded IPSW file from your folder and drop it onto the DFU icon.

This starts the restore process and some anxiety that it was going to fail again.

The entire process took about 30-40 minutes. During this time, the Apple logo appeared and disappeared on the MacBook Pro a few times but it's completely normal.

You have to ensure that neither Mac goes to sleep during this process and keep everything plugged in.

## Victory was mine!

When the restore completed, the MacBook Pro automatically restarted and booted into the macOS Setup Assistant. It showed the "Hello!" welcome screen you see on a brand new Mac and I think I actually shouted "FUCK YEAH!"

The recovery lock was gone. The MDM enrollment was gone. It was completely clean and ready to set up as a new laptop.

I went through the setup process, created a user account, and the MacBook Pro was finally working properly. Just to double check, I booted it into recovery mode to confirm that the recovery key was gone and it was!

## Main issue to be aware of

Here are all of the challenges you could have if you need to do this!

### Getting into DFU mode was incredibly frustrating

The timing has to be absolutely precise. All four keys must be pressed at exactly the same moment or it just reboots the machine. I found it helpful to position my fingers hovering over the keys before starting, then press them all together like playing a chord on a piano. As stupid as it sounds, counting out loud helps to maintain the timing.

It took me 8-10 attempts before I successfully got into DFU mode. If you see the Apple logo appear on the screen, you've missed the window and the Mac has started booting normally. Just power it off and try again.

I did find that booting into recovery mode and then shutting down seemed to help. This could be anecdotal though as I couldn't find any reference to this online.

I nearly rage-quit many times whilst doing this.

### Not all USB-C cables work

I initially struggled to get into DFU mode and it turned out my USB-C cable was the problem. Once I switched to the charging cable that came with the MacBook Pro, it booted into DFU mode.

Make sure you're using a regular USB-C data cable and NOT a Thunderbolt 3 or 4 cable as those don't work.

Again, it could just be the precise timing of DFU mode that was the problem but swapping the USB cable worked for me.

### The DFU restore kept failing

After successfully getting into DFU mode, I tried to restore the Mac four times and each time it failed with "AMRestoreErrorDomain error 10". This was incredibly frustrating after the pain of getting into DFU mode.

Make sure you download the IPSW firmware file from https://ipsw.me instead of letting Apple Configurator 2 download it during the restore. This eliminates potential network issues during the critical restore phase. Once I did this, the restore completed successfully on the first attempt.

## Useful resources

- [Apple Configurator 2](https://apps.apple.com/app/apple-configurator-2/id1037126344) - Free download from the Mac App Store
- [ipsw.me](https://ipsw.me) - Download macOS firmware files
- [Apple's official guide](https://support.apple.com/guide/apple-configurator-2/revive-or-restore-a-mac-with-apple-silicon-apdd5f3c75ad/mac) - How to revive or restore a Mac with Apple silicon
- [Mr. Macintosh's guide](https://mrmacintosh.com/restore-macos-firmware-on-an-apple-silicon-mac-boot-to-dfu-mode/) - Detailed video tutorial on DFU mode

I hope this helps anyone else who finds themselves in a similar situation with a locked M1 Mac. It's a frustrating process, but it's definitely possible to recover a locked device if you have the patience to work through it! 😄
