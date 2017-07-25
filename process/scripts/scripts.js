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
