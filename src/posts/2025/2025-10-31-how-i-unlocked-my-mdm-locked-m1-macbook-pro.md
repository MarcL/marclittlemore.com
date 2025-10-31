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

A few weeks ago, I found myself staring at a MacBook Pro that had become an expensive paperweight. It was a laptop I'd been given by my previous employer, Beacon, when I left the company three years ago. It had been sitting in a cupboard ever since, and I thought it was time to put it to good use.

The problem? It was completely locked down with MDM (Mobile Device Management) software and I couldn't get past the recovery lock screen.

Let me show you how I finally got it working again using Apple Configurator 2 and a process called DFU restore.

## What was the problem?

When I tried to boot up the MacBook Pro, I was greeted with a Jamf login screen asking for a Google Account. Beacon had been using Jamf as their MDM solution to manage company devices.

I contacted Beacon and they were happy for me to keep the laptop. They asked their IT provider, Jigsaw24, to remove it from their MDM system and Apple Business Manager. Jigsaw24 confirmed they'd done this, but when I tried to use the laptop again, it still booted to the same Jamf screen.

When I tried to boot into recovery mode to reinstall macOS, it asked for an admin recovery key. Unfortunately, Jigsaw24 had already deleted the password from their systems and couldn't provide it.

I was stuck with a bricked laptop.

## Understanding the M1 Mac difference

Here's something important I learned: M1 Macs (Apple Silicon) handle security differently from older Intel-based Macs.

Intel Macs with the T2 chip used something called a "firmware password" to lock down the computer. M1 Macs don't support firmware passwords at all. Instead, they use a "Recovery Lock" which is set through MDM software.

Even after a device is removed from Apple Business Manager and MDM, M1 Macs can retain cached activation records that still see the machine as a corporate device. This is exactly what happened to me.

I called Apple Support and they confirmed they couldn't help without the original proof of purchase from when Beacon first bought the laptop. This is a security feature to prevent stolen devices from being unlocked.

## The solution: DFU restore with Apple Configurator 2

After a lot of research, I discovered that recovery locks on M1 Macs can be bypassed by using something called DFU (Device Firmware Update) mode to completely restore the machine.

DFU mode is a special startup mode that allows you to reinstall the firmware and operating system, bypassing all locks including the recovery lock. The downside is that it completely erases everything on the Mac, but since this was a company laptop I couldn't access anyway, that wasn't a problem.

Here's what I needed:

- Another Mac running macOS Sonoma 14 or later
- Apple Configurator 2 (a free app from the Mac App Store)
- A USB-C to USB-C data cable (importantly, NOT a Thunderbolt cable)
- The power adapter for the locked MacBook Pro
- A lot of patience!

## Getting started with Apple Configurator 2

I started by installing Apple Configurator 2 on my working Mac from the App Store. This is a free tool that Apple provides for managing iOS and macOS devices.

I made sure my working Mac was connected to power and had a stable internet connection. I'd recommend using Ethernet if possible as you'll be downloading a large firmware file.

## Booting into DFU mode (the tricky part)

Getting the M1 MacBook Pro into DFU mode was by far the hardest part of this process. The timing is incredibly precise and it took me multiple attempts to get it right.

Here's what you need to do:

1. Make sure the locked MacBook Pro is completely powered off (hold the power button for 15 seconds)
2. Connect it to your working Mac using the USB-C cable
3. Connect the locked MacBook Pro to its power adapter
4. Open Apple Configurator 2 on your working Mac

Now comes the timing-critical part:

1. Press and release the power button on the locked MacBook Pro
2. Immediately press and hold all four keys simultaneously: Power button + Left Control + Left Option + Right Shift
3. Hold all four keys for exactly 10 seconds
4. After 10 seconds, release the three keyboard keys but keep holding the power button
5. Continue holding the power button until you see "DFU" appear in Apple Configurator 2 (usually another 5-10 seconds)

An important note: the MacBook Pro's screen should stay completely black during this entire process. If you see an Apple logo, it means the Mac has started booting normally and you need to try again.

I had to try this about 8-10 times before I got the timing right. Don't give up! Count out loud to maintain the timing.

## Downloading the IPSW file first

Once I could get into DFU mode reliably, I faced another problem: the restore process kept failing with error messages.

After the fourth failed attempt, I discovered the key to success: pre-downloading the macOS firmware file (called an IPSW file) instead of letting Apple Configurator 2 download it during the restore.

Here's what I did:

1. Went to https://ipsw.me on my working Mac
2. Selected MacBook Pro from the list
3. Selected my specific model (MacBook Pro 16-inch, 2021, M1)
4. Downloaded the latest signed IPSW file (it was about 13-15 GB)
5. Saved it to my Desktop

This single change made all the difference.

## Performing the restore

With the IPSW file downloaded and my MacBook Pro in DFU mode, I was ready to perform the restore.

In Apple Configurator 2, I could see a large "DFU" icon representing my locked MacBook Pro. I simply dragged the IPSW file from my Desktop and dropped it onto the DFU icon.

This started the restore process. I could see progress bars showing:
- Preparing...
- Installing (Step 1 of 4, 2 of 4, etc.)

The entire process took about 30-40 minutes. During this time, the Apple logo appeared and disappeared on the MacBook Pro a few times - this is completely normal.

I made sure neither Mac went to sleep during this process and kept everything plugged in.

## Success!

When the restore completed, the MacBook Pro automatically restarted and booted into the macOS Setup Assistant - the "Welcome" screen you see on a brand new Mac.

The recovery lock was gone. The MDM enrollment was gone. It was completely clean and ready to set up as my own.

I went through the setup process, created a user account, and the MacBook Pro was finally working properly. I'm now setting it up for my son to use at university.

## Common issues I encountered

**Getting into DFU mode was incredibly frustrating**

The timing has to be absolutely precise. All four keys must be pressed at exactly the same moment. I found it helpful to position my fingers hovering over the keys before starting, then press them all together like playing a chord on a piano. Counting out loud helped me maintain the timing.

It took me 8-10 attempts before I successfully got into DFU mode. If you see the Apple logo appear on the screen, you've missed the window and the Mac has started booting normally. Just power it off and try again.

**Not all USB-C cables work**

I initially struggled to get into DFU mode and it turned out my USB-C cable was the problem. Once I switched to the charging cable that came with the MacBook Pro, everything worked perfectly.

Make sure you're using a regular USB-C data cable and NOT a Thunderbolt 3 or 4 cable. Thunderbolt cables won't work for this process.

**The restore kept failing with error messages**

After successfully getting into DFU mode, I tried to restore the Mac four times and each time it failed with "AMRestoreErrorDomain error 10". This was incredibly frustrating after all the work to get into DFU mode.

The solution was pre-downloading the IPSW firmware file from ipsw.me instead of letting Apple Configurator 2 download it during the restore. This eliminates network issues during the critical restore phase. Once I did this, the restore completed successfully on the first attempt.

**Keeping both Macs awake**

During my failed attempts, I realized that my working Mac was going to sleep partway through the download, which was causing the restore to fail. I had to adjust my Energy Saver settings to prevent sleep during the process.

Make sure both Macs stay awake and connected to power throughout the entire restore process, which can take 30-60 minutes.

## What I learned

Here are the key things I learned from this experience:

**M1 Macs are different:** They don't use firmware passwords like Intel Macs. Recovery locks can only be removed by completely restoring the firmware via DFU mode.

**DFU timing is frustrating but achievable:** Getting into DFU mode requires incredibly precise timing. It's normal to need 5-15 attempts. Don't give up! The key is pressing all four keys simultaneously and maintaining exact timing.

**Pre-download the IPSW file:** This was the key to my success. Downloading the firmware file first eliminates network issues during the restore process and significantly improves your chances of success.

**Cable matters:** Make sure you're using a proper USB-C data cable, not a Thunderbolt cable. The charging cable that came with the MacBook Pro works perfectly.

**This completely wipes the Mac:** A DFU restore erases everything. All data is lost, but all locks are also removed.

**Patience is essential:** The entire process from start to finish took me about 3 hours, including all the failed DFU attempts and restore errors. Set aside enough time and don't rush it.

## Example use cases

While I used this process to unlock a corporate MacBook Pro that I'd been given, this same method can be used for:

**Forgotten recovery locks:** If you've set a recovery lock via MDM and forgotten the password, this will remove it.

**Purchased second-hand Mac:** If you've bought a used M1 Mac that still has MDM enrollment (though you should always check this before purchasing).

**Decommissioned corporate devices:** If your company is properly decommissioning Macs and removing them from Apple Business Manager, but the recovery lock persists.

**Unresponsive M1 Macs:** If your M1 Mac has become completely unresponsive due to a failed update or other issue, DFU restore can bring it back to life.

## Frequently asked questions (FAQ)

### Can Apple Support remove the recovery lock?

Apple Consumer Support cannot remove recovery locks without the original proof of purchase from when the device was first purchased. You might have better luck with Apple Business Support if you have written authorization from the original corporate owner, but this is uncertain.

### Will this work on Intel Macs?

This process works for M1 Macs (Apple Silicon). Intel Macs with the T2 chip use a different process, though Apple Configurator 2 can also help with those. The key difference is that Intel T2 Macs can have firmware passwords removed via DFU restore as well.

### Do I need to contact my former employer?

If your former employer is willing to help, the easiest solution is for them to provide the recovery lock password. However, many companies delete these passwords when employees leave. In that case, the DFU restore method is your best option.

### How long does the whole process take?

Getting into DFU mode can take 30-60 minutes of attempts if you're struggling with the timing. Once you're in DFU mode and have the IPSW file ready, the actual restore takes 30-60 minutes depending on your computer's speed. Budget at least 2-3 hours for the entire process.

### Will I lose all my data?

Yes. A DFU restore completely erases the Mac and reinstalls everything from scratch. However, if you can't access the Mac due to the recovery lock, you don't have access to that data anyway.

### Can I do this on my own or do I need to take it to Apple?

You can do this on your own if you have access to another Mac. An Apple Store or Apple Authorized Service Provider can also perform this process for you if you prefer professional help.

### What if I don't have another Mac?

You need another Mac to use Apple Configurator 2. If you don't have one, you could borrow one from a friend, or take the locked Mac to an Apple Store or authorized repair center.

## Useful resources

- [Apple Configurator 2](https://apps.apple.com/app/apple-configurator-2/id1037126344) - Free download from the Mac App Store
- [ipsw.me](https://ipsw.me) - Download macOS firmware files
- [Apple's official guide](https://support.apple.com/guide/apple-configurator-2/revive-or-restore-a-mac-with-apple-silicon-apdd5f3c75ad/mac) - How to revive or restore a Mac with Apple silicon
- [Mr. Macintosh's guide](https://mrmacintosh.com/restore-macos-firmware-on-an-apple-silicon-mac-boot-to-dfu-mode/) - Detailed video tutorial on DFU mode

I hope this helps anyone else who finds themselves in a similar situation with a locked M1 Mac. It's a frustrating process, but it's definitely possible to recover a locked device if you have the patience to work through it! 😄

