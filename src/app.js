// import dictionary from "./dictionary";
const dictionary = new Set([
  'apple',
  'banana',
  'cherry',
  'date',
  'RAD'
  // Add more valid words here
]);


function canAddLetter(grid, word, letter) {
 const lastLetterOfWord = word.slice(-1);
 const letterToAdd = letter;
 let lastLetterSubArray;
 let letterToAddSubArray;

 for (const subArray of grid){
  if (subArray.includes(lastLetterOfWord)){
    lastLetterSubArray=subArray;
    break;
  }
 }
 for (const subArray of grid){
  if (subArray.includes(letterToAdd)){
    letterToAddSubArray =subArray;
    break;
  }
 }

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

  describe('When given a final word',()=>{
    it('should return true if word is in dictionary',()=>{
      const word ="RAD";
      const result = app.isWord(word);
      expect(result).toBe(true)
    })
  })



  
  module.exports = {canAddLetter, addLetter };
  