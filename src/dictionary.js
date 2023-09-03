//Use set to prevent duplicate words
//set methods add, has, delete,size

const dictionary = new Set([
    'apple',
    'banana',
    'cherry',
    'date',
    'RAD',
    'lead'
   
  ].map(dictionaryWord => dictionaryWord.toLowerCase()));

  module.exports = dictionary;