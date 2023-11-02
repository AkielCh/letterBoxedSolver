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
  console.log(nextLetter, possibleNextWords);
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

function updateGridOutput(event, index) {
  const inputValue = event.target.value;
  gridOutputElements[index].textContent = inputValue;
}

function validateGridInput(event, index) {
  const inputKey = event.which || event.keyCode;
  const inputChar = String.fromCharCode(inputKey);
  const isAlphabetic =
    (inputKey >= 65 && inputKey <= 90) || (inputKey >= 97 && inputKey <= 122);
  if (isAlphabetic) {
    const inputValue = event.target.value + inputChar;
    if (inputValue.length <= 3) {
      event.target.value = inputValue;
      gridOutputElements[index].textContent = inputValue;
    }
  }
  event.preventDefault();
}

gridInputs.forEach((inputElement, index) => {
  inputElement.addEventListener("input", (event) => {
    updateGridOutput(event, index);
  });
  inputElement.addEventListener("keypress", (event) => {
    validateGridInput(event, index);
  });
});

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
};
