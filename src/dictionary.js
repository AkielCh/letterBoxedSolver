//Use set to prevent duplicate words
//set methods add, has, delete,size

const dictionary = new Set([
    'apple',
    'banana',
    'by',
    'cherry',
    'cat',
    'date',
    'lead',
    'L',
    'RAD',
    'raid',
    'rat',
    'rate',
    'tar',
    'tide',
    'yard',
    'Ying',
   

   
  ].map(dictionaryWord => dictionaryWord.toLowerCase()));

  module.exports = dictionary;