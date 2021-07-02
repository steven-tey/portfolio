---
title: Lessons Learned Building A Golden Kitty-Winning Product
description: Here's how we built One Word Domains from scratch, grew it to 50,000 users, and end up winning the coveted Golden Kitty Award.
date: '2021-02-02'
image: golden-kitty.webp
---



When I was browsing Twitter the other day, I came across this [tweet](https://twitter.com/suhail/status/1353191445637685250) by Suhail, which reminded me of the famous diagram Paul Graham came up with that depicts the startup curve:

![](https://intellisearch-assets.s3-us-west-1.amazonaws.com/blog/startup-curve.png)

The diagram really resonated with my experience building [One Word Domains](https://www.oneword.domains/) in the last 9 months. More specifically, the Trough of Sorrow hit me the hardest, as I've had my fair share of lows building this project as a solo founder.

Therefore, I thought it would be interesting to share my journey with One Word Domains so far and explore the similarities between my story and Paul's startup curve – especially given Product Hunt's [Golden Kitty Awards](https://www.producthunt.com/stories/announcing-the-2020-golden-kitty-award-winners) last week *(spoiler alert: One Word Domains won the Side Project category).*

## How It All Started

In the summer of 2020, I built One Word Domains out of a personal need – I was trying to come up with a decent, catchy one-word domain name for my latest side project. As a data science student, I had a ton of experience wrangling data with Python, but I haven't yet had the opportunity to build something that tackled a real-world problem.

And so, [a week of hacking](https://www.oneword.domains/blog/weekend-project) later, I came up with an MVP for what was then a simple Bootstrap site that showed a list of the top 10,000 most commonly-used English words paired with startup-friendly top-level domains (TLDs) like [.ai](https://www.oneword.domains/available-ai-domains), [.co](https://www.oneword.domains/available-co-domains), [.io](https://www.oneword.domains/available-io-domains), and [.com](https://www.oneword.domains/available-com-domains).

After a moderately-successful [soft launch on Indiehackers](https://www.indiehackers.com/post/wanted-to-learn-flask-ended-up-building-a-webapp-458f983279), I decided to launch the MVP on Product Hunt a few days later just to get more feedback. Little did I know, this would be the beginning of one of the most incredible experiences of my life.

## Product Hunt / Hacker News of Initiation

My Product Hunt launch was a (relatively) huge success. One Word Domains ended up getting to [#2 Product of The Day](https://www.producthunt.com/time-travel/2020/5/16), with over 700 upvotes, 90 comments, and 23 positive reviews. I was aiming for a top 5 finish, so this was way beyond my expectations.

[![Product Hunt #2 Product of the Day](/blog/old-posts/ph2.png)](https://www.producthunt.com/posts/one-word-domains)

A week later, a Hacker News user that went by the username "[madhukarah](https://news.ycombinator.com/user?id=madhukarah)" [posted](https://news.ycombinator.com/item?id=23291337) about One Word Domains, and for some reason, it made its way to the front page, bringing in over 8,000 users in a single day:

![/blog/old-posts/8k.png](/blog/old-posts/8k.png)

The month following One Word Domains' launch was a whirlwind. The site received a ton of [press](https://www.oneword.domains/press) from various news sites, and I had the opportunity to go on a couple of [podcasts](https://domainnamewire.com/2020/05/26/one-word-domains-dnw-podcast-287/) to talk about my journey – which in turn brought in more visitors. I even received partnership and acquisition offers from some of the top registrars in the world. 

Everything seemed to be going well, and I was set to turn this side project into a sustainable business that I could run after graduation.

## Trough of Sorrow

Now I am no stranger to attention before – when I was in high school, I published a science-fiction novel that sold over 1.5K copies nationwide and went on to win various [international](https://www.thestar.com.my/lifestyle/culture/2016/01/11/local-author-steven-steel-picks-up-a-prize-in-the-worlds-largest-online-writing-competition) and [national](https://www.thestar.com.my/news/nation/2017/07/02/book-on-mind-control-wins-first-prize) awards, accruing over [850K reads on Wattpad](https://www.wattpad.com/story/42802547-someone's-in-my-head-wattys-award-winner-2015) (YouTube for books) along the way.

What I wasn't used to though, was the anxiety that creeps up on you when the novelty of your "hot new product" starts to wear off.

This hit me a little over 3 months into my journey with One Word Domains. Growth began to slow, there weren't as many press mentions, and my newsletters weren't getting as many responses as they did before. I was reminded of one of the myths about product-market fit that was mentioned by Ben Horowitz in his 2010 [piece](https://blog.pmarca.com/2010/03/20/the-revenge-of-the-fat-guy/) – "*once you achieve product market fit, you can’t lose it.*" As the initial hype started to die down, I began to doubt the product-market fit that I thought One Word Domains had found.

## Releases of Improvement

Despite the feeling of unease, I kept working on One Word Domains, spending countless hours building out new features from scratch. Here are some of the features that I shipped in the last 9 months:

- **Support for 70+ TLDs**: In response to my users' requests, I added support for over 70 different TLDs, ranging from popular ones like [.SO](https://www.oneword.domains/available-so-domains) and [.FYI](https://www.oneword.domains/available-fyi-domains) to country specific ones like [.CO.UK](https://www.oneword.domains/available-co.uk-domains) and [.DE](https://www.oneword.domains/available-de-domains). You can refer to the full list of TLDs [here](https://www.oneword.domains/pricing).
- **Improved Load Speeds**: By leveraging server-side lazy-loading and the scalability of PostgreSQL, I was able to improve load speeds by over 80% – which was crucial as the number of domains in the database increased to over 700,000.
- **Search Functionality**: By leveraging the SpaCy and NLTK natural language libraries, I was able to [build a search algorithm](https://www.oneword.domains/blog/building-search) to help users navigate the 700,000+ domains on the site more efficiently.
- **Watchlist & Saved Domains**: I added features for users to save and monitor domains that they were interested in and get notified when they became available.
- **Aftermarket Domains**: I built a [centralized repository](https://www.oneword.domains/aftermarket) of brandable one-word and two-word domains from marketplaces like GoDaddy and Dynadot to help users find the gems in the ocean of aftermarket domains.
- **Affiliate Program**: I launched One Word Domains' [affiliate program](https://recurrence.app/advertisers/one-word-domains) in November 2020, which ended up making [over $500 in affiliate revenue](https://twitter.com/FNTey/status/1333074489966518273) in the first two weeks.
- **This blog**: And here's [how I built it](https://www.oneword.domains/blog/lightweight-cms).

These new features led to a few occasional [spikes](https://www.reddit.com/r/webdev/comments/hx2ltl/naming_inspirations_for_your_latest_web_projects/) in traffic, but nothing overly-groundbreaking. Growth was increasing, albeit linearly.

## Crash(es) of Ineptitude

I also had my fair share of struggles along the way. 

For instance, I had troubles with one of my monetization strategies. I started with 3 different revenue streams – affiliate commissions, premium memberships, and paid listings – but eventually had to drop the paid listings channel as it wasn't generating enough positive results for my clients. I suspected that it was partly due the fact that paid listings literally contradicts the main premise of One Word Domains – which is to provide brandable domains that were at *registration price*, not at the cost of an arm and a leg.

I also had various instances of unsatisfied customers who demanded a refund on their purchases. Despite feeling dejected whenever this happens, I would always honor their requests, as my philosophy is that if my product didn't provide any value to the user, I wouldn't be comfortable taking their money. While this didn't happen often, I would always treat it as a learning experience whenever it did and gather as much feedback as possible to improve the product.

Migrating my entire database from raw .TXT files (*I know, pretty hacky, right?*) over to PostgreSQL was also a huge challenge. Since it was my first time learning PostgreSQL, my code would break from time to time, causing my site to crash. Fortunately, over time, my grasp of PostgreSQL improved, and I was able to mitigate these errors more effectively.

## Golden Kitty Awards

Fast forward 9 months later. 

It's January of 2021, and the nominations for Product Hunt's Golden Kitty Awards were open. I decided to [tweet](https://twitter.com/FNTey/status/1349393267805331462?s=20) about it, asking my users to nominate One Word Domains if they could. While the response was quite positive, I didn't have any expecations, since I was aware that the competition was preeeetty intense. 

However, just a few days later, I received news that One Word Domains was a Golden Kitty Nominee.

[![Golden Kitty Nominated](https://intellisearch-assets.s3-us-west-1.amazonaws.com/blog/nominated-tweet.png)](https://twitter.com/FNTey/status/1351260305305657345?s=20)

I was honestly quite surprised that I made the cut, but I quickly composed myself and crafted a few emails/personalized messages to send out to my users and close friends, asking for their support. I even made a cool little popup on the site announcing the nomination:

[![Golden Kitty Popup](https://intellisearch-assets.s3-us-west-1.amazonaws.com/blog/golden-kitty-popup.gif)](https://twitter.com/FNTey/status/1352344685851774977?s=20)

Then, the unthinkable happened.

It started out with this email that I received from Product Hunt:

![Golden Kitty Finalist Email](https://intellisearch-assets.s3-us-west-1.amazonaws.com/blog/golden-kitty-finalist.png)

Once again, I didn't even think that One Word Domains was going to make it to the top 4, so this news came as a pleasant surprise. I remember and thinking to myself, "*oh, this is wonderful – at least I'm set to win some cool Product Hunt swag, if not the Golden Kitty itself!*"

However, since Product Hunt wanted to keep the mystery going, I couldn't share the news with anyone at the time, so I had no choice but to contain my excitement and wait for the day of the ceremony.

Then, before I knew it, the day was here.

![Waiting in the green room for the Golden Kitty Awards](https://intellisearch-assets.s3-us-west-1.amazonaws.com/blog/golden-kitty-greenroom.png)

Sitting in the green room, all I could think to myself was "*how in the world was I supposed to go up against such cool and amazing products??*"

For context, here's who I was going up against:

- [Untools](https://www.producthunt.com/posts/untools) (#2 Product of the Week, with 1.7K upvotes)
- [DoNotPay](https://donotpay.com/) (literally the world's first robot lawyer)
- [MagicPattern](https://www.producthunt.com/posts/magicpattern) (#2 Product of the Day, super cool CSS background patterns)

But then, just when I was about to lose faith, the craziest thing happened:

[![Winning The Golden Kitty](https://intellisearch-assets.s3-us-west-1.amazonaws.com/blog/golden-kitty.gif)](https://www.pscp.tv/w/1ynJOBdqDrQGR?t=376)

I was speechless.

Against all odds, One Word Domains had won the 2020 Golden Kitty Award for Best Side Project. At that very moment, all the late nights, frustrating debugging sessions, and long meetings were worth it.

If you're interested, you can read the [official Product Hunt announcement ](https://domains.us18.list-manage.com/track/click?u=067c7761a04752d4598d68656&id=72caf62c87&e=40059757cb)[here](https://domains.us18.list-manage.com/track/click?u=067c7761a04752d4598d68656&id=ec6de3eee0&e=40059757cb).

You can also watch me freak out during the award ceremony in this [replay](https://www.pscp.tv/w/1ynJOBdqDrQGR?t=376) of the ceremony.

## The Golden Kitty Effect

Once the news came out, One Word Domains received an influx of new users – 4,200 of them in 4 days, to be exact.

![Product Hunt Influx of Users](https://intellisearch-assets.s3-us-west-1.amazonaws.com/blog/golden-kitty-visitors.jpeg)

In fact, it even got so intense that I had to [upgrade my servers](https://twitter.com/FNTey/status/1355226094975115266?s=20) to deal with the surge in traffic.

Search activity on the site also increased by 40%, going from 100K to over 140K in just 5 days. To put things in perspective, it took 51 days to reach 100K searches.

[![140K Searches](https://intellisearch-assets.s3-us-west-1.amazonaws.com/blog/140k-searches.png)](https://twitter.com/FNTey/status/1356293232947183616?s=20)



## What I've Learned

While I believe there are plenty of factors that led to One Word Domains' success, I believe I can distill them down to the following 4 takeaways:

### Just Keep Shipping 

There will times when you'll feel like the initial momentum of your product is dying down. Don't fret – just keep your head down and keep building. 

There will be times when you'll feel like you are shouting into the void – be it when you're sending out an email blast to your mailing list or when you're tweeting about your latest feature updates. Don't sweat it – keep posting and interacting with your users.

Your efforts compound over time, and trust me, people do see the effort that you're putting in, as long as you keep at it. *Consistency is key*.

### Obsess Over Your Users, Not Your Competition

Instead of worrying about your competition, try building a rapport with your users. You can do this by reaching out to them with a personalized message, or by replying to their comments on Twitter. Startups that do well don't excel because they beat the competition – they do well because they provide the best user experience for their users.

Treat your customers like they're your bosses – because technically speaking, they are. Nailing down the user experience will, quite literally, make or break your product.

### Be Smart With What You Build

Sometimes, it's better to use an existing product than build from scratch. It took me two whole months to get One Word Domains' affiliate program up and running because I decided to [built my own](https://www.oneword.domains/blog/affiliate-program) affiliate management tool – [Recurrence](https://recurrence.app/).

If I had gone with an existing solution, I could've saved 2 months of precious dev time and used it to build more features for One Word Domains.

I learned this the hard way. Don't be like me. If you're having a hard time making a decision, try out Baremetrics' [Build VS Buy calculator](https://baremetrics.com/build-vs-buy) to get some perspective.

### Rocket Ship Growth Is Overrated

A few months into the project, I already knew that One Word Domains was not going to be the next unicorn. At first that made me feel a little insecure, but I eventually came to terms with it. I realized that you don't have to build the next Facebook or Uber to be happy/live a comfortable life. All you need is:

1. A profitable business that generates a healthy amount of passive income every month
2. A loving family
3. Friends that you can hang out with every now and then

*Everything else is just icing on the cake.*

Instead of glorifying rocket ships and hockey stick growths, we should also normalize – or at least acknowledge that *commercial airlines* and *linear, healthy growth trajectories* are cool too.



## What's Next

Building One Word Domains has been a wild ride so far. While I've had my ups and downs, the Golden Kitty Award definitely gives me the motivation to take this project to the next level – which I am incredibly grateful for.

Moving forward, I'm planning to add the following features to the site:

- A machine-learning powered name creation tool that provides personalized, industry-specific name suggestions based on user input
- Improve the efficiency and accuracy of all background tasks that I've set up on One Word Domains' backend
- Add data from more domain marketplaces for the [Aftermarket section](https://www.oneword.domains/aftermarket) (Sedo, Dan, etc.)
- Add support for more TLDs (.li, .id, and .studio) and new word categories (Dutch, German words)

To those of you who have been here since the beginning – thank you for the continuous support, y'all are the real OGs. And to those of you who are new – welcome aboard! Thank you for taking a leap of faith – I promise to provide you with the best possible service that you deserve.

Thanks for reading!
