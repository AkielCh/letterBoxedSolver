

const dictionary = require("./dictionary");
const rarenessArray = require("./rarenessArray");


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
  const lastLetterSubArray = grid.find(subArray => subArray.includes(lastLetterOfWord));
  const letterToAddSubArray = grid.find(subArray => subArray.includes(letter));

  // If either subarray is not found or they are not the same, return true.
  return !lastLetterSubArray || !letterToAddSubArray || lastLetterSubArray !== letterToAddSubArray;
}

function canAddWord(grid, word) {
for (let i = 0; i < word.length ; i++) {
  const letter = word[i];
  const nextLetter = word[i + 1];
  const currentLetterSubArray = grid.find(subArray => subArray.includes(letter));
  const nextLetterSubArray = grid.find(subArray => subArray.includes(nextLetter));
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
  }}


  //For letterBoxed Game
 function isWord(word){
  if (dictionary.has(word.toLowerCase())){
    return true;
  }
  else{
    return false;
  }
 }


//For letterBoxed Game
 function addWord (word, wordList){
  if (isWord(word)){
    wordList.push(word);
    const lastLetter = word.slice(-1);
    return [wordList, lastLetter];
  }
  else{
    return wordList;
  }
 }


//second loop attempt
function dictionaryWordContainsValidLetters(grid,word){
  const mergedGridArray = grid.flat().map(letter => letter.toLowerCase());

 return word.split("").every(letter => mergedGridArray.includes(letter))
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
    if (dictionaryWordContainsValidLetters(grid,word)){
      possibleWordsArray.push(word);
    }
  }
  return possibleWordsArray.length > 0 ? possibleWordsArray : console.log("No words found");
}

//Optimisation
function orderLettersByRareness(grid){
  const orderedLetters = [];
  const mergedGridArray = grid.flat().map(letter => letter.toLowerCase());
  for (const letter of rarenessArray){
    if (mergedGridArray.includes(letter)){
      orderedLetters.push(letter);
    }
  }
  return orderedLetters;
}

function addValidWords(possibleWordsArray, grid) {
  const validWordsArray = [];
  possibleWordsArray.forEach(word => {
    if (canAddWord(grid, word)) {
      validWordsArray.push(word);
    }
  });

  return validWordsArray;
}

// 1st try

function generateSolutions(validWordsArray, grid){
  const solutionsArray = [];
  solutionsArray.push(validWordsArray[0]);
  // let lastLetter = validWordsArray[0].slice(-1);

  function findNextWord(lastLetter,n){

    for (let i = n; i < validWordsArray.length; i++){
      let word = validWordsArray[i];
      if (word[0] === lastLetter && !solutionsArray.includes(word)) {
        solutionsArray.push(word);
        console.log(solutionsArray);
        lastLetter = word.slice(-1);
        if (!solutionContainsAllLetters(grid, solutionsArray) && solutionsArray.length < 4) { 
          findNextWord(lastLetter);
        }
        else{
          break;
        }
      }
    }
    return lastLetter;
  }
 findNextWord(lastLetter,n );
  
  return solutionsArray;
}


//2nd try
// function generateSolutions(validWordsArray, grid){
//   const solutionsArray = [];
//   solutionsArray.push(validWordsArray[0]);
//   // let lastLetter = validWordsArray[0].slice(-1);
  

//   function findNextWord(lastLetter,n){
//       let i = n;
//       while (solutionsArray.length < 4 && !solutionContainsAllLetters(grid, solutionsArray)){
//         const word = validWordsArray[i];
//         if (word[0] === lastLetter && !solutionsArray.includes(word)) {
//           solutionsArray.push(word);
//           console.log(solutionsArray);
//           lastLetter = word.slice(-1);
//       }
//       i++;
//     }
//     return [solutionsArray,n] ;
//   }


//  findNextWord(firstWord.slice(-1),0);
  
//   return solutionContainsAllLetters(grid, solutionsArray)?solutionsArray:findNextWord(firstWord.slice(-1),n + 1)
// }

// 3rd try
// function generateSolutions(validWordsArray, grid){

