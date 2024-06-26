import app from "./app";

//Check whether letter can be added to word

describe("When given a word", () => {
  it("should allow you to add any letter from a different subarray", () => {
    let grid = [
      ["L", "R", "K"],
      ["A", "T", "H"],
      ["Z", "E", "D"],
      ["I", "O", "C"],
    ];

    const word = "RA";
    const letter = "D";
    const result = app.canAddLetter(grid, word, letter);
    expect(result).toBe(true);
  });
});

describe("When given a word", () => {
  it("should prevent the adding of any letter from the same subarray", () => {
    let grid = [
      ["L", "R", "K"],
      ["A", "T", "H"],
      ["Z", "E", "D"],
      ["I", "O", "C"],
    ];

    const word = "RA";
    const letter = "T";
    const result = app.canAddLetter(grid, word, letter);
    expect(result).toBe(false);
  });
});

describe("When word variable is empty", () => {
  it("should allow you to add the first letter to empty word", () => {
    const grid = [
      ["L", "R", "K"],
      ["A", "T", "H"],
      ["Z", "E", "D"],
      ["I", "O", "C"],
    ];
    const word = "";
    const letter = "R";
    const result = app.canAddLetter(grid, word, letter);
    expect(result).toBe(true);
  });
});

describe("When given a word ", () => {
  it("should not allow you to add the same letter as the last letter of word", () => {
    const grid = [
      ["L", "R", "K"],
      ["A", "T", "H"],
      ["Z", "E", "D"],
      ["I", "O", "C"],
    ];
    const word = "LO";
    const letter = "O";
    const result = app.canAddLetter(grid, word, letter);
    expect(result).toBe(false);
  });
});

//Add letter to word

describe("When given a word", () => {
  it("should add letter to word", () => {
    const grid = [
      ["L", "R", "K"],
      ["A", "T", "H"],
      ["Z", "E", "D"],
      ["I", "O", "C"],
    ];

    const word = "RA";
    const letter = "D";
    const result = app.addLetter(grid, word, letter);
    expect(result).toBe("RAD");
  });
});

describe("When given a word", () => {
  it("should not add letter to word if letter cannot be added", () => {
    const grid = [
      ["L", "R", "K"],
      ["A", "T", "H"],
      ["Z", "E", "D"],
      ["I", "O", "C"],
    ];

    const word = "RA";
    const letter = "T";
    const result = app.addLetter(grid, word, letter);
    expect(result).toBe("RA");
  });
});

describe("When given a word", () => {
  it("should add letter to empty word", () => {
    const grid = [
      ["L", "R", "K"],
      ["A", "T", "H"],
      ["Z", "E", "D"],
      ["I", "O", "C"],
    ];

    const word = "";
    const letter = "I";
    const result = app.addLetter(grid, word, letter);
    expect(result).toBe("I");
  });
});

describe("When given a word", () => {
  it("should not add letter to word if letter is the same as last letter of word", () => {
    const grid = [
      ["L", "R", "K"],
      ["A", "T", "H"],
      ["Z", "E", "D"],
      ["I", "O", "C"],
    ];

    const word = "LO";
    const letter = "O";
    const result = app.addLetter(grid, word, letter);
    expect(result).toBe("LO");
  });
});

//Check whether word is in dictionary

describe("When given a final word", () => {
  it("should return true if word is in dictionary", () => {
    const word = "RAD";
    const result = app.isWord(word);
    expect(result).toBe(true);
  });
});

describe("When given a final word", () => {
  it("should return true if word is in dictionary regardless of CASE SENSITIVITY", () => {
    const word = "LEAD";
    const result = app.isWord(word);
    expect(result).toBe(true);
  });
});

describe("When given a final word", () => {
  it("should return true if word in dictionary is a combination of uppercase and lowercase letters", () => {
    const word = "RaD";
    const result = app.isWord(word);
    expect(result).toBe(true);
  });
});

describe("When given a final word", () => {
  it("should return false if word is not in dictionary", () => {
    const word = "RAZ";
    const result = app.isWord(word);
    expect(result).toBe(false);
  });
});

//add word to list of words

