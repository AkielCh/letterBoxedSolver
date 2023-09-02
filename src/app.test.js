



const app = require('./app');

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
