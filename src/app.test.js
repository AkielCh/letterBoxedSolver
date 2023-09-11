



const app = require('./app');


//Check whether letter can be added to word

describe('When given a word',()=>{
  it('should allow you to add any letter from a different subarray',()=>{
    let grid =[
      ["L","R","K"],
      ["A","T","H"],
      ["Z","E","D"],
      ["I","O","C"],
    ]

    const word ="RA";
    const letter = "D";
    const result = app.canAddLetter(grid,word,letter);
    expect(result).toBe(true)

  })
})


describe('When given a word',()=>{
  it('should prevent the adding of any letter from the same subarray',()=>{
    let grid =[
      ["L","R","K"],
      ["A","T","H"],
      ["Z","E","D"],
      ["I","O","C"],
    ]

    const word ="RA";
    const letter = "T";
    const result = app.canAddLetter(grid,word,letter);
    expect(result).toBe(false)

  })
})


describe('When word variable is empty',()=>{
  it('should allow you to add the first letter to empty word', () => {
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
})


describe('When given a word ',()=>{
  it('should not allow you to add the same letter as the last letter of word', () => {
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
})


//Add letter to word

describe('When given a word',()=>{
  it('should add letter to word',()=>{
    const grid =[
      ["L","R","K"],
      ["A","T","H"],
      ["Z","E","D"],
      ["I","O","C"],
    ]

    const word ="RA";
    const letter = "D";
    const result = app.addLetter(grid,word,letter);
    expect(result).toBe("RAD")
  })
})


describe('When given a word',()=>{
  it('should not add letter to word if letter cannot be added',()=>{
    const grid =[
      ["L","R","K"],
      ["A","T","H"],
      ["Z","E","D"],
      ["I","O","C"],
    ]

    const word ="RA";
    const letter = "T";
    const result = app.addLetter(grid,word,letter);
    expect(result).toBe("RA")
  })
})

describe('When given a word',()=>{
  it('should add letter to empty word',()=>{
    const grid =[
      ["L","R","K"],
      ["A","T","H"],
      ["Z","E","D"],
      ["I","O","C"],
    ]

    const word ="";
    const letter = "I";
    const result = app.addLetter(grid,word,letter);
    expect(result).toBe("I")
  })
})


describe('When given a word',()=>{
  it('should not add letter to word if letter is the same as last letter of word',()=>{
    const grid =[
      ["L","R","K"],
      ["A","T","H"],
      ["Z","E","D"],
      ["I","O","C"],
    ]

    const word ="LO";
    const letter = "O";
    const result = app.addLetter(grid,word,letter);
    expect(result).toBe("LO")
  })
})

//Check whether word is in dictionary

describe('When given a final word',()=>{
  it('should return true if word is in dictionary',()=>{
    const word ="RAD";
    const result = app.isWord(word);
    expect(result).toBe(true)
  })
})


describe('When given a final word',()=>{
  it('should return true if word is in dictionary regardless of CASE SENSITIVITY',()=>{
    const word ="LEAD";
    const result = app.isWord(word);
    expect(result).toBe(true)
  })
})

describe('When given a final word',()=>{
  it('should return true if word in dictionary is a combination of uppercase and lowercase letters',()=>{
    const word ="RaD";
    const result = app.isWord(word);
    expect(result).toBe(true)
  })
})

describe('When given a final word',()=>{
  it('should return false if word is not in dictionary',()=>{
    const word ="RAZ";
    const result = app.isWord(word);
    expect(result).toBe(false)
  })
})

//add word to list of words

describe('When given a word to submit',()=>{
  it('should add word to list of words',()=>{
    const wordList =[];
    const word ="RAD";
    const result = app.addWord(word,wordList);
    expect(result[0]).toEqual(["RAD"])
  })
})


//
describe('When given a word to submit',()=>{
  it('should add word to list of words ELEMENT ALREADY IN wordList',
  ()=>{
    const wordList =["TAR"];
    const word ="RAD";
    const result = app.addWord(word,wordList);
    expect(result[0]).toEqual(["TAR","RAD"])
  })
})

describe('When given a word to submit',()=>{
  it('should not add word to list of words if word is not in dictionary',()=>{
    const wordList =[];
    const word ="RAZ";
    const result = app.addWord(word,wordList);
    expect(result).toEqual([])
  })
})

describe('When given a word to submit',()=>{
  it('should not add word to list of words if word is not in dictionary wordList already has element in',()=>{
    const wordList =["TAR"];
    const word ="RAZ";
    const result = app.addWord(word,wordList);
    expect(result).toEqual(["TAR"])
  })
})

describe('When given a word to submit',()=>{
  it('should add word to list of words and take the last letter of the word and assign it to the letter variable',()=>{
    const wordList =[];
    const word ="RAD";
    const result = app.addWord(word,wordList);
    expect(result[1]).toEqual("D")
  })
})

//Possible Word Generation

describe('When given a grid',()=>{
  it('should search the dictionary for words containing that letter',()=>{
    const grid =[
      ["C"],
        ]
    const result = app.generatePossibleWords(grid);
    expect(result).toEqual(["C"])
  })
})

// describe('When given a grid',()=>{
//   it('should generate a single letter and two letter word from a 1x2 grid',()=>{
//     const grid =[
//       ["A","B"],
//         ]
//     const result = app.generatePossibleWords(grid);
//     expect(result).toEqual(["A","AB"])
//   })
// })

// describe('When given a grid',()=>{
//   it('should generate words from a 2x2 grid with adjacent letters', () => {
//     const grid = [
//       ['C'],
//       ['T'],
//     ];
//     const result = app.generatePossibleWords(grid);
//     expect(result).toEqual(['CAT', 'CATR', 'CAR', 'CA', 'CT', 'CTR', 'CR']);
//   });
// })
  