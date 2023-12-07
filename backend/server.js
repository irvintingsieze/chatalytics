const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const multer = require("multer")();
const fs = require("fs");
const natural = require("natural");
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(cors());
app.listen(5000, () => {
  console.log(`Server is running at port 5000.`);
});

app.get("/helloworld", (req, res) => {
  res.send("HELLO WORLD!");
});

app.post("/fileUpload", multer.single("file"), (req, res) => {
  const jsonData = JSON.parse(String(req.file.buffer));
  const person1 = jsonData["name"];
  let person2 = "";
  console.log(jsonData["messages"].length);
  for (let i = 0; i < jsonData["messages"].length; i++) {
    if (jsonData["messages"][i]["from"] !== person1) {
      person2 = jsonData["messages"][i]["from"];
      break;
    }
  }
  const messages = jsonData["messages"];
  let person1Data = { messages: [] };
  let person2Data = { messages: [] };
  for (let i = 0; i < messages.length; i++) {
    if (
      messages[i]["type"] === "message" &&
      messages[i]["text"] !== "" &&
      typeof messages[i]["text"] === "string"
    ) {
      messages[i]["date"] = messages[i]["date"].slice(0, 7);
      if (messages[i]["from"] === person1)
        person1Data["messages"].push(messages[i]);
      else if (messages[i]["from"] === person2)
        person2Data["messages"].push(messages[i]);
    }
  }
  fs.writeFile(
    "./assets/" + person1.replace(" ", "") + ".json",
    JSON.stringify(person1Data),
    (error) => {
      if (error) {
        console.error(error);
        throw error;
      }
      console.log("json written correctly");
    }
  );
  fs.writeFile(
    "./assets/" + person2.replace(" ", "") + ".json",
    JSON.stringify(person2Data),
    (error) => {
      if (error) {
        console.error(error);
        throw error;
      }
      console.log("data.json written correctly");
    }
  );
  res.send({
    person1: person1,
    person2: person2,
  });
});

app.get("/total-text/:name", (req, res) => {
  const { name } = req.params;
  fs.readFile("./assets/" + name + ".json", (error, data) => {
    if (error) {
      console.error(error);
      throw err;
    }
    const user = JSON.parse(data);
    let totalNumWords = 0;
    user["messages"].forEach((element) => {
      totalNumWords += element["text"].split(" ").length;
    });
    const totalMessages = user["messages"].length;
    res.json({
      numOfMessages: totalMessages,
      averageNumWords: totalNumWords / totalMessages,
    });
  });
});

app.get("/monthly-text/:name", (req, res) => {
  const { name } = req.params;
  console.log(name);
  fs.readFile("./assets/" + name + ".json", (error, data) => {
    if (error) {
      console.error(error);
      throw err;
    }
    const user = JSON.parse(data);
    var counts = user["messages"].reduce((x, y) => {
      var months = y.date;
      if (!x.hasOwnProperty(months)) {
        x[months] = 0;
      }
      x[months]++;
      return x;
    }, {});
    res.json(counts);
  });
});

app.get("/questions/:name", (req, res) => {
  const { name } = req.params;
  console.log(name);
  fs.readFile("./assets/" + name + ".json", (error, data) => {
    if (error) {
      console.error(error);
      throw err;
    }
    const user = JSON.parse(data);
    let numQuestionMarks = 0;
    let numFiveWOneH = 0;
    for (let i = 0; i < user["messages"].length; i++) {
      numQuestionMarks += (user["messages"][i]["text"].match(/\?/g) || [])
        .length;
      numFiveWOneH += (
        user["messages"][i]["text"]
          .toLowerCase()
          .match(/(who)|(what)|(when)|(where)|(how)/g) || []
      ).length;
    }
    res.json({
      numQuestionMarks: numQuestionMarks,
      numFiveWOneH: numFiveWOneH,
    });
  });
});

