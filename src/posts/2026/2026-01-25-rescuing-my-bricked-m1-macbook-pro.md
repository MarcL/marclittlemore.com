---
title: Rescuing My Bricked M1 MacBook Pro
subtitle: "A guide to surviving MDM locks and Apple's DFU."
permalink: "/rescuing-my-bricked-m1-macbook-pro/"
date: "2026-01-25"
headerImage: "/images/banners/rescuing-my-bricked-m1-macbook-pro.jpg"
description: "Found a locked M1 Mac in the wardrobe? Here is how to bypass the MDM recovery lock using DFU mode without losing your mind."
tags:
    - tech
    - hardware
    - macOS
image:
    source: "https://unsplash.com/photos/slightly-opened-silver-macbook-mP7aPSUm7aE"
    creator: "Dmitry Chernyshov"
    url: "https://unsplash.com/@oneor0"
---

Back in 2021, I joined a logistics startup called Beacon. I didn't stay long, but I walked away with a company MacBook Pro M1. It should have been sent back, but a major family health emergency happened at the same time and I completely forgot about it in the back of my wardrobe.

Fast forward to September 2025. My son had just gone off to university and, within a week, he'd managed to damage his laptop screen with an ill-timed AirPod case incident. Since he was struggling to use it, I went digging in the cupboards for a spare.

I rediscovered the MacBook and thought I'd see if it was still usable after I'd previously wiped it. It booted up fine, but it was completely locked down with [JAMF](https://www.jamf.com/), and I didn't have any credentials to log in. JAMF is a Mobile Device Management (MDM) system that companies use to manage their company devices.

What followed was a massive rabbit hole of trying to unlock a machine that everyone told me was a "brick." As I struggled to find any concrete information online, I thought I'd share the process here for anyone else facing the same headache.

{% callout "warning" %}
**This won't help you unlock a stolen MacBook.** This post is only for legitimately owned devices that have been released from MDM profiles. It won't help you bypass Activation Lock or features designed to prevent theft.
{% endcallout %}

## The MDM brick wall

Beacon used JAMF to manage their devices. When I tried to boot the laptop, I was greeted with a JAMF login screen asking for a Google Account I no longer had.

I contacted an old friend who is still there. As he's now the head of engineering, they were happy for me to keep the laptop and asked their IT provider to remove it from their MDM system and Apple Business Manager.

I spoke to the provider on the phone and they confirmed it was done. However, when I tried to use the laptop, it still booted to that same JAMF screen. After another call, they told me I'd have to reformat the machine to properly remove the profile.

The problem? When I tried to boot into recovery mode to reinstall macOS, it asked for an admin recovery key. I'd never been given one, and the IT provider had no record of it. It looked like I was stuck.

## Understanding Mac security

This is where I went down a rabbit hole. Since this was an Apple Silicon M1 chip, the security works differently than the old Intel-based Macs.

Essentially, there are two different layers of the security onion:

* **FileVault** is disk encryption. It makes your data unreadable if the laptop is stolen, but it doesn't stop someone from wiping the whole machine.
* **Recovery Lock** is what I was dealing with. It's an MDM hurdle that locks the recovery partition itself. It's there to stop someone from simply hitting "factory reset" on a stolen laptop and reusing it.

I was eventually told by the IT provider to call Apple Support. They suggested that Apple could remove the recovery lock if I provided proof of purchase (which I had). When I finally escalated the issue to someone technical at Apple, he was a bit patronising but somewhat helpful. He confirmed they couldn't actually remove the recovery key as it's a core security feature.

He suggested the MDM hadn't actually been removed since I could still see the login screen. It turned out that this wasn't actually correct, but it confirmed one thing: I was on my own to figure out how to wipe the hardware as nobody knew how to!

Even after a device is removed from Apple Business Manager, M1 Macs seem to keep cached records that still see the machine as a corporate device. Without the recovery key, you're a bit buggered as you can't even enter recovery mode to wipe the drive.

## The solution: DFU restore

After a lot of research, I discovered that recovery locks on M1 Macs can be bypassed using DFU (Device Firmware Update) mode to completely restore the machine. Again, this can only be done if the laptop has been unenrolled from MDM.

DFU mode allows you to reinstall the firmware and OS, bypassing all locks. The downside is that it erases everything on the Mac, but since I couldn't access it anyway, that wasn't an issue.

To give this a go, I needed:

* Another Mac running macOS Sonoma or later.
* [Apple Configurator 2](https://apps.apple.com/us/app/apple-configurator/id1037126344) (a free app from the App Store).
* A USB-C to USB-C data cable (**not** a Thunderbolt cable).
* A hell of a lot of patience!

{% callout "info" %}
**Note:** I found that one of my USB cables didn't work and I'm not 100% sure why. You might have to try a few different ones to get it to click.
{% endcallout %}

## Booting into DFU mode

Getting the MacBook Pro into DFU mode was by far the hardest part. The timing is incredibly precise and it took me multiple attempts over a few hours to get it right.

1. Make sure the locked Mac is completely powered off (hold the power button for 15 seconds).
2. Connect it to your working Mac with the USB-C cable.
3. Open Apple Configurator 2 on your working Mac.

Now for the "Voodoo" timing part:

1. Press and release the power button on the locked Mac.
2. **Immediately** press and hold: Power button + Left Control + Left Option + Right Shift.
3. Hold all four for **exactly 10 seconds**. (I found counting "one-thousand, two-thousand" out loud actually helped).
4. After 10 seconds, release the three keys but **keep holding the power button**.
5. Wait until you see "DFU" appear in Apple Configurator 2 (usually another 5-10 seconds).

The screen should stay completely black. If you see an Apple logo, it's started booting normally and you need to try again. I had to try this at least 20 times before I got the timing right. Don't give up!

## The IPSW secret

Once I got into DFU mode, the restore process kept failing with a generic error while halfway through the update:

```bash
AMRestoreErrorDomain error 10
```

After some help from Claude, I found the key: don't let Apple Configurator download the firmware. Instead, download the macOS firmware file (called an IPSW file) manually.

1. Go to [ipsw.me](https://ipsw.me) on the working Mac.
2. Select your specific MacBook model.
3. Download the latest signed IPSW file (it's usually around 14GB).

In Apple Configurator 2, you just drag that downloaded IPSW file from your folder and drop it onto the large "DFU" icon. This single change made everything work on the first try.

## Victory was mine

The restore took about 30 minutes. When the MacBook finally restarted and showed the "Hello!" welcome screen, I think I actually shouted "FUCK YEAH!" :joy:

The recovery lock was gone. The MDM was gone. It was completely clean and ready to set up as a new laptop. I went through the setup, and it's now working perfectly for my son.

## What I learned

If you're facing a similar situation, here are the small wins to keep in mind:

* **The Cable Matters:** Not all USB-C cables are created equal. If DFU isn't triggering, swap the cable.
* **Manual Downloads:** Always get the IPSW file yourself. It's much more reliable than letting the app handle it.
* **Counting Out Loud:** It sounds stupid, but it's the only way to hit that 10-second window accurately for DFU mode.

It's a frustrating process, but it's definitely possible to recover a bricked device if you have the patience to work through it! :smile:
