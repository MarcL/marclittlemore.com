---
title:  "Create pretty code screenshots"
subtitle: "Learn how to make pretty code screenshots and impress other developers on Twitter!"
permalink: /create-pretty-code-screenshots/
headerImage: /images/banners/create-pretty-code-screenshots.png
description: "Want to share pretty code screenshots with your developer friends on Twitter? Read on to find out how."
tags:
    - devtip
---

If you're a developer, and you hang out on developer Twitter, then you'll have seen people sharing their hot code tips. They're often accompanied by code examples and the "hot tip" fire 🔥 or lightbulb 💡 emojis.

Here's a great example from [Simon Høiberg](https://twitter.com/SimonHoiberg):

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">JavaScript Tip 💡<br><br>Make an argument &#39;required&#39; in JavaScript using this small trick 👇 <a href="https://t.co/yZ2w5Kd58b">pic.twitter.com/yZ2w5Kd58b</a></p>&mdash; Simon Høiberg (@SimonHoiberg) <a href="https://twitter.com/SimonHoiberg/status/1327314535540162565?ref_src=twsrc%5Etfw">November 13, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

These are _not ordinary code screenshots_ straight from a code editor. They contain the code, syntax highlighting for the language, and are often embedded in a browser window with a colourful background.

**It's a beautiful code screenshot!**

If you read the comments on these code tweets, you'll usually see a list of people asking how to create such pretty code screenshots. So how do we do it?

There are many tools available to create these so let's take a look at how to create them then you can share them too.

## [Carbon](https://carbon.now.sh)

![Carbon screenshot](/images/posts/carbon-screenshot.png)

[Carbon](https://carbon.now.sh/) is one of the easiest tools to use. There are no applications or extensions to install. You can quickly create great looking code screenshots on their website. Their code is also [open source on GitHub](https://github.com/carbon-app/carbon) if you want to use it yourself.

Type your code into their online editor and you can see a prettified version of it inside a Mac-styled window. It allows you to choose a variety of code themes and can syntax highlight your code in various programming languages. You can also alter the background colour, padding, and many other window or editor options. Play around with it to see what you can create.

{% callout "tip" %}
If you use [GitHub gists](https://docs.github.com/en/free-pro-team@latest/github/writing-on-github/creating-gists) then you can create an image from one of those. Append the identifier of your gist to the Carbon URL and you'll see a pretty version of your code. For example here's [my gist](https://gist.github.com/MarcL/0561c83e8445f3ffc801a5a13415abef) and it we use the ID "`0561c83e8445f3ffc801a5a13415abef`" in the Carbon URL like this "`https://carbon.now.sh/0561c83e8445f3ffc801a5a13415abef`" then we see the screenshot above.
{% endcallout %}


## VS Code extensions

If you're a developer who uses [VS Code](https://code.visualstudio.com/) there are a couple of extensions which will make creating pretty code screenshots incredibly easy. VS Code extensions add new features, themes, and more to the editor. If you install one of these extensions, you can avoid the need to use an external website and screenshot your code instantly.

### [Polacode](https://marketplace.visualstudio.com/items?itemName=pnp.polacode)

I've used this extension for a while and it's an easy way to create shareable screenshots of your code without leaving the editor. Install it via the extensions sidebar as you would with other extensions. You can then use the command palatte to choose Polacode. This will bring up a new tab where you can cut and past code into the Polacode window.

![Polacode screenshot](/images/posts/polacode-screenshot.png)

Cutting and pasting code from your open project will allow Polacode to match your current theme. Hit the button underneath the code snippet and you'll get a lovely code screenshot to share. You can update the background colour and shadow using VS Code's settings for the extension. The only issue I have with this extension is that it struggles with longer lines of code. These often wrap onto the next line which isn't as aesthetically pleasing. For this you'll have to edit the code yourself, perhaps using [Prettier](https://prettier.io/) or similar.

### [CodeSnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap)

Similar to Polacode, CodeSnap is another VS Code extension. Again, you can easily install it via the VS Code extensions sidebar. CodeSnap is a bit more fully featured than Polacode and allows more adjustments in the settings menu. It also has quick access by right clicking in the current window to choose it from the pop-up menu.

![CodeSnap screenshot](/images/posts/codesnap-screenshot.png)

One of the advantages of CodeSnap over Polacode is that it automatically captures any text in your clipboard and creates a pretty code screenshot based on that. It's also attempts to

## Non-code screenshots

In some cases you might not need to take screenshots of code. Instead you can make pretty screenshots of websites, photos, or any other image you might have. There are a few ways to do this.

### [Screely](https://www.screely.com/)

![Screely screenshot](/images/posts/screely-screenshot.png)

[Screely](https://www.screely.com/) is a great website which works in a similar way to Carbon. It allows you to use any image file and displays it in a browser-style window. Again, you have the ability to style the image with a variety of options for the background colour, padding, and window type and style. Have fun and make your non-code images beautiful too.

## Using your operating system

While there are websites and code editor extensions you can use, maybe you just want to use your operating system. You can just take screenshots of your code using Windows or Mac OSX. You'll have your styling and code theme exactly the same as you see it on the screen. Let's look at how we can do that.

### Windows users

Windows 10 makes it simple to save a copy of whatever is on your screen by using the "Print Screen" key on your keyboard. This if normally labelled as "PrtScn" on a Windows keyboard and is often located on the top row near the function keys. On laptops, you often have to hold down the function key first before pressing "PrtScn".

If you press "PrtScn" on its own then it will copy the entire screen to the clipboard. You can then paste the image into Microsoft Paint or similar picture editing software.

If you use press the Alt key and "PrtScn" then this copies the active window into the clipboard. Again, you'll need to paste this into your picture editing software to save it.

If you press the Windows key and "PrtScn" then it'll save the entire screen as an image file. This will be saved in the "Pictures" folder in a sub-folder called "Screenshots".

### Mac users

Mac users also have easy ways to create good looking screenshots.

Use "Shift + Command + 4" to turn the cursor into a crosshair. This then allows you to drag and select part of the screen to capture as an image. If you release the mouse, this gets saved to your desktop (unless you've [changed the folder](https://www.macworld.co.uk/how-to/change-where-mac-screenshots-saved-3682381/) you save images to.)

If you press and hold the space bar before releasing the mouse button, you can move the selected area around the screen before taking the screenshot. This is useful for changing your selection and making it pixel perfect. Release the mouse button to save the image to your selected screenshot folder.

If you press "Shift + Command + 4" and then press the space bar, this turns the cursor into a camera icon. If you move over any open window and press the left mouse button, this will save an image of the whole window, including the window bar, to your chosen screenshot folder. This is a great way to make screenshots that look great.

*****

Hold down the Shift key (after dragging to highlight an area but before releasing the mouse button or trackpad): This locks in each side of the selection area made with the crosshairs save the bottom edge, letting you move your mouse up or down to position the bottom edge. 

Without releasing the mouse button, release the Shift key and hit it again to reposition the right edge of your selection area. You can toggle between moving the bottom edge and right edge by keeping the mouse button or touchpad engaged and pressing the Shift key.

Got any other ways to style your images that I've not mentioned? [Send me a message](./contact) and let me know. 