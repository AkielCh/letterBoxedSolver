//Use set to prevent duplicate words
//set methods add, has, delete,size

const dictionary = new Set([
    'apple',
    'banana',
    'by',
    'card',
    'cat',
    'cherry',
    'crank',
    'date',
    'hinder',
    'lead',
    'L',
    'RAD',
    'raid',
    'rat',
    'rate',
    'tar',
    'tide',
    'under',
    'yard',
    'Ying',
   

   
  ].map(dictionaryWord => dictionaryWord.toLowerCase()));

  module.exports = dictionary;