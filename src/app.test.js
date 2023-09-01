// math.test.js



const math = require('./app');

describe('Math Functions', () => {
  it('should add two numbers correctly', () => {
    expect(math.add(1, 2)).toBe(3);
  });

  it('should subtract two numbers correctly', () => {
    expect(math.subtract(5, 3)).toBe(2);
  });
});