app.get("/uppercase/:name", (req, res) => {
  const { name } = req.params;
  console.log(name);
  fs.readFile("./assets/" + name + ".json", (error, data) => {
    if (error) {
      console.error(error);
      throw err;
    }
    const user = JSON.parse(data);
    let uppercase = 0;
    for (let i = 0; i < user["messages"].length; i++) {
      let text = user["messages"][i]["text"]
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\?]/g, "")
        .replace(/\s{2,}/g, " ");
      let textList = text.split(" ");
      textList.forEach((e) => {
        if (e.replace(/[A-Z]/g, "").length === 0) {
          uppercase++;
        }
      });
    }
    res.json({
      uppercaseWords: uppercase,
    });
  });
});

app.get("/wordcloud/:name", (req, res) => {
  const { name } = req.params;
  console.log(name);
  fs.readFile("./assets/" + name + ".json", (error, data) => {
    if (error) {
      console.error(error);
      throw err;
    }
    const user = JSON.parse(data);
    let fulltext = "";
    for (let i = 0; i < user["messages"].length; i++) {
      fulltext += user["messages"][i]["text"] + " ";
    }
    let cleanedText = remove_stopwords_punctuations(fulltext);
    let wordCounts = {};
    cleanedText = cleanedText.split(/\b/);

    for (var i = 0; i < words.length; i++) {
      wordCounts[words[i]] = (wordCounts[words[i]] || 0) + 1;
    }

    for (const [key, value] of Object.entries(wordCounts)) {
      if (value < 20) delete wordCounts[key];
    }
    res.json(wordCounts);
  });
});

function remove_stopwords_punctuations(str) {
  str = str.toLowerCase();
  str = str.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ""
  );
  str = str.replace(/[0-9]/g, "");

  str = str
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\?\\]/g, "")
    .replace(/\s{2,}/g, " ");
  stopwords = [
    "i",
    "me",
    "my",
    "myself",
    "we",
    "our",
    "ours",
    "ourselves",
    "you",
    "your",
    "yours",
    "yourself",
    "yourselves",
    "he",
    "him",
    "his",
    "himself",
    "she",
    "her",
    "hers",
    "herself",
    "it",
    "its",
    "itself",
    "they",
    "them",
    "their",
    "theirs",
    "themselves",
    "what",
    "which",
    "who",
    "whom",
    "this",
    "that",
    "these",
    "those",
    "am",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "having",
    "do",
    "does",
    "did",
    "doing",
    "a",
    "an",
    "the",
    "and",
    "but",
    "if",
    "or",
    "because",
    "as",
    "until",
    "while",
    "of",
    "at",
    "by",
    "for",
    "with",
    "about",
    "against",
    "between",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "to",
    "from",
    "up",
    "down",
    "in",
    "out",
    "on",
    "off",
    "over",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "s",
    "t",
    "can",
    "will",
    "just",
    "don",
    "should",
    "now",
  ];
  res = [];
  words = str.split(" ");
  for (i = 0; i < words.length; i++) {
    word_clean = words[i].split(".").join("");
    if (!stopwords.includes(word_clean)) {
      res.push(word_clean);
    }
  }
  return res.join(" ");
}

function findMedian(arr) {
  arr.sort((a, b) => a - b);
  const middleIndex = Math.floor(arr.length / 2);

  if (arr.length % 2 === 0) {
    return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
  } else {
    return arr[middleIndex];
  }
}

app.get("/sentiment/:name", (req, res) => {
  const { name } = req.params;
  console.log(name);
  fs.readFile("./assets/" + name + ".json", (error, data) => {
    if (error) {
      console.error(error);
      throw err;
    }
    const user = JSON.parse(data);
    let fulltext = "";
    for (let i = 0; i < user["messages"].length; i++) {
      fulltext += user["messages"][i]["text"] + " ";
    }
    let cleanedText = remove_stopwords_punctuations(fulltext);
    const result = analyzer.getSentiment(cleanedText.split(" "));
    res.json({ sentimentScore: result });
  });
});
