---
title:  "A beginner's guide to using the Obsidian Notes application"
subtitle: "Discover the Power of Obsidian Notes for Writing, Planning and Productivity"
permalink: /beginners-guide-note-taking-obsidian/
headerImage: /images/banners/second-brain-note-taking-obsidian.jpg
description: "Learn how to use the Obsidian Notes app with this simple beginner's guide. Improve your note-taking and productivity."
tags:
    - writing
image:
    source: https://unsplash.com/photos/IHfOpAzzjHM
    creator: Robina Weermeijer
    url: https://unsplash.com/@averey

updatedDate: 2022-11-08

# Keywords we're targeting
keyword: "obsidian notes"
---

I write a lot of notes both in my job and in my personal life. I've tried a lot of different note taking applications over the years and more recently I've started using [Obsidian Notes](https://obsidian.md/) as my application of choice.

Let's look at how to use the Obsidian Notes application for writing clearer notes.

## What is the Obsidian Notes taking app?

**The Obsidian app is a beautiful, FREE note taking application which allows you to create and store your notes locally in the [Markdown](https://www.markdownguide.org/) file format. It allows you to link notes together and create a knowledge graph of information.**

**Obsidian notes are stored locally as files on your computer rather than in the cloud. Obsidian has a text editor which allows you to add markdown formatting to your notes. It also has a preview mode which allows you to see how your notes will look when they are rendered as HTML.**

As a developer, Markdown is a format I write in regularly and this made the Obsidian app a perfect tool for me. 

{% callout "info" %}
While you can use the Obsidian app to edit your notes, markdown is a common format for software developers so **you can also edit your notes using any text editor that supports the markdown format.**

If you're a software developer, you can use a tool like [Visual Studio Code](https://code.visualstudio.com/) to edit your notes if you like.
{% endcallout %}

### Obsidian notes are stored locally

**An important thing to know about the Obsidian app is that it stores your markdown notes locally on your computer rather than in the cloud. Obsidian notes are simply a folder of plain text files.**

As the files are stored locally, you never have to worry about a service being shut down or changing their pricing model. Markdown is an almost standard format so you can move your notes to a new note-taking application if you needed to.

The downside of the files being stored locally is that you're now responsible for backing up your data. However, this is easily done using Google Drive, Dropbox, OneDrive, or some other online storage method. If you're a developer, you can even use a `git` repository to store your notes.

### Obsidian links notes together in a knowledge graph

Obsidian is a tool which claims to give you "a [second brain](https://fortelabs.co/blog/basboverview/), forever". This means it can store all of your notes and help you to link each note's idea together.

Linking your Obsidian notes together is known as a knowledge graph. It's a series of interlinked notes which allows you to find common themes between your notes. This knowledge graph is also found in the tool [Roam Research](https://roamresearch.com/). 

Linked notes is one of the great ideas behind Obsidian and Roam Research. By tagging concepts in your notes, and linking them to other notes using internal links, you slowly build up a graph which helps to you to discover similar ideas and thinking.

Here's an example of my current set of notes in Obsidian:

![Obsidian Graph](/images/posts/obsidian-graph.jpg)

## What is Personal Knowledge Management?

This year I discovered the idea of [personal knowledge management](https://en.wikipedia.org/wiki/Personal_knowledge_management) (PKM). This is the idea of collecting and classifying your thoughts so that they can be easily retrieved but also help you to make sense out of them. It hadn't occurred to me that I should be bringing all of my notes together so that I could build new ideas from them. I mostly used the search functionality in any notes applications to find things I'd recorded when I needed them. Reading about PKM brought me to a tool called [Roam Research](https://roamresearch.com/) which shared the idea of networked thought. It gives the user a way to link notes together in a more coherent way to create a graph of connected thinking. I used this for a while but I was looking for something in the open source space. And then I finally discovered [Obsidian](https://obsidian.md/).

Using Obsidian for the last 4 or 5 months has really helped me to organise my notes and has started me on a journey to creating new ideas from concepts I find rather than letting the notes wither away and die.
## How do I get started with Obsidian?

At the time of writing this, Obsidian is a note-taking application that is available for Mac, Windows, and Linux.

You can easily [download Obsidian from their website](https://obsidian.md/download) and then install it on your local computer.

Once Obsidian is installed, you'll be asked to create or open a vault. An Obsidian vault is simply a directory within which your notes will be stored as Markdown files. Obsidians notes are just a folder of plain text markdown files.

Choose "create" if you don't have any files that you've already created. Alternatively you can open a folder which contains existing Markdown files and they will be imported into Obsidian as a new vault.

Once you're set up you can click on "create note" to create a new Markdown file for a new note.

## How do I create a markdown file in Obsidian?

Each new note that's created is a Markdown file. [Markdown syntax](https://www.markdownguide.org/getting-started/) is relatively easy to get started with. It's a plaintext file format with specific syntax which maps to an HTML element.

Here's are some examples of Markdown syntax:

{% codetitle "example-markdown.md" "An example Markdown file" %}

```markdown
# A main header

Some text as a paragraph. But this text is **bold** and this is in *italics*.

## A secondary header

Another paragraph with some `inline code` in it.

A [link](https://another-website.com/) to an external URL.
```

## What are Obsidian backlinks?

While Markdown supports hyperlinking to another internal or external page using its link format, Obsidian adds the idea of the **backlink**.

Normal links in markdown files are mono-directional which means that a link points to the new page only.

Obsidian backlinks allow bi-directional linking. This means that if page A links to page B, Obsidian also knows that page B is linking back to page A. This allows ideas to start linking together as you write new notes which creates a knowledge graph of linked notes.

Obsidian backlinks are created using the [Wikilink](https://en.wikipedia.org/wiki/Help:Link#Wikilinks_(internal_links)) format using double brackets. Here is an example of how to create a note which links to another page:

{% codetitle "obsidian-backlink.md" "Obsidian backlinks example" %}

```markdown
# My new note

I want this note to link to [[another note]] using Obisidian backlinks.
```

By default, Obsidian will link to a new note but it won't create it until you follow the link. Pressing `CMD + click` (Mac) or `CTRL + click` (Windows) on the link will take you to a new page and then the note is created in your vault.

### What are Obsidian mentions?

Obsidian backlinks are really useful for seeing which ideas link together in your notes. For each note, it has the concept of linked and unlinked mentions.

#### Obsidian linked mentions

Obsidian linked mentions are backlinks in a note that contain an internal link to the active note. This are created when you explicitly link one page to another using the `[[backlink]]` format.

#### Obsidian unlinked mentions

Obsidian unlinked mentions are backlinks in a note that contain references to the page from another note but you haven't explicitly linked to it. Using these unlinked mentions, you can quickly see how ideas from multiple notes are related and could be linked together.

The idea of linked and unlinked mentions are really useful to see how your notes are related to each other. You can use these backlinks to expand your thoughts and allow you to create new ideas from them.

Here's an example of some linked and unlinked mentions from when I was building a [Google Firebase](https://firebase.google.com/) project and documenting my learning:

![Obsidian linked and unlinked mentions](/images/posts/obsidian-linked-unlinked-mentions.jpg)

### What are Obsidian tags?

In addition to linking notes together, Obsidian allows you to use tags. Tags are another kind of link.

Adding tags to a note can make them easier to find in searches if you have a large vault of notes. They're helpful for adding context to your notes and allowing you to group them together. In your Markdown files you add a new tag using a Twitter-style hashtag.

For example, in my own Obsidian vault, I use `#toread` or `#towatch` to gather blog posts or YouTube videos I should watch and take notes from.

{% codetitle "obsidian-tags.md" "Obsidian tags example" %}

```markdown
# An example note

Here are a list of tags for this note:

#toread #towatch #a-long-tag-name
```

### Should I use Obsidian tags or links?

You can and should use both tags and links in your notes.

Links are connections from one Obsidian note to another note. And as I mentioned earlier, they're bi-directional so the notes are both linked together with a backlink.

Tags are connections from a note to an idea. A tag is a link but it has no note linked to it.

So you don't really have to choose between links and tags. Why not use both?

I find that tags are useful for grouping notes together and links are useful for connecting ideas together. They are complimentary and you can easily use both together.

### Differences between Obsidian tags and links

While you can use both tags and links together, there are a few important things to remember.
- When you change the name of a file within Obsidian, all links to that folder will automatically change to be pointing to the right place. This won't happen with tags.
- Clicking on a tag will open a search for all of the files that contain that tag.
- Clicking on a link will open the linked note if it exists or create a new one if it doesn't.

## What is the Obsidian graph view?

Obsidian allows you to create an unlimited vault of notes but its power comes in linking these notes together.

The Obsidian graph view allows you to visualise connections between your notes and encourages you to explore how your thinking is linked together.

To see the graph view click on "open graph view" in the Obsidian sidebar. This extended view allows you to filter by specific keywords or tags that you use in your notes.

Here's an example of notes related to my use of Obsidian:

![Obsidian graph view](/images/posts/obsidian-graph-view.jpg)

## Conclusion

I've only scratched the surface with what Obsidian can do for your personal knowledge management system.

Obsidian has a fantastic plugin system which allows more functionality to be added to it. These plugins are built by the Obsidian team and also from other developers.

It also has a wonderful community around it and each of the Obsidian forum members are incredibly helpful. They all want others to learn how to get the best out of Obsidian. You can find their [forums here](https://forum.obsidian.md/).

Obsidian is constantly being improved by the developers with new releases coming out every couple of weeks. Before you know it you'll be heading down the rabbit hole of [building a second brain](https://fortelabs.co/blog/basboverview/) and [Zettlekasten](https://zettelkasten.de/posts/overview/) like I have.

Take a look at Obsidian if you're considering levelling up your note taking system and [let me know what you think](/contact/).

## Frequently asked questions (FAQ) about Obsidian notes
### What is Obsidian notes?

Obsidian is a powerful note-taking application that allows you to create a folder of plaintext files for your notes. It's a great tool for personal knowledge management and allows you to create one or more vaults of notes that are linked together.

### How to backlink in Obsidian?

To create a backlink in Obsidian, you use the Wikilink format using double brackets. For example, to link to another note called "another note" you would use `[[another note]]`. This links your current note to "another note" and also provides a backlink from "another note" to your current note.

### Is Obsidian Notes better than Notion?

Notion is a powerful web application which allows you to write notes, create tasks, and manage projects of content. While it has similarities with Obsidian in its ability to create notes, it's a very different tool for managing projects and content with a focus on collaboration.

Obsidian is a private and secure way to store your own notes and ideas on your local computer.
### Are Obsidian notes safe?

By default Obsidian stores everything locally in a folder of plaintext files. This means that your notes are only accessible on your computer and not on the internet. This makes it a very secure and private way to store your notes.

You can sign up to Obsidian's paid service [Obsidian Sync](https://obsidian.md/sync) if you want to synchronise your notes to the cloud and share them with multiple computers. This is private and encrypted so it's still a safe way to store your notes.

### Is Obsidian hard to learn?

The hardest part of learning Obsidian is understanding the Markdown format. If you're unfamiliar with it, spend a couple of hours creating notes and reading a Markdown formatting guide. Once you've got the basics down, you'll be able to create notes quickly and easily in Obsidian.

Obsidian's backlinks are really easy to learn and once you understand how they work, you'll be able to create connections between your notes in seconds.

The most complicated part of Obsidian is deciding how you want to organise your notes. This is up to the individual to decide and experiment with. There's no right or wrong way to do it. You can use tags, backlinks, folders, or a combination of both to organise your notes.

### Is Obsidian good for note-taking?

I love it for note-taking! 😄

You can keep it simple and write a note in Markdown format. You can link those notes together and create a vault of information. You can link those notes together and start to see how your thinking is linked.

### Does Obsidian have a mobile app?

Yes! Obsidian has a mobile app and it works in the same way as the desktop application.

You can down load the [Obsidian mobile app here](https://obsidian.md/mobile).
### Who is Obsidian notes best for?

Obsidian is a powerful note-taking application for many different sorts of people. Not everyone will use it in the same way, but it's useful in different ways.

#### Obsidian for software engineers

I'm a software engineering manager but I still have to stay technical. I use Obsidian to take notes on the latest technologies and frameworks I'm exploring. I also use it to take notes with my team when I conduct 1:1s, for meeting notes, and for any notes that I take as I read books or watch videos.

#### Obsidian for university students

Obsidian is the perfect tool for taking notes for university students. You can create a vault for all of your subjects or you could split it into separate vaults for the different areas of your course.

The ability to link your notes together will really help you to understand how your studies are linked together. This will be especially useful when you come to revise for your exams.

#### Obsidian for academics and researchers

Obsidian is the perfect tool if you work in academia and are researching and writing a new paper. You can create a vault for your research and create new notes for all of your ideas.

Linking your Obsidian notes together will really help to ensure you have citations in your papers and you can easily find the sources you used.
#### Obsidian for writers

Obsidian is the perfect tool for writers. You can create new notes for articles that you find on the internet or for any videos that you watch.

Take notes of the ideas that you find and start to link them together using Obsidian backlinks. By capturing snippets of linked notes, you can easily research and write your next article.

## Useful resources to learn more about Obsidian notes

[Francesco D'Alessio](https://twitter.com/francescod_ales) from [Keep Productive](https://www.keepproductive.com/) has a great getting started guide for Obsidian:

https://www.youtube.com/watch?v=bLoukY64gYk

[Nick Milo](https://twitter.com/nickmilo) has a really helpful set of videos on using Obsidian. He also has a course called [Linking Your Thinking](https://www.linkingyourthinking.com/) which helps you to build your own personal knowledge management system.

https://www.youtube.com/watch?v=QgbLb6QCK88

[Justin DiRose](https://twitter.com/justindirose) from [Effective Remote Working](https://effectiveremotework.com/) has a great set of videos on learning Obsidian too so start here:

https://www.youtube.com/watch?v=LDPrRQFgJxI

