const inc_length = document.getElementById("incLength");
const dec_length = document.getElementById("decLength");
const idc_length = document.getElementById("idcLength")
const incr_button = document.getElementById("inc");
const dec_button = document.getElementById("dec");
const numWordsSpan = document.getElementById("NumWords");
const lengthSpan = document.getElementById("length");
const langSelector = document.getElementById("language");
const getButton = document.getElementById("get");
const output = document.getElementById("output");
const wordList = document.getElementById("words");

let numWords = 1;
numWordsSpan.textContent = `${numWords}`;

inc_length.addEventListener('click', (click) => {
    if (lengthSpan.textContent === "idc"){
        lengthSpan.textContent = 1;
    } else {
        lengthSpan.textContent = `${parseInt(lengthSpan.textContent) + 1}`
    }
})

dec_length.addEventListener('click', (click) => {
    if (lengthSpan.textContent === "idc" || parseInt(lengthSpan.textContent) === 1){
        lengthSpan.textContent = 1;
    } else {
        lengthSpan.textContent = `${parseInt(lengthSpan.textContent) - 1}`
    }
})

idc_length.addEventListener('click', (click) => {
    lengthSpan.textContent = "idc"
})

incr_button.addEventListener('click', (click) => {
    numWords++;
    numWordsSpan.textContent = `${numWords}`
})

dec_button.addEventListener('click', (click) => {
    if (numWords > 1){
        numWords--;
    }
    numWordsSpan.textContent = `${numWords}`
})

getButton.addEventListener('click', (click) => {
    let lang = langSelector.value;
    output.textContent = "Here ";
    if (numWords === 1){
        output.textContent += `is ${numWords} word`;;
    } else {
        output.textContent += `are ${numWords} words`;
    }
    output.textContent += ` in ${langSelector.options[langSelector.selectedIndex].textContent}`;
    if (lengthSpan.textContent !== "idc"){
        output.textContent += ` of length ${lengthSpan.textContent}`;
    }
    wordList.textContent = "";
    fetchWords(lang, numWords, lengthSpan.textContent);
})

const baseURL = "https://random-word-api.herokuapp.com/word"

const fetchWords = (lang, num, length) => {
    let fetchURL = baseURL;
    fetchURL += `?number=${num}`
    if (lang !== "en") {
        fetchURL += `&lang=${lang}`;
    }
    if (length !== "idc"){
        fetchURL += `&length=${length}`;
    }
    fetch(fetchURL)
        .then(res => res.json())
        .then(words => {
            if (words.length === 0) {
                output.innerHTML += "<p>No words were found.</p>"
            }
            words.forEach(word => {
                const wordLi = document.createElement("li");
                wordLi.textContent = word;
                wordList.appendChild(wordLi);
            })
        })
    .catch(error => console.error(error));
}