import dictionary from "./dictionary.js";
import rarenessArray from "./rarenessArray.js";

// function canAddLetter(grid, word, letter) {
//  const lastLetterOfWord = word.slice(-1);
//  const letterToAdd = letter;
//  let lastLetterSubArray;
//  let letterToAddSubArray;

//  //find subarray that contains last letter of word
//  for (const subArray of grid){
//   if (subArray.includes(lastLetterOfWord)){
//     lastLetterSubArray=subArray;
//     break;
//   }
//  }
//  //find subarray that contains letter to add
//  for (const subArray of grid){
//   if (subArray.includes(letterToAdd)){
//     letterToAddSubArray =subArray;
//     break;
//   }
//  }
// //if last letter subarray is not the same as letter to add subarray or word is empty, return true
//  if (lastLetterSubArray !==letterToAddSubArray || word === ""){
//   return true;
//  }
//  else{
//   return false;
//  }
// }

function canAddLetter(grid, word, letter) {
  if (word === "") {
    return true; // An empty word can always have letters added.
  }

  const lastLetterOfWord = word.slice(-1);

  // Find subarrays that contain the last letter of the word and the letter to add.
  const lastLetterSubArray = grid.find((subArray) =>
    subArray.includes(lastLetterOfWord)
  );
  const letterToAddSubArray = grid.find((subArray) =>
    subArray.includes(letter)
  );

  // If either subarray is not found or they are not the same, return true.
  return (
    !lastLetterSubArray ||
    !letterToAddSubArray ||
    lastLetterSubArray !== letterToAddSubArray
  );
}

function canAddWord(grid, word) {
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    const nextLetter = word[i + 1];
    const currentLetterSubArray = grid.find((subArray) =>
      subArray.includes(letter)
    );
    const nextLetterSubArray = grid.find((subArray) =>
      subArray.includes(nextLetter)
    );
    if (currentLetterSubArray === nextLetterSubArray) {
      return false;
    }
  }
  return true;
}

//GO OVER AGAIN
// word.split("").every((letter,index, array)=>{
//   return !grid.some((subArray)=>{
//     const hasLetter =subArray.includes(letter)
//     const hasNextLetter = subArray.includes(array[index+1])
//     return hasLetter && hasNextLetter
//   })

// })

//For letterBoxed Game
function addLetter(grid, word, letter) {
  if (canAddLetter(grid, word, letter)) {
    return word + letter;
  } else {
    return word;
  }
}

//For letterBoxed Game
function isWord(word) {
  if (dictionary.has(word.toLowerCase())) {
    return true;
  } else {
    return false;
  }
}

//For letterBoxed Game
function addWord(word, wordList) {
  if (isWord(word)) {
    wordList.push(word);
    const lastLetter = word.slice(-1);
    return [wordList, lastLetter];
  } else {
    return wordList;
  }
}

function dictionaryWordContainsValidLetters(grid, word) {
  const mergedGridArray = grid.flat().map((letter) => letter.toLowerCase());

  return word.split("").every((letter) => mergedGridArray.includes(letter));
}

//   for (const letter of word){
//     if (!mergedGridArray.includes(letter)){
//       return false;
//     }
//   }
//   return true;
// }

function generatePossibleWords(grid) {
  const possibleWordsArray = [];

  for (const word of dictionary) {
    if (dictionaryWordContainsValidLetters(grid, word)) {
      possibleWordsArray.push(word);
    }
  }
  return possibleWordsArray.length > 0
    ? possibleWordsArray
    : console.log("No words found");
}

//Optimisation
function orderLettersByRareness(grid) {
  const orderedLetters = [];
  const mergedGridArray = grid.flat().map((letter) => letter.toLowerCase());
  for (const letter of rarenessArray) {
    if (mergedGridArray.includes(letter)) {
      orderedLetters.push(letter);
    }
  }
  return orderedLetters;
}

function addValidWords(possibleWordsArray, grid) {
  const validWordsArray = [];
  possibleWordsArray.forEach((word) => {
    if (canAddWord(grid, word)) {
      validWordsArray.push(word);
    }
  });

  return validWordsArray;
}

//NOT WORKING
function generateSolutions(validWordsArray, noOfWords, grid) {
  return validWordsArray
    .map((word) => {
      const solutionArray = [word];
      return findSolutions(validWordsArray, solutionArray, noOfWords, grid);
    })
    .flat();
}

