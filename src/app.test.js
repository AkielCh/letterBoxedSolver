



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