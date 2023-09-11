//Use set to prevent duplicate words
//set methods add, has, delete,size

const dictionary = new Set([
    'apple',
    'banana',
    'cherry',
    'date',
    'RAD',
    'lead',
    'L',
    'CAT', 'CATR', 'CAR', 'CA', 'CT', 'CTR', 'CR',

   
  ].map(dictionaryWord => dictionaryWord.toLowerCase()));

  module.exports = dictionary;