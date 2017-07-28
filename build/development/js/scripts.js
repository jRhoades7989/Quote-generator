(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jshint esversion: 6*/

function makeColor() {
    let hue = Math.floor(Math.random() * 366);
    let sat = 50 + Math.floor(Math.random() * 31);
    let lgt = 55 + Math.floor(Math.random() * 21); 
    
    return {"hue": hue,
            "sat": sat,
            "lgt": lgt};
}

function insertQuote(quote) {
    const quoteElement = document.querySelector("#quote");
    quoteElement.innerHTML = quote;
}

function insertAuthor(author) {
    const authorElement = document.querySelector("#author");
    authorElement.innerHTML = author;
}

function addTweet(text) {
    text = text.replace("<p>", "");
    text = text.replace("</p>", "");
    console.log(text);
    let urlText = encodeURIComponent(text);

    const twitterButton = document.querySelector("#twitter");
  twitterButton.setAttribute("href", "https://twitter.com/intent/tweet?text=" + urlText);
    return urlText;
}

window.onload = function() {

//This changes the color on clicking the new quote button
    const quoteButton = document.querySelector("#quote-generator");    
    const twitterButton = document.querySelector("#twitter");
    const root = document.querySelector(":root");
    
    quoteButton.addEventListener("click", function() {
        color = makeColor();
        root.style.setProperty("--background-color", `hsl(${color.hue}, ${color.sat}%, ${color.lgt}%)`); 
        root.style.setProperty("--background-color-13", `hsl(${color.hue}, ${color.sat}%, ${color.lgt - 13}%)`); 
        root.style.setProperty("--background-color-10", `hsl(${color.hue}, ${color.sat}%, ${color.lgt - 10}%)`); 
        
    });

//This will get and display a new quote on clicking the new quote button
    var url = "http://api.forismatic.com/api/1.0?method=getQuote&format=json&lang=en";

    quoteButton.addEventListener("click", function () {
        const url = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
        
        fetch(url, {cache: "no-store"})
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            insertQuote(json[0].content);
            addTweet(json[0].content + "-" + json[0].title);
            return json;
            })
        .then(function(json) {
            insertAuthor(json[0].title);
            return json;
          })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    });
};

},{}]},{},[1])