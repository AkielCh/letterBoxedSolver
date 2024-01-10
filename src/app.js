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
    const lettersArray = drawText(grid, charCoordinates, circleCoordinates);
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
  //top
  //left
  //right:
  // bottom
  [
    { x: 120, y: 80 },
    { x: 200, y: 80 },
    { x: 280, y: 80 },
  ],

  [
    { x: 80, y: 120 },
    { x: 80, y: 200 },
    { x: 80, y: 280 },
  ],
  [
    { x: 320, y: 120 },
    { x: 320, y: 200 },
    { x: 320, y: 280 },
  ],
  [
    { x: 120, y: 320 },
    { x: 200, y: 320 },
    { x: 280, y: 320 },
  ],
];

function createCircle(ctx, circleCoordinates) {
  for (const side of circleCoordinates) {
    for (const coordinates of side) {
      // ctx.lineWidth = 5;
      ctx.strokeStyle = "white";
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(coordinates.x, coordinates.y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
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

function drawText(grid, charCoordinates, circleCoordinates) {
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
          letterCoordinates: charCoordinates[index][index2],
          circleCoordinates: circleCoordinates[index][index2],
        });
      });
    });
    // console.log(lettersArray);
    return lettersArray;
  }
}

async function reDraw(ctx, linePaths) {
  for (const linePath of linePaths) {
    console.log(linePath);
    ctx.strokeStyle = "rgba(200, 0, 0, 0.5)";
    ctx.setLineDash([1, 3]);
    drawLine(ctx, linePath[0], linePath[1]);
  }
}

function drawLetter(ctx, letterObject, colour) {
  ctx.font = "40px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = colour;
  ctx.fillText(
    letterObject.letter,
    letterObject.letterCoordinates[0],
    letterObject.letterCoordinates[1]
  );
}

function calculatePoint(coordinates1, coordinates2) {
  const vector1 = {
    x: coordinates1.circleCoordinates.x,
    y: coordinates1.circleCoordinates.y,
  };
  const vector2 = {
    x: coordinates2.circleCoordinates.x,
    y: coordinates2.circleCoordinates.y,
  };

  const directionVector = {
    x: vector2.x - vector1.x,
    y: vector2.y - vector1.y,
  };

  const magnitude = Math.sqrt(directionVector.x ** 2 + directionVector.y ** 2);
  const linePoints = [];
  for (let i = 0; i < 60; i++) {
    
  }

/*

VECTOR EQUATION OF A LINE
r=a+t⋅v

Here:


r is the position vector of any point on the line,

a is the position vector of a specific point on the line (often called a reference point or a point of origin),

v is the direction vector of the line,

t is a parameter that varies over the real numbers.*/

//find gradient
function findGradient(coordinates1, coordinates2) {
  if (
    coordinates2.circleCoordinates.x - coordinates1.circleCoordinates.x ===
    0
  ) {
    return undefined;
  }
  const gradient =
    (coordinates2.circleCoordinates.y - coordinates1.circleCoordinates.y) /
    (coordinates2.circleCoordinates.x - coordinates1.circleCoordinates.x);
  console.log(gradient);
  return gradient;
}

//find y intercept
function findYIntercept(coordinates1, gradient) {
  const yIntercept =
    coordinates1.circleCoordinates.y -
    gradient * coordinates1.circleCoordinates.x;
  console.log(yIntercept);
  return yIntercept;
}

function findLinePoints(coordinates1, coordinates2) {
  // console.log(coordinates1, coordinates2);
  const gradient = findGradient(coordinates1, coordinates2);
  const animatedLinePoints = [];
  if (gradient === undefined) {
    const x = coordinates1.circleCoordinates.x;
    for (let i = 0; i < 60; i++) {
      const y =
        coordinates1.circleCoordinates.y +
        ((coordinates2.circleCoordinates.y - coordinates1.circleCoordinates.y) /
          60) *
          i;
      animatedLinePoints.push({ x: x, y: y });
    }
  } else {
    const yIntercept = findYIntercept(coordinates1, gradient);
    for (let i = 0; i < 60; i++) {
      const x =
        coordinates1.circleCoordinates.x +
        ((coordinates2.circleCoordinates.x - coordinates1.circleCoordinates.x) /
          60) *
          i;
      const y = gradient * x + yIntercept;

      animatedLinePoints.push({ x: x, y: y });
    }
  }
  console.log(animatedLinePoints);
  return animatedLinePoints;
}

async function drawSolution(solution, lettersInfoArray) {
  const finalSolutionOutput = document.querySelector("#finalSolution");
  const solutionArray = solution.split(" ");
  const canvas = document.getElementById("canvas");

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    for (const word of solutionArray) {
      await drawWord(ctx, lettersInfoArray, word);
      finalSolutionOutput.textContent += word + "  ";
    }
  }
}
async function drawWord(ctx, lettersInfoArray, word) {
  const dashedLinePaths = [];
  for (let i = 0; i < word.length - 1; i++) {
    const currentLetter = lettersInfoArray.find(
      (letterObject) => letterObject.letter === word[i]
    );

    drawLetter(ctx, currentLetter, "black");

    const nextLetter = lettersInfoArray.find(
      (letterObject) => letterObject.letter === word[i + 1]
    );

    await drawLine(ctx, currentLetter, nextLetter);

    console.log(`Drawing white letter: ${currentLetter.letter}`);
    drawLetter(ctx, currentLetter, "white");
    dashedLinePaths.push([
      currentLetter.circleCoordinates,
      nextLetter.circleCoordinates,
    ]);
  }
  // reDraw(ctx, dashedLinePaths);
}

async function drawLine(ctx, coordinates1, coordinates2) {
  ctx.strokeStyle = "black";

  ctx.beginPath();
  const linePoints = findLinePoints(coordinates1, coordinates2);
  ctx.moveTo(linePoints[0].x, linePoints[0].y);

  let i = 0;

  await animateLine(ctx, coordinates1, linePoints, i);
}
function animateLine(ctx, coordinates1, linePoints, i) {
  return new Promise((resolve) => {
    if (i < linePoints.length) {
      ctx.beginPath();
      ctx.moveTo(
        coordinates1.circleCoordinates.x,
        coordinates1.circleCoordinates.y
      );
      ctx.lineTo(linePoints[i].x, linePoints[i].y);
      ctx.stroke();
      i++;
      requestAnimationFrame(() =>
        animateLine(ctx, coordinates1, linePoints, i).then(resolve)
      );
    } else {
      resolve();
    }
  });
}

//Use of requestAnimationFrame
//  method tells the browser that you wish to perform an animation. It requests the browser to call a user-supplied callback function prior to the next repaint.

//Things to do
//Change the use of gradient into vectors to improve animation speed
//Modify numbers to make it responsive
//fix redraw of dashed lines

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
