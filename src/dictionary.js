//Use set to prevent duplicate words
//set methods add, has, delete,size
const wordsListString = `
adjuror
skimboard
ragas
rigs
rigorous
rugs
ajaur
rugskimboard`;

const dictionary = new Set(
  wordsListString
    .split(/\s+/)
    .filter((word) => word.length > 1)
    .map((dictionaryWord) => dictionaryWord.toLowerCase())
);

export default dictionary;

// "apple",
// "banana",
// "by",
// "card",
// "cat",
// "cherry",
// "crank",
// "date",
// "hinder",
// "lead",
// "L",
// "RAD",
// "raid",
// "rat",
// "rate",
// "tar",
// "tide",
// "under",
// "yard",
// "Ying",

// "adjuror",
// "skimboard",
// "ragas",
// "rigs",
// "rigorous",
// "rugs",
// "ajaur",
// "rugskimboard",
