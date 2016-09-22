---
layout: post
title:  "Finding Bugs Using Git Bisect"
subtitle: "Bisect your way to success"
permalink: /posts/finding-bugs-using-git-bisect/
header-img: images/posts/computer-code.jpg
categories:
    - git
    - development

enableComments: true
---

### A wild bug appears

{% highlight ruby %}
def foo
  puts 'foo'
end
{% endhighlight %}

{% highlight javascript %}
const test = () => {
    let blah = 0;
    const myArray = [];
    myArray.forEach(() => {

    });
};
{% endhighlight %}

{% highlight shell %}
git bisect start
{% endhighlight %}

```
git bisect start
```

http://rogerdudler.github.io/git-guide/

### Determine when it broke in the first place

### Split the commits

Process of elimination.

### Find the guilty commit

### Wrap up

For more information have a read of this great git article on [debugging with git](https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git). Alternatively, you can read the [git bisect documentation](https://git-scm.com/docs/git-bisect).

