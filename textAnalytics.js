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
var input = document.querySelectorAll('#text_area')[0],
    characterCount = document.querySelector('#characterCount'),
    wordCount = document.querySelector('#wordCount'),
    sentenceCount = document.querySelector('#sentenceCount'),
    paragraphCount = document.querySelector('#paragraphCount'),
  ,
    keywordsDiv = document.querySelectorAll('.keywords')[0],
    topKeywords = document.querySelector('#topKeywords');

// updating the displayed stats after every keypress
input.addEventListener('keyup', function () {

    //keeping the console clean to make only the latest data visible
    console.clear();

    // character count
    // just displaying the input length as everything is a character





    characterCount.innerHTML = input.value.replace(/[^а-шА-Ш]/g, '').length;

    // word count using \w metacharacter - replacing this with .* to match anything between word boundaries since it was not taking 'a' as a word.
    // this is a masterstroke - to count words with any number of hyphens as one word
    // [-?(\w+)?]+ looks for hyphen and a word (we make both optional with ?). + at the end makes it a repeated pattern
    // \b is word boundary metacharacter



    var words = input.value.match(/\s[\w\u0402-\u045f]+/ig);






    if (words) {
        wordCount.innerHTML = words.length + 1;
    } else {
        wordCount.innerHTML = 0;
    }




    if (words) {
        var sentences = input.value.split(/\s[\w\u0402-\u045f]+/ig);
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



    // finding out top keywords and their count
    // step-1: remove all the stop words
    // step-2: form an object with keywords and their count
    // step-3: sort the object by first converting it to a 2D array
    // step-4: display top 4 keywords and their count

    if (words) {

        // step-1: removing all the stop words
        var nonStopWords = [];
        var stopWords = [];
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

        // step-4: displaying top 10 keywords and their count
        topKeywords.innerHTML = "";
        for (var i = 0; i < sortedKeywords.length && i < 10; i++) {
            var li = document.createElement('li');
            li.innerHTML = "<b>" + sortedKeywords[i][0] + "</b>: " + sortedKeywords[i][1];
            topKeywords.appendChild(li);
        }
    }

    // displaying top keywords only if there is a word in the text area
    if (words) {
        keywordsDiv.style.display = "inline";
    } else {
        keywordsDiv.style.display = "none";
    }

});