describe("When given a word to submit", () => {
  it("should add word to list of words", () => {
    const wordList = [];
    const word = "RAD";
    const result = app.addWord(word, wordList);
    expect(result[0]).toEqual(["RAD"]);
  });
});

//
describe("When given a word to submit", () => {
  it("should add word to list of words ELEMENT ALREADY IN wordList", () => {
    const wordList = ["TAR"];
    const word = "RAD";
    const result = app.addWord(word, wordList);
    expect(result[0]).toEqual(["TAR", "RAD"]);
  });
});

describe("When given a word to submit", () => {
  it("should not add word to list of words if word is not in dictionary", () => {
    const wordList = [];
    const word = "RAZ";
    const result = app.addWord(word, wordList);
    expect(result).toEqual([]);
  });
});

describe("When given a word to submit", () => {
  it("should not add word to list of words if word is not in dictionary wordList already has element in", () => {
    const wordList = ["TAR"];
    const word = "RAZ";
    const result = app.addWord(word, wordList);
    expect(result).toEqual(["TAR"]);
  });
});

describe("When given a word to submit", () => {
  it("should add word to list of words and take the last letter of the word and assign it to the letter variable", () => {
    const wordList = [];
    const word = "RAD";
    const result = app.addWord(word, wordList);
    expect(result[1]).toEqual("D");
  });
});

//Possible Word Generation

// describe('When given a grid',()=>{
//   it('should search the dictionary for words containing that letter',()=>{
//     const grid =[
//       ["C"],
//         ]
//     const result = app.generatePossibleWords(grid);
//     expect(result).toEqual(["cherry"])
//   })
// })

// describe('When given a grid',()=>{
//   it('should search the dictionary for words containing those letters and add to a possible word list - ONE ROW, 3 ELEMENTS',()=>{
//     const grid =[
//       ["C","T","R"],
//         ]
//     const result = app.generatePossibleWords(grid);
//     expect(result).toEqual(["cherry","date","rad"])
//   })
// })

// describe('When given a grid',()=>{
//   it('should search the dictionary for words and return empty array if no words are found',()=>{
//     const grid =[
//       ["Z","F"],
//         ]
//     const result = app.generatePossibleWords(grid);
//     expect(result).toEqual([])
//   })
// })

// describe('When given a grid',()=>{
//   it('should search the dictionary for words containing those letters and add to a possible word list - TWO ROWS, 3 ELEMENTS',()=>{
//     const grid =[
//       ["C","T","R"],
//       ["A","D","E"],
//         ]
//     const result = app.generatePossibleWords(grid);
//     expect(result).toEqual(["apple","banana","cherry","date","rad","lead"])
//   })
// })

// describe('When given a grid',()=>{
//   it('should search the dictionary for words only containing the letters in the grid',()=>{
//     const grid =[
//       ["C", "R"],
//       ["A","T"]
//     ]

//     const result = app.generatePossibleWords(grid);
//     expect(result).toEqual(["cat"])
//   })
// })

// Comment out above

describe("When given a word to compare with grid", () => {
  it("should check to see all letters in the word are contained in the grid", () => {
    const grid = [
      ["C", "R"],
      ["A", "T"],
    ];
    const word = "cat";
    const result = app.dictionaryWordContainsValidLetters(grid, word);
    expect(result).toBe(true);
  });
});

describe("When given a word to compare with grid", () => {
  it("should check to see all letters in the word are contained in the grid. NO LETTERS IN GRID", () => {
    const grid = [
      ["C", "R"],
      ["A", "T"],
    ];
    const word = "YES";
    const result = app.dictionaryWordContainsValidLetters(grid, word);
    expect(result).toBe(false);
  });
});

describe("When given a word to compare with grid", () => {
  it("should check to see all letters in the word are contained in the grid. ONE LETTER MISSING", () => {
    const grid = [
      ["C", "R"],
      ["A", "T"],
    ];
    const word = "RATE";
    const result = app.dictionaryWordContainsValidLetters(grid, word);
    expect(result).toBe(false);
  });
});

describe("When given a word to compare with grid", () => {
  it("should check to see if all letters in the word are contained in the grid - REMOVE CASE SENSITIVITY", () => {
    const grid = [
      ["C", "R"],
      ["A", "T"],
    ];
    const word = "cat";
    const result = app.dictionaryWordContainsValidLetters(grid, word);
    expect(result).toBe(true);
  });
});

