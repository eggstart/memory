
var ponder = $(".ponder-btn");
var container = $('.formContainer');
var apiKey = "";
const letterAureliano = document.getElementById('letterAureliano');
const letterNarrator = document.getElementById('letterNarrator');
const letterWenjie = document.getElementById('letterWenjie');
// var letterAurelianoOpen = false;

// DISPLAY INSTRUCTIONS ON PAGE LOAD
window.onload = function() {
    refresh();
    var message = "Record a fond memory or open an existing memory"
    open(message);
    document.getElementById("regards").innerHTML = "What does the end of time mean to you?";  
};

// CREATE NOTE
$("#ponder-btn").click(function () {
    refresh();
    // submit.on("click", displayResults)
    var data = document.getElementById('textareaResponse').value;
    if (data != "") {
        open(data);
        document.getElementById("regards").innerHTML = "Sincerely, Internet Stranger";
    }
})

// HOVER OVER NOTE
const letterHover = [letterAureliano, letterNarrator, letterWenjie];
letterHover.forEach((d, i) => {
    d.addEventListener("mouseenter", function( event ) {
        if (d.src.match("images/letter-closed.png")) {
            d.src = "images/letter-open.png";
        }
    })
    d.addEventListener("mouseout", function( event ) {
        if (d.src.match("images/letter-open.png")) {
            d.src = "images/letter-closed.png";
        }
    });
})

// OPEN NOTE
$("#letterAureliano").click(function () {
    refresh();
   var message = "When my father took me to discover ice."
   open(message);
   var imageID = document.getElementById('letterAureliano');
//    if (imageID.src.match("images/letter-closed.png")) {
    imageID.src = "images/letter-open.png";
    // }  
    document.getElementById("regards").innerHTML = "With Gratitude, Colonel Aureliano Buendía";
})

$("#letterNarrator").click(function () {
    refresh();
    var message = "A single white bird taking flight. The bird wings over the Wall and into the flurried clouds of the southern sky."
    open(message);
    imgChange('letterNarrator');
    document.getElementById("regards").innerHTML = "Warmly, The Dreamreader";
})

$("#letterWenjie").click(function () {
    refresh();
    var message = "The ruddy sun dissolved into the clouds and spread over the sky, illuminating a large patch in magnificent blood –– my sunset."
    open(message);
    imgChange('letterWenjie');
    document.getElementById("regards").innerHTML = "Regards, Ye Wenjie";
})

// HELPER - OPEN EXISTING NOTE
function open(message) {
    // var removePunc = message.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    var removePunc = message;

    var words = removePunc.split(" ");
    words.forEach((d,i) => {
        const newWord = document.createElement("span");
        newWord.setAttribute("id", d);
        newWord.setAttribute("class", "mouseoverWord");
        const node0 = document.createTextNode(d +" ");
        newWord.appendChild(node0);
        const element0 = document.getElementById("thoughts");
        element0.appendChild(newWord);
        

        newWord.addEventListener("mouseenter", function( event ) {
            document.getElementById("wordName").innerHTML = "";
            document.getElementById("wordDef").innerHTML = "";
            document.getElementById("wordSpeech").innerHTML = "";
            document.getElementById("wordOff").innerHTML = "";
            
            define(newWord.id, false, d);
            console.log(newWord.id)
        });

        // SCRAMBLE DEFINITION WHEN CLICK ON WORD
        newWord.addEventListener("click", function( event ) {
            // document.getElementById("wordName").innerHTML = "";
            document.getElementById("wordDef").innerHTML = "";
            document.getElementById("wordSpeech").innerHTML = "";
            document.getElementById("wordOff").innerHTML = "";

            newWord.setAttribute("class", "mouseoverScramble");

            randomWord = $.getJSON(`https://random-word-api.herokuapp.com/word?number=1`, function(result){
                newWord.setAttribute("id", result[0]);
                define(result[0], true, d)            
            })  
        })
    })
}