function findSolutions(validWordsArray, solutionArray, noOfWords, grid) {
  if (solutionContainsAllLetters(grid, solutionArray)) {
    return [solutionArray];
  }
  if (noOfWords === 0) {
    return [];
  }
  const nextLetter = solutionArray[solutionArray.length - 1].slice(-1);

  const possibleNextWords = validWordsArray.filter((word) => {
    return word.startsWith(nextLetter) && !solutionArray.includes(word);
  });
  // console.log(nextLetter, possibleNextWords);
  const possibleNextSolutions = possibleNextWords.map((word) => {
    return [...solutionArray, word];
  });

  return possibleNextSolutions
    .map((solution) => {
      return findSolutions(validWordsArray, solution, noOfWords - 1, grid);
    })
    .flat();
}

function solutionContainsAllLetters(grid, solutionsArray) {
  const mergedGridArray = grid.flat().map((letter) => letter.toLowerCase());
  const mergedSolutionArray = solutionsArray.flat().join("");
  return mergedGridArray.every((letter) =>
    mergedSolutionArray.includes(letter)
  );
}

const gridInputs = document.querySelectorAll(".gridInput");
const gridOutputElements = document.querySelectorAll(".output");
const gridSubmitButton = document.querySelector("#gridSubmitButton");
const solutionOutput = document.querySelector("#solutionOutput");

// const usedCharacters = [];

function updateGridOutput(event, index) {
  const inputValue = event.target.value;
  // console.log(inputValue);
  gridOutputElements[index].textContent = inputValue;
}

function updateSolutionOutput(solution) {
  solutionOutput.textContent = solution;
}

//keyCode for backspace is 8
//keyCode for delete is 46

function validateGridInput(event, index) {
  const inputKey = event.which || event.keyCode;
  const inputChar = String.fromCharCode(inputKey);
  let usedCharacters = Array.from(gridInputs)
    .map((inputElement) => inputElement.value.split(""))
    .flat();
  if (inputKey === 8 || inputKey === 46) {
    handleInputChange(event, index);
  }
  const isAlphabetic =
    (inputKey >= 65 && inputKey <= 90) ||
    (inputKey >= 97 &&
      inputKey <= 122 &&
      event.target.value.length < 3 &&
      !usedCharacters.includes(inputChar));
  if (isAlphabetic) {
    const inputValue = event.target.value + inputChar;
    // usedCharacters.push(inputChar);
    console.log(usedCharacters);
    event.target.value = inputValue;
    // console.log(inputValue);
    updateGridOutput(event, index);
    // console.log(used);
  }

  event.preventDefault();
}

function handleGridSubmit(event) {
  const grid = [];
  const maxInputLength = 3;
  const inputElementsArray = Array.from(
    document.querySelectorAll(".gridInput")
  );
  const gridOutputElements = document.querySelectorAll(".output");
  console.log(inputElementsArray);

  if (hasInvalidInputLength(inputElementsArray, maxInputLength)) {
    clearInvalidInputs(inputElementsArray, gridOutputElements, maxInputLength);
  } else {
    createGrid(inputElementsArray, grid);
    console.log(grid);
    const lettersArray = drawText(grid, charCoordinates);
    // console.log(lettersArray);
    const possibleWordsArray = generatePossibleWords(grid);
    const validWordsArray = addValidWords(possibleWordsArray, grid);
    const noOfWords = prompt("How many words?");
    const solutionsArray = generateSolutions(validWordsArray, noOfWords, grid);
    console.log(solutionsArray);
    const solution = solutionsArray[0].join(" ");
    console.log(solution);
    drawSolution(solution, lettersArray);
    updateSolutionOutput(solution);
    // console.log(solution.split(" "));
    // console.log(lettersArray);
    // let findSolutionWithLength = prompt("Length of solution 1-5");
  }
}

function hasInvalidInputLength(inputElementsArray, maxInputLength) {
  return inputElementsArray.some(
    (inputElement) => inputElement.value.length !== maxInputLength
  );
}

function clearInvalidInputs(
  inputElementsArray,
  gridOutputElements,
  maxInputLength
) {
  alert(`Please enter ${maxInputLength} letters in each box`);
  inputElementsArray.map((inputElement, index) => {
    if (inputElement.value.length !== maxInputLength) {
      inputElement.value = "";
      gridOutputElements[index].textContent = "";
    }
  });
}

function createGrid(inputElementsArray, grid) {
  inputElementsArray.map((inputElement) => {
    const inputArray = inputElement.value.split("");
    grid.push(inputArray);
  });
  return grid;
}

gridInputs.forEach((inputElement, index) => {
  inputElement.addEventListener("input", (event) => {
    updateGridOutput(event, index);
  });
  inputElement.addEventListener("keypress", (event) => {
    validateGridInput(event, index);
  });
});

gridSubmitButton.addEventListener("click", (event) => {
  handleGridSubmit(event);
});

