var ponder = $(".ponder-btn");
var container = $('.formContainer');
var apiKey = "";

// CREATE NOTE
$("#ponder-btn").click(function () {
    refresh();
    // submit.on("click", displayResults)
    var data = document.getElementById('textareaResponse').value;
    if (data != "") {
        open(data);
    }
})

// OPEN NOTE

$("#letterAureliano").click(function () {
    refresh();
   var message = "when my father took me to discover ice"
   open(message);
   imgChange('letterAureliano');
   document.getElementById("regards").innerHTML = "with gratitude, aureliano";

})

$("#letterNarrator").click(function () {
    refresh();
    var message = "a somber farewell to my shadow"
    open(message);
    imgChange('letterNarrator');
    document.getElementById("regards").innerHTML = "";
})

$("#letterWenjie").click(function () {
    refresh();
    var message = "when my father took me to discover ice"
    open(message);
    imgChange('letterWenjie');
})


// HELPER - OPEN EXISTING NOTE
function open(message) {
    var words = message.split(" ");
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
            
            define(d);
        });
    })
}

// HELPER - CHANGE LETTER
function imgChange(id) {
    var imageID = document.getElementById(id);
    if (imageID.src.match("images/letter-closed.png")) {
        imageID.src = "images/letter-open.png";
    }
    else {
        imageID.src = "images/letter-closed.png";
    }
} 

// HELPER - RESET LETTERS
function imgReset() {
    ['letterAureliano', 'letterNarrator', 'letterWenjie'].forEach((d) => {
    var imageID = document.getElementById(d);
    if (imageID.src.match("images/letter-open.png")) {
        imageID.src = "images/letter-closed.png";
    }
    })
} 

// HELPER - REFRESH THOUGHTS
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
function define(word) {
    wordURL = $.getJSON(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=f7e7c888-6c65-4be3-8316-37423b42381e`, function(result){
    console.log(typeof result[0]);
    if ((typeof result[0]) != string) {
        const wordInfo = result[0]
        const wordName = word;

        const wordDef = wordInfo['shortdef'];
        const wordSpeech = wordInfo['fl'];
        const wordOff = wordInfo['meta']['offensive'];

        const newName = document.createElement("span");
        const node0 = document.createTextNode(wordName);
        newName.appendChild(node0);
        const element0 = document.getElementById("wordName");
        element0.appendChild(newName);
        
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
        document.getElementById("wordName").innerHTML = "this defintion doesn't exist <em>yet</em>";

    }
    }) 
}