describe("When given a grid", () => {
  it("should return a list of words from the dictionary that contain the letters in the grid", () => {
    const grid = [
      ["C", "R"],
      ["A", "T"],
    ];
    const result = app.generatePossibleWords(grid);
    expect(result).toEqual(["cat", "rat", "tar"]);
  });
});

describe("When given a grid", () => {
  it("should return a console.log message if there are no words in the dictionary that contain the letters in the grid", () => {
    const grid = [
      ["Z", "F"],
      ["A", "T"],
    ];
    const result = app.generatePossibleWords(grid);
    expect(result).toEqual(console.log("No words found"));
  });
});

describe("When given a grid", () => {
  it("should return a list of words from the dictionary that contain the letters in the grid - 4 ROWS", () => {
    const grid = [
      ["C", "R"],
      ["A", "T"],
      ["E", "D"],
      ["Y", "I"],
    ];
    const result = app.generatePossibleWords(grid);
    expect(result).toEqual([
      "card",
      "cat",
      "date",
      "rad",
      "raid",
      "rat",
      "rate",
      "tar",
      "tide",
      "yard",
    ]);
  });
});

describe("When given a grid", () => {
  it("should return a list of words from the dictionary that contain the letters in the grid -FULL GRID", () => {
    const grid = [
      ["C", "R", "K"],
      ["A", "T", "H"],
      ["E", "D", "U"],
      ["Y", "I", "N"],
    ];
    const result = app.generatePossibleWords(grid);
    expect(result).toEqual([
      "card",
      "cat",
      "cherry",
      "crank",
      "date",
      "hinder",
      "rad",
      "raid",
      "rat",
      "rate",
      "tar",
      "tide",
      "under",
      "yard",
    ]);
  });
});

describe("When given a word from possibleWordsArray", () => {
  it("should only add words if canAddWord is true", () => {
    const grid = [
      ["C", "R", "K"],
      ["A", "T", "H"],
      ["E", "D", "U"],
      ["Y", "I", "N"],
    ];
    const lowercaseGrid = grid.map((row) =>
      row.map((char) => char.toLowerCase())
    );
    const possibleWordsArray = [
      "card",
      "cat",
      "cherry",
      "crank",
      "date",
      "hinder",
      "rad",
      "raid",
      "rat",
      "rate",
      "tar",
      "tide",
      "under",
      "yard",
    ];
    result = app.addValidWords(possibleWordsArray, lowercaseGrid);
    expect(result).toEqual(["card", "rad", "raid", "yard"]);
  });
});

describe("When given a list of valid words", () => {
  it("should create a list of words with each word starting with the last letter of the previous word", () => {
    const grid = [["C", "R", "K"], ["A"], ["E", "D"], ["Y", "I", "N"]];
    const solutionArray = ["card"];
    const validWordsArray = [
      "card",
      "rainy",
      "darker",
      "yard",
      "bean",
      "cheese",
    ];
    const result = app.findSolutions(validWordsArray, solutionArray, 5, grid);
    expect(result).toEqual([["card", "darker", "rainy"]]);
    console.log(result);
  });
});

describe("When given a list of valid words", () => {
  it("should create a list of words with each word starting with the last letter of the previous word", () => {
    const grid = [["C", "R", "K"], ["A"], ["E", "D"], ["Y", "I", "N"]];
    const solutionArray = ["card"];
    const validWordsArray = [
      "card",
      "rainy",
      "darker",
      "yard",
      "bean",
      "cheese",
    ];
    const result = app.generateSolutions(
      validWordsArray,
      solutionArray,
      5,
      grid
    );
    expect(result).toEqual(["card", "darker", "rainy"]);
  });
});

describe("When given a list of valid words", () => {
  it("should create a list of words with each word starting with the last letter of the previous word", () => {
    const grid = [
      ["C", "R", "K", "L"],
      ["A", "E", "D"],
      ["Y", "I", "N"],
    ];
    const solutionArray = ["card"];
    const validWordsArray = [
      "card",
      "rainy",
      "darker",
      "yard",
      "bean",
      "cheese",
    ];
    const result = app.generateSolutions(
      validWordsArray,
      solutionArray,
      5,
      grid
    );
    expect(result).toEqual([]);
  });
});