function solutionContainsAllLetters(grid, solutionsArray) {
  const mergedGridArray =grid.flat().map(letter => letter.toLowerCase());
  const mergedSolutionArray =solutionsArray.flat().join("")
 return mergedGridArray.every(letter => mergedSolutionArray.includes(letter));
}




// CHATGPT help

function generateSolutions(validWordsArray, grid) {
  let solutionsArray = [];
  solutionsArray.push(validWordsArray[0]);
  let lastLetter = validWordsArray[0].slice(-1);

  function findNextWord(lastLetter, n) {
    const startingIndex = n === undefined ? 0 : n;
    const validWords = [];

    for (let i = startingIndex; i < validWordsArray.length; i++) {
      const word = validWordsArray[i];

      if (!solutionsArray.includes(word) && word[0] === lastLetter) {
        validWords.push(word);
      }
    }

    return validWords;
  }

  // Initialize the solutions array with the first word.

  while (solutionsArray.length < 4) {
    const nextWords = findNextWord(lastLetter);

    if (nextWords.length === 0) {
      // If no more words can be added, reset and try with the next starting word.
      lastLetter = "";
      const nextStartingIndex = validWordsArray.findIndex(word => word[0] === solutionsArray[0].slice(-1));
      if (nextStartingIndex === -1) {
        break; // No more starting words available.
      }
      solutionsArray.push(validWordsArray[nextStartingIndex]);
      lastLetter = solutionsArray[solutionsArray.length - 1].slice(-1);
    } else {
      // Add the valid words to the solution.
      solutionsArray = solutionsArray.concat(nextWords);
      lastLetter = solutionsArray[solutionsArray.length - 1].slice(-1);
    }
  }

  return solutionContainsAllLetters(grid, solutionsArray) && solutionsArray.length <= 5 ? solutionsArray : [];
}





//FOCUS ON RECURSIVE Solution finder

// You should have a canAddWord function to check if a word can be added to the grid.




//FIRST LOOP ATTEMPT  ----------------
// function validWord(word, grid){
//   for (let row = 0; row < grid.length; row++){
//     for (let col = 0; col < grid[row].length; col++){
//      if (!word.includes(grid[row][col].toLowerCase())) {
//       return false;
//   }
//   else{
//     return true;
// }
// }}}

//  function generatepossibleWordsArray(grid) {
//   const possibleWordsArray = new Set();

//   for (const word of dictionary) {
//     if (validWord(word, grid)){
//       possibleWordsArray.push(word);
//     }
// return Array.from(possibleWordsArray)
// }}

// ---------------------------------------------




//RECURSIVE ATTEMPT

//   // Function to explore adjacent positions and build words
//   function wordSearch(row, col, wordSoFar) {
//     // Check if the current word is a valid word
//     if (isWord(wordSoFar)) {
//       possibleWordsArray.push(wordSoFar);
//     }

//     // Explore adjacent positions (up, down, left, right)
//     const directions = [
//       { dx: 1, dy: 0 },  // Right
//       { dx: 0, dy: -1 }, // Up
//       { dx: -1, dy: 0 }, // Left
//       { dx: 0, dy: 1 },  // Down
//     ];

//     for (const direction of directions) {
//       const newRow = row + direction.dy;
//       const newCol = col + direction.dx;

//       // Check if the new position is within the grid bounds
//       if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
//         const letter = grid[newRow][newCol];

//         // Check if the letter can be added to the current word
//         if (canAddLetter(grid, wordSoFar, letter)) {
//           // Recursively explore the new position with the updated word
//           wordSearch(newRow, newCol, wordSoFar + letter);
//         }
//       }
//     }
//   }

//   // Iterate through each cell in the grid and start exploring words
//   for (let row = 0; row < grid.length; row++) {
//     for (let col = 0; col < grid[row].length; col++) {
//       wordSearch(row, col, grid[row][col]);
//     }
//   }

//   // Check if no words were found and return an empty array
//   if (possibleWordsArray.length === 0) {
//     return [];
//   }

//   return possibleWordsArray;
// }

  module.exports = {canAddLetter, addLetter, isWord, addWord,  dictionaryWordContainsValidLetters, generatePossibleWords , addValidWords, canAddWord, orderLettersByRareness,solutionContainsAllLetters, generateSolutions};
  