export class Matrix {
  columns: number;
  rows: number;
  matrix: number[][];
  /**
   * Construcs a matrix object
   * @constructor
   * @param {number} columns number of columns
   * @param {number} rows number of rows
   * @param {boolean} random fill the matrix with zero or random numbers
   */
  constructor(columns: number, rows: number, random?: boolean) {
    if (!random) {
      this.columns = columns;
      this.rows = rows;
      this.matrix = this.fill();
    } else {
      this.columns = columns;
      this.rows = rows;
      this.matrix = this.fillRandom();
    }
  }

  /**
   * Fill a matrix object with zeros & create a multidimensional array
   * @return
   *  A multidimensional array filled with zeros
   */
  fill() {
    const m = [];
    for (let i = 0; i < this.columns; i++) {
      m[i] = [];
      for (let j = 0; j < this.rows; j++) {
        m[i][j] = 0;
      }
    }
    return m;
  }

  /**
   * Fill a matrix with random numbers
   * @return
   *  A multidimensional array with random numbers & create a multidimensional array
   */
  fillRandom() {
    const m = [];
    for (let i = 0; i < this.columns; i++) {
      m[i] = [];
      for (let j = 0; j < this.rows; j++) {
        m[i][j] = Math.floor(Math.random() * Math.floor(3));
      }
    }
    return m;
  }
}
