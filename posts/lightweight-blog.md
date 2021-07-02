---
title: Building a Lightweight Blogging CMS in Flask
description: How the original One Word Domains blog was built - with 10 lines of Python code, the Flask-Flatpages library, and a bunch of Markdown files.
date: '2020-11-02'
image: lightweight-blog.webp
---


Ever since launching [One Word Domains](/) five months ago, I've been wanting to set up a blog where I could:

1. Document my [build process](/blog/weekend-project) 
2. Write about some of the coolest programming tips and tricks that I learned in the process (this blog post is one of them)
3. Share some insights on the domain industry - i.e. what are some of the top naming conventions in Silicon Valley

However, I quickly ran into a dilemma when trying to find a suitable blogging CMS (content management system) for my needs:

- Wordpress is easy to set up, but is also an overkill - I don't need 15 different subpages and a full-fledged user management system (I'm already [using PostgreSQL](https://www.indiehackers.com/post/flask-login-postgresql-for-the-win-915ae02eb2) for that)
- Ghost is a little more challenging to set up (here's a great [guide](https://dev.to/m1guelpf/a-ghost-blog-for-0-pfi) if you're into that) but would require setting up an extra dyno on Heroku or a VPS on Digital Ocean - which would mean an extra $5 - $7 a month
- Medium is relatively pain-free to set up, but is pretty limited when it comes to customization + you're not really helping your site's SEO with your posts since you'll be contributing to Medium's SEO instead

What I was looking for was a **simple and free static-site solution** that was easy to customize + integrates well with my existing stack (Heroku, Flask, PostgreSQL, Python, HTML/CSS, JavaScript, jQuery).

I decided to consult my friend [Linus](https://thesephist.com/), who recommended the [Python-Markdown](https://github.com/Python-Markdown/markdown) library - which is the same framework that [Pelican](https://blog.getpelican.com/) (the Python version of [Hugo](https://gohugo.io/)) uses. 

Intrigued, I began researching the origins of the Python-Markdown library, and that's when I came across this [blog post](https://www.jamesharding.ca/posts/simple-static-markdown-blog-in-flask/) by James Harding. 10 lines of code later, I've successfully set up my very own Markdown-powered static site for the [One Word Domains Blog](/blog).

Here's how everything went down, step by step:

## Requirements

First, I imported the `Flask-FlatPages` and `Markdown` libraries:

```python
import markdown
from flask_flatpages import FlatPages
```



...and declared them in my `requirements.txt` file:

```python
Flask-FlatPages==0.7.1
Markdown==3.2.1
```


## Folder Structure

Since I already had an existing Flask app up and running, all I did next was add a `/posts` folder at the root directory, a separate folder called `blog-images` under the `/static/assets` folder, and a few template files in the `/templates` folder. Here's a rough overview on how my folders were structured:

<pre>
  ├──app.py
  ├──posts
  │		└──post1.md
  │		└──post2.md
  ├──templates
  │		└──blog.html
  │		└──post.html
  └──static
  		└──assets
  		│		└──blog-images
  		└──script
  		└──styles
</pre>



## Define FlatPages ENV Variables

Before I started setting up the Flask routes for my blog, I defined the `ENV` variables for `FlatPages` in my `app.py` file, right after initiating the Flask app:

```python
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = ''
POST_DIR = 'posts'

flatpages = FlatPages(app)
app.config.from_object(__name__)
```

Here, I defined `FLATPAGES_ROOT` as `''` because the folder containing all my markdown files, `posts`, is located in the root directory – which is why `POST_DIR` is defined as `'post'`.



## Flask Routes

Here are the 10 lines of code that I mentioned earlier – which I inserted into my `app.py` file:

```python
@app.route("/blog")
def blog():
    posts = [p for p in flatpages if p.path.startswith('posts')]
    posts.sort(key=lambda item:dt.strptime(item['date'], "%B %d, %Y"), reverse=True)
    return render_template("blog.html", posts=posts)

@app.route("/blog/<permalink>")
def blog_post(permalink):
    path = '{}/{}'.format('posts', permalink)
    post = flatpages.get_or_404(path)
    return render_template('post.html', post=post)
```

*I know, I couldn't believe it either.* 

10 lines of Python code was all I needed to get the One Word Domains Blog up and running.

Let's dive deeper into the lines of code above and see what each one of them does:

- The first route, `/blog` hosts the landing page of the blog. Here, the code iterates across all the Markdown files present in the `/posts` folder and interprets them in the form of a `flatpages` object. It then sorts them in descending order by published date – here, I'm using the `dt.strptime()` method because my dates are written in natural language format (*October 30, 2020*). Lastly, the code renders the `blog.html` template and sends over all the posts as jinja variables. 
- The second route, `/blog/<permalink>` takes care of the individual blog posts. The first line of code creates the composite path for each of the Markdown files, which is in the format `/posts/post1.md`. It then gets the files with the `flatpages` module and renders the `post.html` template along with all the attributes of the particular blog post.



## Markdown Format

Let's take a look at the format of a given Markdown file, say, *the one for this blog post*, for example:

```markdown
title: Building A Lightweight Blogging CMS In 10 Lines of Code
subtitle: This is the full story of how The One Word Domains blog was built - with 10 lines of Python code, the Flask-Flatpages library, and a bunch of Markdown files.
date: November 2, 2020
image: post2-thumbnail.png
permalink: markdown-flask-lightweight-cms
```




Ever since launching One Word Domains five months ago... (content)</pre>

As you can see, each Markdown file has the following attributes:

- `title`: The title of the blog post
- `subtitle`: The subtitle, or 'tagline' of a blog post, usually written to give more context on the post
- `date`: The date the blog post was published
- `image`: The thumbnail image for the blog post, stored within the `/static/assets/blog-images` folder that I mentioned earlier
- `permalink`: The canonical URL for the blog post. Protip: try and use dashes and keep this below [74 characters](https://en.ryte.com/wiki/URL_Length#:~:text=A%20URL%20should%20not%20exceed,Through%20Rate%20of%20the%20snippet.) so that it doesn't get truncated in the search results
- `content`, or `html`: The bulk of the blog post's content 

## HTML Templates

Here's a rough outline of my `blog.html` template:

```markup
{% for post in posts %}
<a href="/blog/{{ post.permalink }}">
   <img src="/static/assets/blog-images/{{ post.image }}"/>
   <h1>{{ post.title }}</h1> 
   <p>{{ post.date }}</p>
   <p>{{ post.subtitle }}</p>
</a>
{% endfor %}
```



This code will iterate across all the Markdown files in the `/posts` folder that I set up earlier and auto-generate previews for each and every one of them.

And here's the one for my  `post.html` file:

```markup
<img src="/static/assets/blog-images/{{ post.image }}"/>
<h1>{{ post.title }}</h1> 
<p>{{ post.date }}</p>
{{ post.html|safe }}
```









## Compile and Run

If everything went well, your blog should be live at `127.0.0.1:5000/blog` once you run `$ python app.py` in your terminal. Yay!

Or, if you're like me and you run into a bunch of errors in your first few attempts - don't give up! Debug your code by pasting the error messages into Google and clicking on the first Stackoverflow post that pops up. 

Good luck!

## Bonus: Typora

I first started editing my Markdown files in Sublime, which was rather mechanical and cumbersome.

Then, everything changed when <s>the fire nation attacked</s> I discovered this free tool, [Typora](https://typora.io/) (or at least, "*free during beta*", as stated on their site). The intuitive and seamless writing experience that Typora provides is unparalleled, and while **this is not an ad, I highly recommend trying it out.



<br>