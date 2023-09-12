//Use set to prevent duplicate words
//set methods add, has, delete,size

const dictionary = new Set([
    'apple',
    'banana',
    'by',
    'Ying',
    'cherry',
    'cat',
    'date',
    'RAD',
    'rat',
    'tar',
    'lead',
    'L',
   

   
  ].map(dictionaryWord => dictionaryWord.toLowerCase()));

  module.exports = dictionary;