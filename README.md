<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/FxL5qM0.jpg" alt="Bot logo"></a>
</p>

<h3 align="center">SnootyScrape</h3>


---

<p align="center"> 🤖 This bot scrapes Reddit and Pushshift to gather data on users <em>sentiment</em> on a specific topic. It persists what it finds to a database for later research, and allows one to further investigate specific Reddit users thought patterns. SnootyScraper is a great tool for analyzing mass amounts of targeted data, and making important business decisions reguarding your current market!
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Demo / Working](#demo)
- [How it works](#working)
- [Usage](#usage)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This bot was created for the purpose of researching the current opinion on a given topic.

## 🎥 Demo / Working <a name = "demo"></a>

Here is a video of it scraping and persisting data: <a href= 'https://www.youtube.com/watch?v=kq3zs70CQVU'>https://www.youtube.com/watch?v=kq3zs70CQVU</a><br>
As you can see, there are many interesting things you could do with this!


## 💭 How it works <a name = "working"></a>

The bot works by allowing its user to input a few paramaters which it then uses to query Pushshift data.

It takes the data it finds from pushshift, then - through the magic of Sentiment Analysis Technology - it spits back out data reguarding users opinions on a topic.

This data is persisted to a NoSQL DB for easy catagorization, analyzation, and reuse.

SnootyScraper also has the ability to scour a specific user's entire comment history to gain valuable insight into your market.


## 🎈 Usage <a name = "usage"></a>

SnootyScraper is incredibly easy to use. Simply give it your credentials in the pw.env file and run. Input any valid pushshift paramaters you wish to include in the search and let it do its' thing.

You can then view your database and organize how you wish.

If you find a person of interest, you can query their entire history of comments and analyze their data further.

### Example:
```
let params = {
    q: 'Elvis',
    size: 5,
    subreddit: 'askreddit'
}

const TYPE = {
    COMMENT: 'comment',
    SUBMISSION: 'submission'

}

const COLLECTION_NAME = "10ResultsAboutElvis"

Services.pushshift.get({params}, TYPE.COMMENT, 1, COLLECTION_NAME)
```

**Result:**

Invoking this function will query pushshift comment data with your chosen params and will paginate 1 single time, producing 10 results - or 2 pages containing 5 results each.

It will then funnel your data through Sentiment and then persist it to the DB for you to do with what you please.


## 🏁 Getting Started <a name = "getting_started"></a>


First thing's first. You could use your current account for this, but I reccomend that you create a fresh account for the bot.

Once the account is created and you are logged in, visit this url(https://www.reddit.com/prefs/apps/) and create a script app. Here is where you will find the values needed to authenticate the bot.

You are required to give it a valid redirect url, but it can go anywhere, say google.com.

Now that you have your authorization codes, navigate to the 'pw.envEXAMPLE' file in the root folder of this application

Once in the file, fill in the fields below.

    SnootyScrape/pw.envEXAMPLE
```
USER_AGENT=''
CLIENT_ID=''
CLIENT_SECRET=''
REDDIT_USER=''
REDDIT_PASS=''
DB_URL=''
```
Now remove 'EXAMPLE' from the end of the file name.

    (E.g. 'SnootyScrape/pw.envExample' > 'SnootyScrape/pw.env')

Now that you'ved filled in your account details, you need to run this command to install the required dependencies the bot needs to run.

```
npm i --save axios dotenv mongoose sentiment snoostorm snoowrap
```

It will take a couple minutes to finish installing.

Once finished, you can run the bot by using this command from within the root folder:

    node src/app.js

And that's it! If you have any questions or comments, send me a pm on Github or through Reddit /u/Bwz3r. I'll be happy to help you.

## ⛏️ Built Using <a name = "built_using"></a>

- [SENTIMENT](https://www.npmjs.com/package/sentiment) - Sentiment Analysis Tool
- [SNOOWRAP](https://www.npmjs.com/package/snoowrap) - Reddit API Wrapper
- [SNOOSTORM](https://www.npmjs.com/package/snoostorm) - Used to extract live streams from Snoowrap
- [AXIOS](https://www.npmjs.com/package/axios) - For making general HTTP requests
- [MONGOOSE](https://www.npmjs.com/package/mongoose) - For connecting and persisting to a NoSQL MongoDB
- [DOTENV](https://www.npmjs.com/package/dotenv) - For accessing environment variables to enable use on multiple systems


## ✍️ Authors <a name = "authors"></a>

- [@jdev](https://github.com/web-temps) - an interesting project by JDev :)