// HELPER - CHANGE LETTER IMAGE
function imgChange(id) {
    var imageID = document.getElementById(id);
    if (imageID.src.match("images/letter-closed.png")) {
        imageID.src = "images/letter-open.png";
    }
    else {
        imageID.src = "images/letter-closed.png";
    }
} 

// HELPER - RESET LETTER IMAGES
function imgReset() {
    ['letterAureliano', 'letterNarrator', 'letterWenjie'].forEach((d) => {
    var imageID = document.getElementById(d);
    if (imageID.src.match("images/letter-open.png")) {
        imageID.src = "images/letter-closed.png";
    }
    })
} 

// HELPER - REFRESH THOUGHTS AND LETTER IMAGES
function refresh() {
    imgReset()
    document.getElementById("thoughts").innerHTML = "";
    document.getElementById("wordName").innerHTML = "";
    document.getElementById("wordDef").innerHTML = "";
    document.getElementById("wordSpeech").innerHTML = "";
    document.getElementById("wordOff").innerHTML = "";
    document.getElementById("regards").innerHTML = "";
}

// HELPER - SHOW DEFINITION OF WORD ON HOVER
// word is the definition we want to use
// name is the name we should be displaying
function define(word, ifScramble, name) {
    wordURL = $.getJSON(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=f7e7c888-6c65-4be3-8316-37423b42381e`, function(result){
    if (typeof result[0] === 'object' && result[0] !== null) {
        const wordInfo = result[0]

        var wordName = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        wordName = wordName.toString().toLowerCase()

        const wordDef = wordInfo['shortdef'];
        const wordSpeech = wordInfo['fl'];
        const wordOff = wordInfo['meta']['offensive'];

        if (ifScramble === false) {
            const newName = document.createElement("span");
            newName.setAttribute("id", "wordNameSpan");
            const node0 = document.createTextNode(name.toLowerCase());
            newName.appendChild(node0);
            const element0 = document.getElementById("wordName");
            element0.appendChild(newName);
        } else {
            var currName = document.getElementById("wordName").innerHTML;
            if (currName === 'this defintion doesn\'t exist <em>yet</em>') {
                document.getElementById("wordName").innerHTML = "";
                const newName = document.createElement("span");
                newName.setAttribute("id", "wordNameSpan");
                const node0 = document.createTextNode(name.toLowerCase());
                newName.appendChild(node0);
                const element0 = document.getElementById("wordName");
                element0.appendChild(newName);
            }
        }

        wordDef.forEach((d,i) => {
            const newDef = document.createElement("p");
            const node = document.createTextNode(wordDef[i]);
            newDef.appendChild(node);
            const element = document.getElementById("wordDef");
            element.appendChild(newDef);
        });
        
        const newSpeech = document.createElement("span");
        const node2 = document.createTextNode(wordSpeech);
        newSpeech.appendChild(node2);
        const element2 = document.getElementById("wordSpeech");
        element2.appendChild(newSpeech);


        const newOff = document.createElement("span");
        if (wordOff === true) {
            const node3 = document.createTextNode("offensive language!");
            newOff.appendChild(node3);
            const element3 = document.getElementById("wordOff");
            element3.appendChild(newOff);
        } else {
            const node3 = document.createTextNode("not offensive language");
            newOff.appendChild(node3);
            const element3 = document.getElementById("wordOff");
            element3.appendChild(newOff);
        }
    } else {
        if (ifScramble === false) {
            document.getElementById("wordName").innerHTML = "this defintion doesn't exist <em>yet</em>";
            document.getElementById("wordDef").innerHTML = "Click on the word to find new meaning.";
        } else {
            // CONTINUE UNTIL WORD WITH DEFINITION
            randomWord = $.getJSON(`https://random-word-api.herokuapp.com/word?number=1`, function(result){
                define(result[0], true, name)       
        })    
    }
    }
}) 
}
