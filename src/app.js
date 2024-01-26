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
  const mergedGridSet = new Set(
    grid.flat().map((letter) => letter.toLowerCase())
  );

  return word.split("").every((letter) => mergedGridSet.has(letter));
}

function generatePossibleWords(grid) {
  const possibleWordsArray = Array.from(dictionary).filter((word) =>
    dictionaryWordContainsValidLetters(grid, word)
  );

  // console.log(possibleWordsArray);
  return possibleWordsArray;
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

function orderWordsByUniqueCharacters(validWordsArray) {
  const validWordsInUniqueOrder = validWordsArray.sort((a, b) => {
    let uniqueA = new Set(a.split(""));
    let uniqueB = new Set(b.split(""));
    return uniqueB.size - uniqueA.size;
  });
  return validWordsInUniqueOrder;
}

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

function solutionOfNoOfWords(solutionsArray, noOfWords) {
  console.log(solutionsArray);
  console.log(noOfWords);

  return solutionsArray.filter(
    (solution) => solution.length === Number(noOfWords)
  );

  console.log(correctLengthSolutions);
}

// const gridInputs = document.querySelectorAll(".gridInput");
// const gridOutputElements = document.querySelectorAll(".output");
// const gridSubmitButton = document.querySelector("#gridSubmitButton");

// // DISCUSS WITH MENTOR
// const inputValues = new Array(gridInputs.length).fill("");

// function updateInputValues(event, index) {
//   const inputValue = event.target.value.toLowerCase();
//   inputValues[index] = inputValue;
//   console.log(inputValues);
// }
// // Modify code to use regEx
// function validateGridInput(event, index) {
//   const inputKey = event.which || event.keyCode;
//   const inputChar =
//     inputKey >= 65 && inputKey <= 90
//       ? String.fromCharCode(inputKey + 32)
//       : String.fromCharCode(inputKey);
//   let usedCharacters = inputValues.join("").toLowerCase().split("");

//   function isLetter(str) {
//     return str.length === 1 && str.match(/[a-z]/i);
//   }

//   const isAlphabetic =
//     (inputKey >= 65 && inputKey <= 90) || (inputKey >= 97 && inputKey <= 122);

//   if (
//     isAlphabetic &&
//     event.target.value.length < 3 &&
//     !usedCharacters.includes(inputChar)
//   ) {
//     const inputValue = event.target.value + inputChar;
//     event.target.value = inputValue;
//     updateInputValues(event, index);
//   }

//   event.preventDefault();
// }

// function handleGridSubmit(event) {
//   const grid = [];
//   const maxInputLength = 3;
//   const inputElementsArray = Array.from(
//     document.querySelectorAll(".gridInput")
//   );
//   const gridOutputElements = document.querySelectorAll(".output");
//   console.log(inputElementsArray);

//   if (hasInvalidInputLength(inputElementsArray, maxInputLength)) {
//     clearInvalidInputs(inputElementsArray, gridOutputElements, maxInputLength);
//   } else {
//     createGrid(inputElementsArray, grid);
//     console.log(grid);
//     const lettersArray = drawText(grid, charCoordinates, circleCoordinates);
//     // console.log(lettersArray);
//     const possibleWordsArray = generatePossibleWords(grid);
//     console.log(possibleWordsArray);
//     const validWordsArray = addValidWords(possibleWordsArray, grid);
//     console.log(validWordsArray);
//     const noOfWords = prompt("How many words?");
//     const solutionsArray = generateSolutions(validWordsArray, noOfWords, grid);
//     console.log(solutionsArray);
//     const solution = solutionOfNoOfWords(solutionsArray, noOfWords)[0].join(
//       " "
//     );
//     console.log(solution);
//     drawSolution(solution, lettersArray);
//     // console.log(solution.split(" "));
//     // console.log(lettersArray);
//     // let findSolutionWithLength = prompt("Length of solution 1-5");
//   }
// }

// function hasInvalidInputLength(inputElementsArray, maxInputLength) {
//   return inputElementsArray.some(
//     (inputElement) => inputElement.value.length !== maxInputLength
//   );
// }

// function clearInvalidInputs(
//   inputElementsArray,
//   gridOutputElements,
//   maxInputLength
// ) {
//   alert(`Please enter ${maxInputLength} letters in each box`);
//   inputElementsArray.map((inputElement, index) => {
//     if (inputElement.value.length !== maxInputLength) {
//       inputElement.value = "";
//       gridOutputElements[index].textContent = "";
//     }
//   });
// }

// function createGrid(inputElementsArray, grid) {
//   inputElementsArray.map((inputElement) => {
//     const inputArray = inputElement.value.split("");
//     grid.push(inputArray);
//   });
//   return grid;
// }

// gridInputs.forEach((inputElement, index) => {
//   inputElement.addEventListener("input", (event) => {
//     updateInputValues(event, index);
//   });
//   inputElement.addEventListener("keypress", (event) => {
//     validateGridInput(event, index);
//   });
// });

// gridSubmitButton.addEventListener("click", (event) => {
//   handleGridSubmit(event);
// });

// const circleCoordinates = [
//   //top
//   //left
//   //right:
//   // bottom
//   [
//     { x: 120, y: 80 },
//     { x: 200, y: 80 },
//     { x: 280, y: 80 },
//   ],

//   [
//     { x: 80, y: 120 },
//     { x: 80, y: 200 },
//     { x: 80, y: 280 },
//   ],
//   [
//     { x: 320, y: 120 },
//     { x: 320, y: 200 },
//     { x: 320, y: 280 },
//   ],
//   [
//     { x: 120, y: 320 },
//     { x: 200, y: 320 },
//     { x: 280, y: 320 },
//   ],
// ];

// function createCircle(ctx, circleCoordinates) {
//   for (const side of circleCoordinates) {
//     for (const coordinates of side) {
//       ctx.lineWidth = 2;
//       // ctx.strokeStyle = "black";
//       ctx.fillStyle = "white";
//       ctx.beginPath();
//       ctx.arc(coordinates.x, coordinates.y, 5, 0, 2 * Math.PI);
//       ctx.fill();
//       ctx.stroke();
//     }
//   }
// }

// function createSquare(ctx) {
//   ctx.lineWidth = 5;
//   ctx.strokeRect(80, 80, 240, 240);

//   // ctx.beginPath();
//   // ctx.moveTo(80, 80);
//   // ctx.lineTo(320, 80);
//   // ctx.lineTo(320, 320);
//   // ctx.lineTo(80, 320);
//   // ctx.lineTo(80, 80);
//   // ctx.stroke();
// }

// function createBox(circleCoordinates) {
//   const canvas = document.getElementById("canvas");
//   if (canvas.getContext) {
//     const ctx = canvas.getContext("2d");
//     ctx.strokeStyle = "#62AA87";
//     createSquare(ctx);
//     createCircle(ctx, circleCoordinates);
//   }
// }

// const charCoordinates = [
//   [
//     [120, 60],
//     [200, 60],
//     [280, 60],
//   ],
//   [
//     [60, 120],
//     [60, 200],
//     [60, 280],
//   ],
//   [
//     [340, 120],
//     [340, 200],
//     [340, 280],
//   ],
//   [
//     [120, 350],
//     [200, 350],
//     [280, 350],
//   ],
// ];

// function drawText(grid, charCoordinates, circleCoordinates) {
//   const canvas = document.getElementById("canvas");
//   if (canvas.getContext) {
//     const ctx = canvas.getContext("2d");
//     const lettersArray = [];
//     ctx.font = "40px serif";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     grid.forEach((subArray, index) => {
//       subArray.forEach((letter, index2) => {
//         ctx.fillText(
//           letter,
//           charCoordinates[index][index2][0],
//           charCoordinates[index][index2][1]
//         );
//         lettersArray.push({
//           letter: letter,
//           letterCoordinates: charCoordinates[index][index2],
//           circleCoordinates: circleCoordinates[index][index2],
//         });
//       });
//     });

//     return lettersArray;
//   }
// }

// function reDraw(ctx, linePaths) {
//   ctx.strokeStyle = "rgba(70, 79,81)";
//   ctx.lineWidth = 5;
//   ctx.clearRect(80, 80, 240, 240);
//   createBox(circleCoordinates);
//   console.log(linePaths);
//   for (const linePath of linePaths) {
//     console.log(linePath);
//     // console.log(linePath[0]);
//     // console.log(linePath[1]);
//     ctx.strokeStyle = "rgba(70, 79,81)";
//     ctx.lineWidth = 3;
//     ctx.setLineDash([7, 5]);
//     drawDashLine(ctx, linePath[0], linePath[1]);
//   }
// }

// function drawDashLine(ctx, coordinates1, coordinates2) {
//   console.log(coordinates1.x);
//   console.log(coordinates1.y);
//   ctx.beginPath();
//   ctx.moveTo(coordinates1.x, coordinates1.y);
//   ctx.lineTo(coordinates2.x, coordinates2.y);
//   ctx.stroke();
// }

// function drawLetter(ctx, letterObject, colour) {
//   ctx.font = "40px serif";
//   ctx.textAlign = "center";
//   ctx.textBaseline = "middle";
//   ctx.fillStyle = colour;
//   ctx.fillText(
//     letterObject.letter,
//     letterObject.letterCoordinates[0],
//     letterObject.letterCoordinates[1]
//   );
// }

// function calculateMagnitude(coordinates1, coordinates2) {
//   const magnitude = Math.sqrt(
//     (coordinates2.circleCoordinates.x - coordinates1.circleCoordinates.x) ** 2 +
//       (coordinates2.circleCoordinates.y - coordinates1.circleCoordinates.y) ** 2
//   );
//   return magnitude;
// }

// function calculateDirectionVector(coordinates1, coordinates2) {
//   console.log(coordinates1);
//   const directionVector = {
//     x: coordinates2.circleCoordinates.x - coordinates1.circleCoordinates.x,
//     y: coordinates2.circleCoordinates.y - coordinates1.circleCoordinates.y,
//   };
//   return directionVector;
// }

// function calculatePointOnLine(magnitude, directionVector, x1, y1, t) {
//   const u = {
//     x: directionVector.x / magnitude,
//     y: directionVector.y / magnitude,
//   };

//   const point = {
//     x: x1 + t * u.x,
//     y: y1 + t * u.y,
//   };
//   return point;
// }

// function calculateAllPoints(coordinates1, coordinates2) {
//   //SEGMENT LENGTH IS TO BE PASSED AS PARAMETER AND BASED ON THE SIZE OF THE CANVAS
//   const segmentLength = 5;
//   const magnitude = calculateMagnitude(coordinates1, coordinates2);
//   const maxSegments = Math.floor(magnitude / segmentLength);
//   const directionVector = calculateDirectionVector(coordinates1, coordinates2);
//   const allPoints = [];
//   for (let i = 0; i < maxSegments; i++) {
//     const point = calculatePointOnLine(
//       magnitude,
//       directionVector,
//       coordinates1.circleCoordinates.x,
//       coordinates1.circleCoordinates.y,
//       i * segmentLength
//     );
//     allPoints.push(point);
//   }
//   return allPoints;
// }

// async function drawSolution(solution, lettersInfoArray) {
//   const finalSolutionOutput = document.querySelector("#finalSolution");
//   const solutionArray = solution.split(" ");
//   const canvas = document.getElementById("canvas");

//   if (canvas.getContext) {
//     const ctx = canvas.getContext("2d");
//     const dashedLinePaths = [];
//     for (const word of solutionArray) {
//       await drawWord(ctx, lettersInfoArray, word, dashedLinePaths);
//       finalSolutionOutput.textContent += word + "  ";
//     }
//   }
// }
// async function drawWord(ctx, lettersInfoArray, word, dashedLinePaths) {
//   const reDrawLinePaths = dashedLinePaths;
//   for (let i = 0; i < word.length - 1; i++) {
//     const currentLetter = lettersInfoArray.find(
//       (letterObject) => letterObject.letter === word[i]
//     );

//     drawLetter(ctx, currentLetter, "black");

//     const nextLetter = lettersInfoArray.find(
//       (letterObject) => letterObject.letter === word[i + 1]
//     );
//     ctx.setLineDash([]);
//     ctx.lineWidth = 5;
//     await drawLine(ctx, currentLetter, nextLetter);

//     console.log(`Drawing white letter: ${currentLetter.letter}`);
//     drawLetter(ctx, currentLetter, "white");
//     dashedLinePaths.push([
//       currentLetter.circleCoordinates,
//       nextLetter.circleCoordinates,
//     ]);
//   }

//   // console.log(dashedLinePaths);
//   reDraw(ctx, reDrawLinePaths);
// }

// async function drawLine(ctx, coordinates1, coordinates2) {
//   ctx.setLineDash([]);
//   ctx.strokeStyle = "white";
//   ctx.beginPath();
//   const linePoints = calculateAllPoints(coordinates1, coordinates2);
//   ctx.moveTo(linePoints[0].x, linePoints[0].y);
//   let i = 0;
//   await animateLine(ctx, coordinates1, linePoints, i);
// }

// function drawHead(ctx, x, y, colour) {
//   // Draw the black head
//   ctx.beginPath();
//   ctx.arc(x, y, 2, 0, Math.PI * 2); // Adjust the head size as needed
//   ctx.fillStyle = colour;
//   ctx.fill();
// }

// function animateLine(ctx, coordinates1, linePoints, i) {
//   return new Promise((resolve) => {
//     if (i < linePoints.length) {
//       ctx.beginPath();
//       ctx.moveTo(
//         coordinates1.circleCoordinates.x,
//         coordinates1.circleCoordinates.y
//       );
//       ctx.lineTo(linePoints[i].x, linePoints[i].y);
//       ctx.stroke();
//       if (i < linePoints.length - 1) {
//         drawHead(ctx, linePoints[i].x, linePoints[i].y, "black");
//       } else {
//         drawHead(ctx, linePoints[i - 1].x, linePoints[i - 1].y, "white");
//       }
//       i++;
//       requestAnimationFrame(() =>
//         animateLine(ctx, coordinates1, linePoints, i).then(resolve)
//       );
//     } else {
//       resolve();
//     }
//   });
// }

// //Things to do

// //Main task optimise the code to work for a larger dictionary
// //Potential optimisations
// //find the shortest solutions - when recursively finding solutions, if the current solution is longer than the shortest solution, stop searching
// //order valid words in validWordsArray by the number of unique letters and then by the number of letters

// //Use a trie data structure

// //Modify numbers to make it responsive
// // Change how line is drawn to  make the point a different colour
// // Change code to make the letters uppercase
// // use regEx to check for checking inputs
// // change magic numbers
// //Change how line is drawn to  make the point a different colour
// //improve visuals

// window.addEventListener("load", createBox(circleCoordinates));

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
  orderWordsByUniqueCharacters,
  findSolutions,
  generateSolutions,
};