describe("When given a list of valid words", () => {
  it("should create a list of words valid solutions", () => {
    const grid = [
      ["S", "M", "R"],
      ["K", "U", "A"],
      ["I", "O", "D"],
      ["G", "B", "J"],
    ];
    // const solutionArray =["adjuror"]
    const validWordsArray = [
      "adjuror",
      "skimboard",
      "ragas",
      "rigs",
      "rigorous",
      "rugs",
      "ajaur",
    ];
    const noOfWords = 5;
    const result = app.generateSolutions(validWordsArray, noOfWords, grid);
    expect(result).toEqual([
      ["adjuror", "ragas", "skimboard"],
      ["adjuror", "rigs", "skimboard"],
      ["adjuror", "rigorous", "skimboard"],
      ["adjuror", "rugs", "skimboard"],
      ["ajaur", "ragas", "skimboard"],
      ["ajaur", "rigs", "skimboard"],
      ["ajaur", "rigorous", "skimboard"],
      ["ajaur", "rugs", "skimboard"],
    ]);
  });
});

describe("When given a list of valid words", () => {
  it("should return an empty array if no solutions are found", () => {
    const grid = [
      ["C", "R", "K", "L"],
      ["A", "E", "D"],
      ["Y", "I", "N"],
    ];
    const validWordsArray = ["card", "brain", "tarker", "yard"];
    const result = app.generateSolutions(validWordsArray, grid);
    expect(result).toEqual([]);
  });
});



describe("When given a word ", () => {
  it("should check whether the letters in the word are valid", () => {
    const grid = [
      ["C", "R", "K"],
      ["A", "T", "H"],
      ["E", "D", "U"],
      ["Y", "I", "N"],
    ];
    const word = "CARD";
    const result = app.canAddWord(grid, word);
    expect(result).toEqual(true);
  });
});

describe("When given a word ", () => {
  it("should check whether the letters in the word are valid", () => {
    const grid = [
      ["C", "R", "K"],
      ["A", "T", "H"],
      ["E", "D", "U"],
      ["Y", "I", "N"],
    ];
    const word = "CAT";
    const result = app.canAddWord(grid, word);
    expect(result).toBe(false);
  });
});

describe("When passed a grid", () => {
  it("should order the letters in the grid based on rareness", () => {
    const grid = [
      ["Q", "R", "K"],
      ["A", "T", "H"],
    ];
    const result = app.orderLettersByRareness(grid);
    expect(result).toEqual(["q", "k", "h", "t", "r", "a"]);
  });
});

describe("Given a solution and a grid", () => {
  it("should check if the solution contains all the letters of the grid", () => {
    const grid = [
      ["C", "R", "K"],
      ["A", "T", "H"],
      ["E", "D", "U"],
      ["Y", "I", "N"],
    ];
    
    const solution = [
      "c",
      "r",
      "k",
      "a",
      "t",
      "h",
      "e",
      "d",
      "u",
      "y",
      "i",
      "n",
    ];
    const result = app.solutionContainsAllLetters(grid, solution);
    expect(result).toBe(true);
  });
});

describe("Given a solution and a grid", () => {
  it("should check if the solution contains all the letters of the grid TWO WORDS", () => {
    const grid = [
      ["C", "R", "K"],
      ["A", "T", "H"],
      ["E", "D", "U"],
      ["Y", "I", "N"],
    ];
    // const lowercaseGrid = grid.map(row => row.map(char => char.toLowerCase()));
    const solution = ["caey", "rtdi", "khun"];
    const result = app.solutionContainsAllLetters(grid, solution);
    expect(result).toBe(true);
  });
});

describe("Given a valid words array", () => {
  it.only("should order the words by the number of unique characters", () => {
    const validWordsArray = ["at", "breaks", "car", "yellow", "bean", "cheese"];
    const result = app.orderWordsByUniqueCharacters(validWordsArray);
    expect(result).toEqual(["breaks", "yellow", "bean", "cheese", "car", "at"]);
  });
});
