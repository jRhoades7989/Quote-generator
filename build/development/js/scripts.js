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

window.onload= function() {
    var quoteButton = document.querySelector("#quote-generator");    
    var twitterButton = document.querySelector("#twitter");
    var root = document.querySelector(":root");
    
    quoteButton.addEventListener("click", function() {
        color = makeColor();
        root.style.setProperty("--background-color", `hsl(${color.hue}, ${color.sat}%, ${color.lgt}%)`); 
        root.style.setProperty("--background-color-13", `hsl(${color.hue}, ${color.sat}%, ${color.lgt - 13}%)`); 
        root.style.setProperty("--background-color-10", `hsl(${color.hue}, ${color.sat}%, ${color.lgt - 10}%)`); 
        
    });
};

},{}]},{},[1])