// function createGridObject(grid, charCoordinates) {
//   const gridObject = {};
//   grid.forEach((subArray, index) => {
//     subArray.forEach((letter, index2) => {
//       gridObject[letter] = charCoordinates[index][index2];
//     });
//     console.log(gridObject);
//   });
//   return gridObject;
// }

function Letter(letter, coordinates) {
  this.letter = letter;
  this.coordinates = coordinates;
}

const circleCoordinates = [
  { x: 120, y: 80 },
  { x: 200, y: 80 },
  { x: 280, y: 80 },
  { x: 320, y: 120 },
  { x: 320, y: 200 },
  { x: 320, y: 280 },
  { x: 280, y: 320 },
  { x: 200, y: 320 },
  { x: 120, y: 320 },
  { x: 80, y: 280 },
  { x: 80, y: 200 },
  { x: 80, y: 120 },
];

function createCircle(ctx, circleCoordinates) {
  for (const coordinates of circleCoordinates) {
    // ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(coordinates.x, coordinates.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}

function createSquare(ctx) {
  // ctx.strokeRect(80, 80, 240, 240);
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(80, 80);
  ctx.lineTo(320, 80);
  ctx.lineTo(320, 320);
  ctx.lineTo(80, 320);
  ctx.lineTo(80, 80);
  ctx.stroke();
}

function createBox(circleCoordinates) {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    createSquare(ctx);
    createCircle(ctx, circleCoordinates);
  }
}

const charCoordinates = [
  [
    [120, 60],
    [200, 60],
    [280, 60],
  ],
  [
    [60, 120],
    [60, 200],
    [60, 280],
  ],
  [
    [340, 120],
    [340, 200],
    [340, 280],
  ],
  [
    [120, 350],
    [200, 350],
    [280, 350],
  ],
];

// function drawText(grid, charCoordinates) {
//   const canvas = document.getElementById("canvas");
//   if (canvas.getContext) {
//     const ctx = canvas.getContext("2d");
//     ctx.font = "20px serif";
//     grid.forEach((subArray, index) => {
//       subArray.forEach((letter, index2) => {
//         ctx.fillText(letter, 100 * index2 + 100, 100 * index + 100);
//       });
//     });
//   }
// }

function drawText(grid, charCoordinates) {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const lettersArray = [];
    ctx.font = "40px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    grid.forEach((subArray, index) => {
      subArray.forEach((letter, index2) => {
        ctx.fillText(
          letter,
          charCoordinates[index][index2][0],
          charCoordinates[index][index2][1]
        );
        lettersArray.push({
          letter: letter,
          coordinates: charCoordinates[index][index2],
        });
      });
    });
    // console.log(lettersArray);
    return lettersArray;
  }
}
function drawLine(ctx, coordinates1, coordinates2) {
  ctx.beginPath();
  ctx.moveTo(coordinates1[0], coordinates1[1]);
  ctx.lineTo(coordinates2[0], coordinates2[1]);
  ctx.stroke();
}

function drawSolution(solution, lettersArray) {
  const solutionArray = solution.split(" ");
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let delay = 0;
    let wordIndex = 0;
    let letterIndex = 1;

    const drawNextLine = () => {
      if (wordIndex >= solutionArray.length) {
        // All words are drawn, clearInterval
        clearInterval(intervalId);
        return;
      }

      const word = solutionArray[wordIndex];
      const previousLetter = word[letterIndex - 1];
      const letter = word[letterIndex];

      const letterObject = lettersArray.find(
        (letterObject) => letterObject.letter === letter
      );
      const previousLetterObject = lettersArray.find(
        (letterObject) => letterObject.letter === previousLetter
      );

      drawLine(ctx, previousLetterObject.coordinates, letterObject.coordinates);

      letterIndex++;

      if (letterIndex >= word.length) {
        // Move to the next word
        console.log(word);
        ctx.clearRect(80, 80, 240, 240);
        createBox(circleCoordinates);
        wordIndex++;
        letterIndex = 1;
        delay += 2000; // Add a break of 2 seconds between words
      }

      delay += 1000; // Increment delay for each line (adjust as needed)
    };

    const intervalId = setInterval(drawNextLine, 1000); // Adjust the interval as needed
  }
}

window.addEventListener("load", createBox(circleCoordinates));

export default {
  canAddLetter,
  addLetter,
  isWord,
  addWord,
  dictionaryWordContainsValidLetters,
  generatePossibleWords,
  addValidWords,
  canAddWord,
  orderLettersByRareness,
  solutionContainsAllLetters,
  findSolutions,
  generateSolutions,

  //part 2
  hasInvalidInputLength,
};
