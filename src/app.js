import dictionary from "./dictionary.js";
import rarenessArray from "./rarenessArray.js";

function canAddLetter(grid, word, letter) {
  if (word === "") {
    return true;
  }
  const lastLetterOfWord = word.slice(-1);
  const lastLetterSubArray = grid.find((subArray) =>
    subArray.includes(lastLetterOfWord)
  );
  const letterToAddSubArray = grid.find((subArray) =>
    subArray.includes(letter)
  );
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

function dictionaryWordContainsValidLetters(grid, word) {
  const mergedGridSet = new Set(
    grid.flat().map((letter) => letter.toUpperCase())
  );

  return word.split("").every((letter) => mergedGridSet.has(letter));
}

function generatePossibleWords(grid) {
  const possibleWordsArray = Array.from(dictionary).filter((word) =>
    dictionaryWordContainsValidLetters(grid, word)
  );
  return possibleWordsArray;
}

//Optimisation
// function orderLettersByRareness(grid) {
//   const orderedLetters = [];
//   const mergedGridArray = grid.flat().map((letter) => letter.toUpperCase());
//   for (const letter of rarenessArray) {
//     if (mergedGridArray.includes(letter)) {
//       orderedLetters.push(letter);
//     }
//   }
//   return orderedLetters;
// }

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
  let shortestSolution = { length: 10 };
  return validWordsArray
    .map((word) => {
      const solutionArray = [word];

      return findSolutions(
        validWordsArray,
        solutionArray,
        noOfWords,
        grid,
        shortestSolution
      );
    })
    .flat();
}

function findSolutions(
  validWordsArray,
  solutionArray,
  noOfWords,
  grid,
  shortestSolution
) {
  if (solutionContainsAllLetters(grid, solutionArray)) {
    shortestSolution.length = solutionArray.length;
    return [solutionArray];
  }
  if (noOfWords === 0 || solutionArray.length >= shortestSolution.length) {
    return [];
  }

  const nextLetter = solutionArray[solutionArray.length - 1].slice(-1);

  const possibleNextWords = validWordsArray.filter((word) => {
    return word.startsWith(nextLetter) && !solutionArray.includes(word);
  });

  const possibleNextSolutions = possibleNextWords.map((word) => {
    return [...solutionArray, word];
  });

  return possibleNextSolutions
    .map((solution) => {
      return findSolutions(
        validWordsArray,
        solution,
        noOfWords - 1,
        grid,
        shortestSolution
      );
    })
    .flat();
}

function solutionContainsAllLetters(grid, solutionsArray) {
  const mergedGridArray = grid.flat().map((letter) => letter.toUpperCase());
  const mergedSolutionArray = solutionsArray.flat().join("");
  return mergedGridArray.every((letter) =>
    mergedSolutionArray.includes(letter)
  );
}

function solutionOfNoOfWords(solutionsArray, noOfWords) {
  return solutionsArray.filter(
    (solution) => solution.length === Number(noOfWords)
  );
}

const gridInputs = document.querySelectorAll(".gridInput");
const gridSubmitButton = document.querySelector("#gridSubmitButton");

const inputValues = new Array(gridInputs.length).fill("");

function updateInputValues(event, index) {
  const inputValue = event.target.value.toUpperCase();
  inputValues[index] = inputValue;
  event.target.value = inputValue;
}

function validateGridInput(event, index) {
  const inputKey = event.which || event.key;

  const inputChar = String.fromCharCode(inputKey).toUpperCase();
  let usedCharacters = inputValues.join("").toUpperCase().split("");
  const isAlphabetic = /^[a-zA-Z]+$/.test(inputChar);

  if (
    isAlphabetic &&
    event.target.value.length < 3 &&
    !usedCharacters.includes(inputChar)
  ) {
    const inputValue = event.target.value + inputChar;
    event.target.value = inputValue;
    updateInputValues(event, index);
  }
  event.preventDefault();
}
let solutionDrawn = false;

