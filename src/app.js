

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

function generatePossibleWords(grid){
    const possibleWords = [];
    for (const row of grid) {
      for (const letter of row) {
        possibleWords.push(letter);
      }
    }
    return possibleWords;
  }
  

  module.exports = {canAddLetter, addLetter, isWord, addWord, generatePossibleWords };
  