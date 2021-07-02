---
title: How One Word Domains Started as a Weekend Project
description: How we built One Word Domains in a weekend and got to the top of Product Hunt and the front page of Hacker News.
date: '2020-05-30'
image: weekend-project.webp
---



The month of May has been a fairly crazy one. It started out like any other, with me trying to come up with a decent, catchy name for my latest side project that still had an available domain name associated with it. Since it was a tech-related startup, I was considering top-level domains (TLDs) like [.ai](https://www.oneword.domains/available-ai-domains/), [.io](https://www.oneword.domains/available-io-domains/), [.co](https://www.oneword.domains/available-co-domains/), and [.com](https://www.oneword.domains/available-com-domains/).

But then a thought struck me.

*"What if there was a tool that allowed me to browse through all the available domain names out there and pick the best one?"*

I did some Googling. And more Googling. Half an hour later, I came to the realization that such a tool...didn't exist. I know, I couldn't believe it either. The closest resource I could find was [Dictionary Domains](https://dictionarydomains.io/), which had a list of dictionary words paired with TLDs like .ca, and .io, but most of the words were either the present continuous tense of a root word ("saying", "hiding") or paired with "-ly" suffixes ("particularly", "apparently").

But I was looking for words that were more startup-y (if that's even a word), words like "[orchard](https://orchard.com/)", "[notion](https://www.notion.so/)", "[pocket](https://getpocket.com/)", "[canny](https://canny.io/)", or "[bloom](https://bloom.co/)".

And then I thought - *why not make it myself?* As a data science student at [Minerva](https://www.minerva.kgi.edu/), I have plenty of experience [wrangling data](https://en.wikipedia.org/wiki/Data_wrangling) with Python, but I haven't yet had the chance to build something that was more applicable in real life. This would be the perfect chance for me to do so.

*And so the journey began.*

## The Process

I set a goal for myself to build this tool in a week - partly because I didn't want to waste too much time if it didn't work out, but also because I'm a fan of hackathons and I was excited to see what I could actually build in a week.

Here's a simplified version of my thought process:

1. Find an open-source dataset that had a list of all the most commonly used words in the English language.
2. Parse through those words and separate them into different categories: adjectives, nouns, verbs.
3. Find a free (preferably) API that would allow me to perform bulk WHOIS checks for a list of domains to determine their availability.
4. Write a script that would pair them up with the respective TLDs and run the bulk WHOIS checks.
5. Get the list of available domains and visualize them using HTML, CSS, and vanilla JS.
6. Launch the MVP on Product Hunt to get feedback.

With this rough framework in mind, I set off on my first ever web development journey.

## Finding the Dataset

Finding the dataset wasn't too hard - I literally typed in "top 10000 most common English words Github" and the first result that popped up was pretty [promising](https://github.com/first20hours/google-10000-english).

Then, instead of using Hidden Markov Models to create a [Part-Of-Speech Tagger](https://nlp.stanford.edu/software/tagger.html) (POS Tagger) that would parse through that list and categorize the words into adjectives, verbs, and nouns, I decided to save some time and do some more Googling. By doing that, I found this wonderful [repository](https://gist.github.com/hugsy/8910dc78d208e40de42deb29e62df913) that had everything I needed.

## Finding A (Free) WHOIS API

This took a while to nail down. Inspired by this [blog post](https://www.8bitavenue.com/godaddy-domain-name-api-in-python/), I started out by using the Godaddy API, but it turned out to give a lot of false positives - i.e. the API would say that the domain is available when it's actually not. Plus it would crash if I sent too many requests within a given timeframe, so I eventually scratched it and opted for the [Namecheap API](https://www.namecheap.com/support/api/methods/domains/check/) instead - which could also tell us if a given domain is a Premium domain or not. 

Here's the code I came up with:

```python
import requests
import time
import xml.etree.ElementTree as ET

# Namecheap API
url = "https://api.namecheap.com/xml.response?ApiUser=[NAMECHEAP-USERNAME]ApiKey=[API-KEY]&UserName=[NAMECHEAP-USERNAME]&ClientIp=[YOUR-IP-ADDRESS]&RequestIP=[YOUR-IP-ADDRESS]&Command=namecheap.domains.check"

# 40 names per chunk is the 10 below the limit of 50
chunk_size = 40

def check_available_domains(domain_list):

    # Split the original array into subarrays
    domain_chunks = []
    for i in range(0, len(all_domains), chunk_size):
        domain_chunks.append(all_domains[i:i + chunk_size])

    # Create empty list to store available domains
    available_domains = []

    for domains in domain_chunks:
        # Get availability and premium info by calling Namecheap API
        response = requests.post(url, data={'DomainList': domains})
        responseXml = ET.fromstring(response.content)
        for domain in responseXml.iter('{http://api.namecheap.com/xml.response}DomainCheckResult'):
            print("Domain: " + domain.attrib['Domain'], "Available: " + domain.attrib['Available'], "Premium: " + domain.attrib['IsPremiumName'])
        print("-----------------------------------------------")
        # API call frequency should be ~ 20 calls per minute 
        time.sleep(5)
```



With that code, I was able to parse through over 15,000 words and find all the available domain names for the .ai, .co, .com, and .io TLDs.

## Building The Site

Now comes the fun part. I've had a bit of prior experience with HTML/CSS when I was building my personal portfolio website, but I was still pretty new to full-stack development. Given my academic expertise in Python, I chose the Flask framework, which was a lightweight web framework for building out Python applications on the web.

In terms of UX/UI design, I decided to keep everything simple and intuitive, with an elegant visual appeal to it. I started out by using Bootstrap to create a list of the different word categories and used the `onclick()` event to trigger a JavaScript function that would show/hide the domain lists.

![/blog/old-posts/owd-categories.png](/blog/old-posts/owd-categories.png)

Then, instead of duplicating the HTML file 4 times for the 4 TLDs, I used Flask's `@app.route` method as well as Python's `**locals()` method to create 4 identical pages but with different values for each of those local namespaces.

I also realized I needed a landing page for the site since I didn't want to use any of the TLDs as the homepage for the site. This page would have a carousel that would display the "Most Popular" and "Recently Viewed" domains, and I would hook that up to an SQLite database the backend that would track and record all of the click actions that users are making.

I tried building the carousel from scratch but eventually caved and used this amazing carousel plugin called [Slick](http://kenwheeler.github.io/slick/). Here's what I came up with:

![/blog/old-posts/carousel.gif](/blog/old-posts/carousel.gif)

Note: This is not the original MVP but the current version of the site - the original MVP didn't have the "Premium" stickers and the "More Like This". For reference, here's a screenshot of the homepage of One Word Domains in the early beginnings:

![/blog/old-posts/beta.png](/blog/old-posts/beta.png)

Now this is probably a gross oversimplification of my build process, but it covers the gist of it - the remaining was just lots and lots of debugging and unit testing. When I was done with the MVP, I deployed it on [Heroku](https://owd.herokuapp.com/).

## Naming The Project

*Pretty meta, I know, naming a project that helps people name their own projects.*

![/blog/old-posts/mindblown.gif](/blog/old-posts/mindblown.gif)

I started out with the name "Free Domains For Me" - as in *freedomainsfor.me*, since Namecheap has a [deal](https://nc.me/) for university students to get a .me domain name for free. However, after putting some further thought into it, I decided against it because **a)** the domains on the site are not technically "free" but just "free to register" and **b)** I needed something that's more fitting for the niche I'm targeting - which is one-word domain names.

And that's how [One Word Domains](/) was born.

## Product Hunt Launch

Here comes the fun part.

Since I didn't really have an in with the domain industry, I decided to launch One Word Domains at the platform that I was the most familiar with - Product Hunt. As a first-time launcher, I was pretty nervous about launching something that I've built with tears and sweat to the world. After doing a bunch of research, I found this concise (but, on hindsight, super-effective) [Reddit guide](https://www.reddit.com/r/Entrepreneur/comments/gfs7mp/how_i_made_2k_in_24_hours_on_the_launch_day/) written by my good friend [Ryzal](https://twitter.com/ryzalyusoff) and decided to just roll with it.

A few days before the launch, I did a "soft launch" on [IndieHackers](https://www.indiehackers.com/post/wanted-to-learn-flask-ended-up-building-a-webapp-458f983279), where I briefly explained why I was building this and how I did it. I didn't really pay too much attention to the post but apparently it got some positive feedback, which really helped boost morale for the actual launch.

On Launch Day, instead of launching at 00:01 SF time (which is when a launch cycle starts on Product Hunt), I decided to wait until 8 AM, which was when most of my audience was online. There was already a bunch of products on the leaderboard - some of which had over 60 upvotes - so naturally, I was a little intimidated, but I went ahead and designed a thumbnail GIF, wrote up a short brief about the project, and launched.

![/blog/old-posts/ph_launch_message.png](/blog/old-posts/ph_launch_message.png)

The next couple of hours were grueling. I started out by posting it on the various Slack groups that I was in, reaching out to people from my school, and sending out newsletters to the 5 subscribers that I had at the time.

This is when the comments started rolling in.

![/blog/old-posts/dave.png](/blog/old-posts/dave.png)

![/blog/old-posts/max.png](/blog/old-posts/max.png)

![/blog/old-posts/nathan.png](/blog/old-posts/nathan.png)

My initial target was to get to the top 5 products of the day on Product Hunt to be featured in their daily newsletter, but One Word Domains blew up and got to [#2 Product of The Day](https://www.producthunt.com/time-travel/2020/5/16), with over 700 upvotes, 90 comments, and 23 positive reviews.

![/blog/old-posts/ph2.png](/blog/old-posts/ph2.png)

This also drove quite a bit of traffic to the site as well, with over 6,000 users visiting the site on Launch Day itself and 3,000 more in the next couple of days after.

![/blog/old-posts/4k.png](/blog/old-posts/4k.png)

> A successful Product Hunt launch can really boost your site's SEO.

In just two days, [One Word Domains](https://www.oneword.domains/) went from not ranking on any search results to ranking in the top 5 search results on Google. Oh also remember the 5 newsletter subscribers I had earlier? That number stands at 457 now.

![/blog/old-posts/457subs.png](/blog/old-posts/457subs.png)

## Hacker News Feature

In the week following my Product Hunt launch, I started incorporating some feedback that I received on Launch Day. One of the biggest updates was the "synonym feature", which would allow you to find similar words of a given search term that also have available domain names.

![/blog/old-posts/raza.png](/blog/old-posts/raza.png)

It took me a while to figure this one out, as I had to add child pages for each domain on One Word Domains. Thus, I was planning to postpone my Hacker News launch for another week...and that's when this happened:

![/blog/old-posts/122-ppl-wtf.png](/blog/old-posts/122-ppl-wtf.png)

*"Whoa."* I thought to myself. *"What just happened?"*

Turns out, someone went ahead and posted about One Word Domains on [Hacker News](https://news.ycombinator.com/item?id=23291337), and it was trending on the top 10 posts. Flustered and kinda caught off-guard, I quickly wrote up a brief introduction about myself and why I built One Word Domains.

![/blog/old-posts/hn-intro.png](/blog/old-posts/hn-intro.png)

Now the crowd on Hacker News is quite different from the one on Product Hunt - though they both mainly consist of entrepreneurs, hackers, and startup enthusiasts, the comments you get on Hacker News are no doubt more constructive and less forgiving compared to Product Hunt. So I braced myself for the worst (but was also looking forward to getting some constructive criticism).

Surprisingly, the comments were mainly positive as well, and a few of them really helped me understand which features I should be building next. For instance, I received a lot of comments asking if there was a feature for them to list their domains on the site:

![/blog/old-posts/hn1.png](/blog/old-posts/hn1.png)

![/blog/old-posts/hn2.png](/blog/old-posts/hn2.png)

![/blog/old-posts/hn3.png](/blog/old-posts/hn3.png)

Taking these comments into account, I eventually built out a feature for people to [list their domains](/advertise) on One Word Domains for a nominal fee and added a "Featured Listings" section at the top of the home page. 

![/blog/old-posts/featured-listings.png](/blog/old-posts/featured-listings.png)

> Note: The "Advertise" feature has been deprecated in v3 of One Word Domains

The Hacker News feature drove a ton of traffic to One Word Domains. For the 5 hours that it was on the front page (check out the stats [here](http://hnrankings.info/23291337/)), there were constantly 100+ people on the site, and by the end of the day, I had over 8,000 new users on One Word Domains.

![/blog/old-posts/8k.png](/blog/old-posts/8k.png)

Here's a screenshot of One Word Domains when it was the #10 post on Hacker News:

![/blog/old-posts/hn10.png](/blog/old-posts/hn10.png)

## Takeaways

> “You can always feel when product/market fit is not happening. The customers aren't quite getting value out of the product, word of mouth isn't spreading, usage isn't growing that fast, press reviews are kind of ‘blah,’ the sales cycle takes too long, and lots of deals never close. ~ Marc Andreessen

This experience, as surreal as it was, taught me a lot of important lessons:

1. You don't "find" product-market fit. You build something that provides value to your users and let them come to you.
2. The best way to find product-market fit is by building a product that you yourself want to use and sharing it with everyone else.
3. If you want to launch on Product Hunt, try to be in a favorable timezone - being in Malaysia, which was GMT +8, I had to stay up till 5 AM, take a 2-hour "nap", and then continue, which on hindsight, probably wasn't too good for my health.

Also, if you're familiar with Python, Flask is definitely the best gateway drug into the world of web development. Trust me, I'm like a full-out addict right now, and I'm just getting started.

## Moving Forward

For now, I'm planning to try out a few different monetization strategies to turn One Word Domains from being just a side project into a sustainable business that could provide me with enough passive income to pay off my student loans. Aside from the affiliate programs that I have set up with [Namecheap](https://www.namecheap.com/), [Godaddy](https://www.godaddy.com/), and [Porkbun](https://porkbun.com/), I'm currently trying out the following strategies:

1. **Featured Listings:** Domain investors can now list their domains on One Word Domains for a nominal one-time fee.
2. **Paywalls:** I've recently added support for 18 more TLDs to the site including .me, .org, .net, .tech, .so, etc. and people can pay a one-time fee to get early access to those lists.

The world of domain investing might not be the hottest topic in Silicon Valley right now, but I believe the online real estate market is ripe for disruption, and I cannot wait to see where I can bring [One Word Domains](https://www.oneword.domains/) to in the months to come.

## Update (08/08/2020)

Today marks exactly 3 months since I launched One Word Domains to the world. A lot has happened since then - I've received various partnership offers from some of the biggest registrars in the world, made a ton of new friends all over the world (shoutout to [Eric](https://twitter.com/eric_bae), [Victor](https://www.linkedin.com/in/vicbr), [Robin](https://twitter.com/Vinrob), and many others, you know who you are), and grew One Word Domains to unprecedented heights. Here are some of the more notable progress updates:

- Added various new categories to the site - positive terms, places, tech-related terms, spanish, etc.
- Added a [few more TLDs](https://www.oneword.domains/tlds) to the site, including some heavily requested ones like .vc, .fyi, .co.uk, and even a domain hacks category
- Refined the filters feature on One Word Domains - users can now filter based on premium status, word length, category, and letter
- Added a [feature](https://www.oneword.domains/saved-domains) where people can save the domains they like and copy all of them to their clipboard for further research
- Partnered with a few registries like [Register.TO](https://register.to/) and [Uniregistry](https://uniregistry.com/) to whitelist their TLDs on One Word Domains
- Wrote a [post on Reddit](https://www.reddit.com/r/webdev/comments/hx2ltl/naming_inspirations_for_your_latest_web_projects/) about One Word Domains that sort of blew up.
- Improved One Word Domain's Alexa ranking from >800K to below 200K (it's now at 174K), and even wrote a [Twitter thread](https://twitter.com/FNTey/status/1286698732327596032) about it
- Recently received a grant from [1517 Fund](https://www.1517fund.com/) (shoutout to Nick, Danielle, Michael, and Zak!) to accelerate development and scale up operations.