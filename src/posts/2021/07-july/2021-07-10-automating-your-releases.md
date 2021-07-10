---
title:  "Automating your releases with semantic-release and GitLab"
permalink: /automating-your-releases-with-semantic-release-and-gitlab/
headerImage: /images/banners/automating-your-releases-with-semantic-release-and-gitlab.jpg
description: In January 2021 I set out to write a new blog post for 30 days. Here's what I learnt from my writing challenge.
tags:
    - writing
    - essay
image:
    source: https://unsplash.com/photos/ZV_64LdGoao
    creator: Pankaj Patel
    url: https://unsplash.com/@pankajpatel
---

## Draft notes

- Semver
- conventional commits
  - Consistent commit messages
  - Standard format for the team
- semantic-release
- git hooks to lint commit messages
- GitLab pipelines
  - Decide on CI and CD steps
- Advantages
  - Atomic PRs - enable easier code reviews
  - Inform stakeholders of changes
  - Release notes
  - Changelog
  - Publish to registry if required
  - Avoid the team spending time on releases
  - Ultimately a faster deployment cadence

## Gotchas

- Committing changelog and package.json to master causes a pipeline to trigger
- Tagging causes a pipeline to trigger
- Reverts expect git revert and don't bump version
- Refactor doesn't bump version