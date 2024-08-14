// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {
  // Create Span
  let span = document.createElement("span");
  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);
  // Append The Letter To Span
  span.appendChild(theLetter);
  // Add Class On Span
  span.className = 'letter-box';
  // Append Span To The Letters Container
  lettersContainer.appendChild(span);

});

// Object Of Words + Categories
const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

// Get Random Property

let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

let randomPropName = allKeys[randomPropNumber]; // Category
let randomPropValue = words[randomPropName]; // Category Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length); // Random Number Depend On Words

let randomValueValue = randomPropValue[randomValueNumber]; // The Chosen Word

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSpace.forEach(letter => {

  // Create Empty Span
  let emptySpan = document.createElement("span");

  // If Letter Is Space
  if (letter === ' ') {
    // Add Class To The Span
    emptySpan.className = 'with-space done';
  }
  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");
let doneSpans = false;

let wrongAttempts = 0; // Set Wrong Attempts
let theDraw = document.querySelector(".hangman-draw"); // Select The Draw Element

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Choose Status
  let theStatus = false;

  if (e.target.className === 'letter-box') {
    e.target.classList.add("clicked");
    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, WordIndex) => {
      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        // Set Status To Correct
        theStatus = true;
        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
            span.classList.add("done");
          }
        });
      }
    });

    // If Letter Is Wrong
    if (theStatus !== true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      // Change Wrong Color Into Red
      e.target.style.cssText =
        "background-color: red; \
        opacity: 1;"

      if (wrongAttempts === 8) {
        endGame();
      }
    }

    // If Letter Is Right
    else {
      // Change Right Color Into Red
      e.target.style.cssText =
        "background-color: green; \
        opacity: 1;"
    }
    // Loop On Spans To Check If All Done Or Not
    doneSpans = Array.from(guessSpans).every(function (span) {
      return span.classList.contains("done");
    });
    // If Yes Call Success Function
    if (doneSpans)
      successGame();
  }
});


// Fail End Game
function endGame() {
  // Create Popup Div
  let div = document.createElement("div");
  let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
  div.appendChild(divText);
  div.className = 'popup-fail';
  document.body.appendChild(div);
}

// Success End Game
function successGame() {
  // Create Popup Div
  let div = document.createElement("div");
  let divText = document.createTextNode(`Gongratulation, You Got The Word After ${wrongAttempts} Wrong Attempts`);
  div.appendChild(divText);
  div.className = 'popup-success';
  document.body.appendChild(div);
}