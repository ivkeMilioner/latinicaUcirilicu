/*
 **
 ** User stories:
 ** - Shows number of characters, words, sentences, paragraphs - Done
 ** - Show reading time - Done
 ** - Show keyword count - Done
 ** - Show reading level (Optional - how?) - Done
 ** - Above data should change/appear on every keypress - Done
 **
 */

// Readability (Mashape) API Key for testing: PQ4FOFuaR6mshI6qpnQKQvkDZQXjp1o6Zcqjsnug7GvNggTzUE

"use strict";
var input = document.querySelectorAll('textarea')[0],
  characterCount = document.querySelector('#characterCount'),
  wordCount = document.querySelector('#wordCount'),
  sentenceCount = document.querySelector('#sentenceCount'),
  paragraphCount = document.querySelector('#paragraphCount'),
  /*
  readingTime = document.querySelector('#readingTime'),
  readability = document.querySelector('#readability'), */
  keywordsDiv = document.querySelectorAll('.keywords')[0],
  topKeywords = document.querySelector('#topKeywords');

// updating the displayed stats after every keypress
function count() {

  //keeping the console clean to make only the latest data visible
  console.clear();

  // character count
  // just displaying the input length as everything is a character





  characterCount.innerHTML = input.value.replace(/[^а-шА-Ш]/g, '').length;;







  // word count using \w metacharacter - replacing this with .* to match anything between word boundaries since it was not taking 'a' as a word.
  // this is a masterstroke - to count words with any number of hyphens as one word
  // [-?(\w+)?]+ looks for hyphen and a word (we make both optional with ?). + at the end makes it a repeated pattern
  // \b is word boundary metacharacter
  var words = input.value.match(/[\w\u0402-\u045f]+/ig);
  // console.log(words);
  if (words) {
    wordCount.innerHTML = words.length;
  } else {
    wordCount.innerHTML = 0;
  }

  // sentence count	using ./!/? as sentense separators
  if (words) {
    var sentences = input.value.split(/[.|!|?]+/g);
    console.log(sentences);
    sentenceCount.innerHTML = sentences.length - 1;
  } else {
    sentenceCount.innerHTML = 0;
  }

  // paragraph count from http://stackoverflow.com/a/3336537
  if (words) {
    // \n$ takes care of empty lines: lines with no characters, and only \n are not paragraphs
    // and need to be replaced with empty string
    var paragraphs = input.value.replace(/\n$/gm, '').split(/\n/);
    paragraphCount.innerHTML = paragraphs.length;
  } else {
    paragraphCount.innerHTML = 0;
  }
  // console.log(paragraphs);

  /*
  // reading time based on 275 words/minute
  if (words) {
    var seconds = Math.floor(words.length * 60 / 275);
    // need to convert seconds to minutes and hours
    if (seconds > 59) {
      var minutes = Math.floor(seconds / 60);
      seconds = seconds - minutes * 60;
      readingTime.innerHTML = minutes + "m " + seconds + "s";
    } else {
      readingTime.innerHTML = seconds + "s";
    }
  } else {
    readingTime.innerHTML = "0s";
  }

  // finding out top keywords and their count
  // step-1: remove all the stop words
  // step-2: form an object with keywords and their count
  // step-3: sort the object by first converting it to a 2D array
  // step-4: display top 4 keywords and their count */

  if (words) {

    // step-1: removing all the stop words
    var nonStopWords = [];
    var stopWords = ["и", "су", "па", "а", "у", "те", "на", "ће", "из"];
    for (var i = 0; i < words.length; i++) {
      // filtering out stop words and numbers
      if (stopWords.indexOf(words[i].toLowerCase()) === -1 && isNaN(words[i])) {
        nonStopWords.push(words[i].toLowerCase());
      }
    }
    // console.log(nonStopWords);

    // step-2: forming an object with keywords and their count
    var keywords = {};
    for (var i = 0; i < nonStopWords.length; i++) {
      // checking if the word(property) already exists
      // if it does increment the count otherwise set it to one
      if (nonStopWords[i] in keywords) {
        keywords[nonStopWords[i]] += 1;
      } else {
        keywords[nonStopWords[i]] = 1;
      }
    }

    // step-3: sorting the object by first converting it to a 2D array
    var sortedKeywords = [];
    for (var keyword in keywords) {
      sortedKeywords.push([keyword, keywords[keyword]])
    }
    sortedKeywords.sort(function (a, b) {
      return b[1] - a[1]
    });
    // console.log(sortedKeywords);

    // step-4: displaying top 4 keywords and their count
    topKeywords.innerHTML = "";
    for (var i = 0; i < sortedKeywords.length && i < 20; i++) {
      var li = document.createElement('li');
      li.innerHTML = "<b>" + sortedKeywords[i][0] + "</b>: " + sortedKeywords[i][1];
      topKeywords.appendChild(li);
    }
  }

  // displaying top keywords only if there is a word in the text area
  if (words) {
    keywordsDiv.style.display = "block";
  } else {
    keywordsDiv.style.display = "none";
  }

};


/*

// readability level using readability-metrics API from Mashape
readability.addEventListener('click', function () {

  // placeholder until the API returns the score  
  readability.innerHTML = "Fetching score...";

  var requestUrl = "https://ipeirotis-readability-metrics.p.mashape.com/getReadabilityMetrics?text=";
  var data = input.value;

  var request = new XMLHttpRequest();
  request.open('POST', encodeURI(requestUrl + data), true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.setRequestHeader("X-Mashape-Authorization", "PQ4FOFuaR6mshI6qpnQKQvkDZQXjp1o6Zcqjsnug7GvNggTzUE");
  request.send();

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      readability.innerHTML = readingEase(JSON.parse(this.response).FLESCH_READING);
    } else {
      // We reached our target server, but it returned an error
      readability.innerHTML = "Not available.";
    }
  };

  request.onerror = function () {
    // There was a connection error of some sort
    readability.innerHTML = "Not available.";
  };
});

// function to convert FLESCH READING SCORE into meaningful string.
function readingEase(num) {
  switch (true) {
    case (num <= 30):
      return "Readability: College graduate.";
      break;
    case (num > 30 && num <= 50):
      return "Readability: College level.";
      break;
    case (num > 50 && num <= 60):
      return "Readability: 10th - 12th grade.";
      break;
    case (num > 60 && num <= 70):
      return "Readability: 8th - 9th grade.";
      break;
    case (num > 70 && num <= 80):
      return "Readability: 7th grade.";
      break;
    case (num > 80 && num <= 90):
      return "Readability: 6th grade.";
      break;
    case (num > 90 && num <= 100):
      return "Readability: 5th grade.";
      break;
    default:
      return "Not available.";
      break;
  }
} */