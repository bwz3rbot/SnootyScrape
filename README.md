<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/FxL5qM0.jpg" alt="Bot logo"></a>
</p>

<h3 align="center">SnootyScrape</h3>


---

<p align="center"> 🤖 This bot scrapes Reddit and Pushshift to gather data on users <em>sentiment</em> on a specific topic. It persists what it finds into a NoSQL DB easy catagorization and allows one to further investigate specific Reddit users thought patterns. SnootyScraper is a powerful, yet easy to use tool for analyzing mass amounts of targeted data, and making important business decisions reguarding your current market!
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

This bot was created for the purpose of researching the current opinion on any given topic.

## 💭 How it works <a name = "working"></a>

The bot works by allowing its user to input a few paramaters which it then uses to query Pushshift data.

It takes the data it gathers from Pushshift and Reddit, then - through the magic of Sentiment Analysis Technology - returns data reguarding users opinions on a topic.

This data is persisted to a NoSQL DB for easy catagorization, analyzation, and reuse.

SnootyScraper also has the ability to scour a specific user's entire comment history to bring clarity to the results.


## 🎈 Usage <a name = "usage"></a>

SnootyScraper is incredibly easy to use and understand. Simply give it your credentials in the pw.env file and run. Input any valid pushshift paramaters you wish to include in the search and let it do its' thing.

You can then view your database and organize it as you wish.

If you find a person of interest, you can query their entire history to analyze further.

### Example:
```

CONNECTING MONGOOSE
connection success
MONGOOSE CONNECTION SUCCESS

2020-08-23T01:22:48.989Z
Welcome to SnootyScraper!

| What would you like to do?

> user

| Which user?

> SnootyScraper

| Fetching all comments from u/SnootyScraper

please wait.... (this could take a while) 

found 21 items. indexing now...
indexing complete!

| What would you like to do?

> query

| Input first a query param, then a value.
| When you're done, type '/go' or '/cancel' to return to the main menu.

key: > q

value: > javascript

key: > size

value: > 100

key: > /go

{ q: 'javascript', size: '100' }

| type of search (comment OR submission):

> comment

pagination amount:

> 1

| db output name:

> MyCollection

| query params:
| {
|   "q": "javascript",
|   "size": "100"
| }
| type of search: comment
| paginate amount: 1
| output name: MyCollection
| your search could yeild up to 200 results.Is this correct?

(y/n) > y

| WORKING...
| getting page 1...
| indexing...
| getting page 2...
| indexing...

| What would you like to do?

> exit

| Thanks for choosing SnootyScraper! Goobye!
```

**Result:**

Running these commands will make a targeted request to Pushshift.
You can find more information on how to form your requests here:(https://buildmedia.readthedocs.org/media/pdf/reddit-api/beta/reddit-api.pdf)

It will then funnel your data through Sentiment(https://www.npmjs.com/package/sentiment) and persist it to the DB for you to do with what you please.


## 🏁 Getting Started <a name = "getting_started"></a>


First thing's first. You could use your current account for this, but I reccomend that you create a fresh account for the bot.

```
As writing this, there is no current need to authenticate, other than to simply start the bot without any errors. However, there will be features added in the future that allow a user to send modmail or do some other things that will require authentication.
```

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

Now that you'ved filled in your account details, you just need to run this command to install the nececary dependencies.

```
npm install
```

This will take a couple minutes to complete.

Once finished, you can run the bot by invoking this command from within the root folder:

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
