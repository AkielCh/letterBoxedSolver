

const dictionary = require("./dictionary");


function canAddLetter(grid, word, letter) {
 const lastLetterOfWord = word.slice(-1);
 const letterToAdd = letter;
 let lastLetterSubArray;
 let letterToAddSubArray;

 //find subarray that contains last letter of word
 for (const subArray of grid){
  if (subArray.includes(lastLetterOfWord)){
    lastLetterSubArray=subArray;
    break;
  }
 }
 //find subarray that contains letter to add
 for (const subArray of grid){
  if (subArray.includes(letterToAdd)){
    letterToAddSubArray =subArray;
    break;
  }
 }
//if last letter subarray is not the same as letter to add subarray or word is empty, return true
 if (lastLetterSubArray !==letterToAddSubArray || word === ""){
  return true;
 } 
 else{
  return false;
 }
}

function addLetter(grid, word, letter) {
  if (canAddLetter(grid, word, letter)) {
    return word + letter;
  } else {
    return word;
  }}

 function isWord(word){
  if (dictionary.has(word.toLowerCase())){
    return true;
  }
  else{
    return false;
  }
 }



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

//  function generatePossibleWords(grid) {
//   const possibleWords = [];
 
//   function wordSearch(row,col,wordSoFar){
//     possibleWords.push(wordSoFar);
//   }

 
//   for (let row = 0; row < grid.length; row++) {
//     for (let col = 0; col < grid[row].length; col++) {
//       wordSearch(row, col, grid[row][col]);
//     }
//   }

//   return possibleWords;
// }

// function generatePossibleWords(grid) {
//   const possibleWords = [];

//   // Function to explore adjacent positions
//   function wordSearch(row, col, wordSoFar) {
//     if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
//       const letter = grid[row][col];
//       possibleWords.push(wordSoFar + letter);

//       // Explore adjacent positions (up, down, left, right)
//       const directions = [
//         { dx: -1, dy: 0 }, // Left
//         { dx: 1, dy: 0 },  // Right
//         { dx: 0, dy: -1 }, // Up
//         { dx: 0, dy: 1 },  // Down
//       ];

//       for (const direction of directions) {
//         const newRow = row + direction.dy;
//         const newCol = col + direction.dx;
//         wordSearch(newRow, newCol, wordSoFar + letter);
//       }
//     }
//   }

//   for (let row = 0; row < grid.length; row++) {
//     for (let col = 0; col < grid[row].length; col++) {
//       wordSearch(row, col, grid[row][col]);
//     }
//   }

//   return possibleWords;
// }






//   // Function to explore adjacent positions and build words
//   function wordSearch(row, col, wordSoFar) {
//     // Check if the current word is a valid word
//     if (isWord(wordSoFar)) {
//       possibleWords.push(wordSoFar);
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
//   if (possibleWords.length === 0) {
//     return [];
//   }

//   return possibleWords;
// }

  module.exports = {canAddLetter, addLetter, isWord, addWord, generatePossibleWords };
  