function handleGridSubmit(event) {
  const grid = [];
  const maxInputLength = 3;
  const inputElementsArray = Array.from(
    document.querySelectorAll(".gridInput")
  );
  const gridOutputElements = document.querySelectorAll(".output");

  const noOfWords = document.querySelector(
    'input[name="noOfWords"]:checked'
  ).value;

  if (hasInvalidInputLength(inputElementsArray, maxInputLength)) {
    clearInvalidInputs(inputElementsArray, gridOutputElements, maxInputLength);
  } else {
    if (solutionDrawn) {
      return;
    }
    createGrid(inputElementsArray, grid);
    const lettersArray = drawText(grid, charCoordinates, circleCoordinates);

    const possibleWordsArray = generatePossibleWords(grid);

    const validWordsArray = addValidWords(possibleWordsArray, grid);

    const orderedValidWordsArray =
      orderWordsByUniqueCharacters(validWordsArray);

    const solutionsArray = generateSolutions(
      orderedValidWordsArray,
      noOfWords,
      grid
    );
    if (solutionsArray.length === 0) {
      alert("No solutions found at that word length. Please try again.");
      location.reload();
      return;
    } else {
      const correctLengthSolutions = solutionOfNoOfWords(
        solutionsArray,
        noOfWords
      );
      if (correctLengthSolutions.length === 0) {
        alert("No solutions found");
        location.reload();
        return;
      }
      const solution = correctLengthSolutions[0].join(" ");

      if (!solutionDrawn) {
        drawSolution(solution, lettersArray);
        solutionDrawn = true;
      }
    }
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
      ctx.lineWidth = 2;

      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(coordinates.x, coordinates.y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  }
}

function createSquare(ctx) {
  ctx.lineWidth = 5;
  ctx.strokeRect(80, 80, 240, 240);
}

function createBox(circleCoordinates) {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#042A2B";
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

function drawText(grid, charCoordinates, circleCoordinates) {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const lettersArray = [];
    ctx.font = "40px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#042A2B";
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

    return lettersArray;
  }
}

function reDraw(ctx, linePaths) {
  ctx.strokeStyle = "#042A2B";
  ctx.lineWidth = 5;
  ctx.clearRect(80, 80, 240, 240);
  createBox(circleCoordinates);

  for (const linePath of linePaths) {
    ctx.strokeStyle = "#CF5C36";
    ctx.lineWidth = 3;
    ctx.setLineDash([7, 5]);
    drawDashLine(ctx, linePath[0], linePath[1]);
  }
}

function drawDashLine(ctx, coordinates1, coordinates2) {
  ctx.beginPath();
  ctx.moveTo(coordinates1.x, coordinates1.y);
  ctx.lineTo(coordinates2.x, coordinates2.y);
  ctx.stroke();
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

function calculateMagnitude(coordinates1, coordinates2) {
  const magnitude = Math.sqrt(
    (coordinates2.circleCoordinates.x - coordinates1.circleCoordinates.x) ** 2 +
      (coordinates2.circleCoordinates.y - coordinates1.circleCoordinates.y) ** 2
  );
  return magnitude;
}

function calculateDirectionVector(coordinates1, coordinates2) {
  const directionVector = {
    x: coordinates2.circleCoordinates.x - coordinates1.circleCoordinates.x,
    y: coordinates2.circleCoordinates.y - coordinates1.circleCoordinates.y,
  };
  return directionVector;
}

function calculatePointOnLine(magnitude, directionVector, x1, y1, t) {
  const u = {
    x: directionVector.x / magnitude,
    y: directionVector.y / magnitude,
  };

  const point = {
    x: x1 + t * u.x,
    y: y1 + t * u.y,
  };
  return point;
}

function calculateAllPoints(coordinates1, coordinates2) {
  //SEGMENT LENGTH IS TO BE PASSED AS PARAMETER AND BASED ON THE SIZE OF THE CANVAS
  const segmentLength = 5;
  const magnitude = calculateMagnitude(coordinates1, coordinates2);
  const maxSegments = Math.floor(magnitude / segmentLength);
  const directionVector = calculateDirectionVector(coordinates1, coordinates2);
  const allPoints = [];
  for (let i = 0; i < maxSegments; i++) {
    const point = calculatePointOnLine(
      magnitude,
      directionVector,
      coordinates1.circleCoordinates.x,
      coordinates1.circleCoordinates.y,
      i * segmentLength
    );
    allPoints.push(point);
  }
  return allPoints;
}

async function drawSolution(solution, lettersInfoArray) {
  const finalSolutionOutput = document.querySelector("#finalSolution");
  const solutionContainer = document.querySelector(".solution-container");
  const solutionArray = solution.split(" ");
  const canvas = document.getElementById("canvas");

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const dashedLinePaths = [];
    for (const word of solutionArray) {
      await drawWord(ctx, lettersInfoArray, word, dashedLinePaths);
      for (let i = 0; i < word.length; i++) {
        solutionContainer.appendChild(createTextNode(word[i], i));
      }
      solutionContainer.appendChild(createTextNode("  ", word.length));
    }
  }
}

function createTextNode(letter, i) {
  const newSpan = document.createElement("span");
  const text = document.createTextNode(letter);
  newSpan.setAttribute("class", "solution-letter");
  newSpan.setAttribute("style", `--i:${i}`);
  newSpan.appendChild(text);
  return newSpan;
}

async function drawWord(ctx, lettersInfoArray, word, dashedLinePaths) {
  const reDrawLinePaths = dashedLinePaths;
  for (let i = 0; i < word.length - 1; i++) {
    const currentLetter = lettersInfoArray.find(
      (letterObject) => letterObject.letter === word[i]
    );

    drawLetter(ctx, currentLetter, "#bd5532");

    const nextLetter = lettersInfoArray.find(
      (letterObject) => letterObject.letter === word[i + 1]
    );
    ctx.setLineDash([]);
    ctx.lineWidth = 5;
    await drawLine(ctx, currentLetter, nextLetter);

    drawLetter(ctx, currentLetter, "#042A2B");
    dashedLinePaths.push([
      currentLetter.circleCoordinates,
      nextLetter.circleCoordinates,
    ]);
  }
  reDraw(ctx, reDrawLinePaths);
}

async function drawLine(ctx, coordinates1, coordinates2) {
  ctx.setLineDash([]);
  ctx.strokeStyle = "#042A2B";
  ctx.beginPath();
  const linePoints = calculateAllPoints(coordinates1, coordinates2);
  ctx.moveTo(linePoints[0].x, linePoints[0].y);
  let i = 0;
  await animateLine(ctx, coordinates1, linePoints, i);
}

function drawHead(ctx, x, y, colour) {
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, Math.PI * 2);
  ctx.fillStyle = colour;
  ctx.fill();
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
      if (i < linePoints.length - 1) {
        drawHead(ctx, linePoints[i].x, linePoints[i].y, "white");
      } else {
        drawHead(ctx, linePoints[i - 1].x, linePoints[i - 1].y, "#042A2B");
      }
      i++;
      requestAnimationFrame(() =>
        animateLine(ctx, coordinates1, linePoints, i).then(resolve)
      );
    } else {
      resolve();
    }
  });
}

window.addEventListener("load", createBox(circleCoordinates));

gridInputs.forEach((inputElement, index) => {
  inputElement.addEventListener("input", (event) => {
    updateInputValues(event, index);
  });
  inputElement.addEventListener("keypress", (event) => {
    validateGridInput(event, index);
  });
});

document.body.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    gridSubmitButton.click();
  }
});

gridSubmitButton.addEventListener("click", (event) => {
  if (solutionDrawn) {
    location.reload();
  } else {
    handleGridSubmit(event);
    gridSubmitButton.textContent = "Clear";
  }
});

export default {
  canAddLetter,
  dictionaryWordContainsValidLetters,
  generatePossibleWords,
  addValidWords,
  canAddWord,
  solutionContainsAllLetters,
  orderWordsByUniqueCharacters,
  findSolutions,
  generateSolutions,
};
