// https://github.com/AnthonyPierrat/strassen-algorith

import {Matrix} from './Matrix';

export default class Algo {
  /**
   * @constructor
   * Construcs an algo object with all strassen methods
   */
  constructor() {}

  /**
   * Matrix addition
   * @param {Matrix} a
   * @param {Matrix} b
   * @return
   *  A matrix object
   */
  add(a, b) {
    const c = new Matrix(a.columns, a.rows, false);
    for (let i = 0; i < a.columns; i++) {
      for (let j = 0; j < a.rows; j++) {
        c.matrix[i][j] = a.matrix[i][j] + b.matrix[i][j];
      }
    }
    return c;
  }

  /**
   * Matrix substraction
   * @param {Matrix} a
   * @param {Matrix} b
   * @return
   *  A matrix object
   */
  substract(a, b) {
    const c = new Matrix(a.columns, a.rows, false);
    for (let i = 0; i < a.columns; i++) {
      for (let j = 0; j < a.rows; j++) {
        c.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];
      }
    }
    return c;
  }

  /**
   * standard matrix multiplying (without Strassen)
   * @param {Matrix} a
   * @param {Matrix} b
   * @return
   *  A matrix object
   */
  multiply(a, b) {
    const c = new Matrix(a.columns, a.rows, false);
    for (let i = 0; i < b.columns; i++) {
      for (let j = 0; j < a.rows; j++) {
        for (let k = 0; k < a.columns; k++) {
          c.matrix[i][j] += a.matrix[i][k] * b.matrix[k][j];
        }
      }
    }
    return c;
  }

  /**
   * multiply a matrix by a coefficient
   * @param {number} coef the coefficient
   */
  matrixByCoef(matrix, coef) {
    for (let i = 0; i < matrix.columns; i++) {
      for (let j = 0; j < matrix.rows; j++) {
        matrix.matrix[i][j] *= coef;
      }
    }

    return matrix;
  }

  /**
   * Check wether the matrix is power of two
   * @param {number} n size
   * @return
   *  A boolean
   */
  isPowerOfTwo(n) {
    return Math.log2(n) % 1 === 0;
  }

  /**
   * Fill a matrix to a power of two matrix with zeros
   * @param {Matrix} matrix
   */
  fillPowerOfTwo(matrix) {
    // find nearest power of two
    let nearestPowerOfTwo = Math.pow(2, Math.trunc(Math.log2(matrix.columns) + 1)) - matrix.columns;
    // compute new size
    const size = nearestPowerOfTwo + matrix.columns;
    // fill
    matrix.matrix.forEach(array => {
      for (let i = 0; i < nearestPowerOfTwo; i++) array.push(0);
    });
    for (let i = 0; i < nearestPowerOfTwo; i++) matrix.matrix.push(new Array(size).fill(0));
  }

  /**
   * Reshape a matrix to it's origin columns and rows (remove zeros)
   * @param {Matrix} matrix
   */
  reshape(matrix, size) {
    matrix.matrix.splice(size, matrix.matrix.length - size);
    matrix.matrix.forEach(array => {
      array.splice(size, array.length - size);
    });
    matrix.columns = size;
    matrix.rows = size;
  }

  /**
   * Split a matrix
   * @param {Matrix} matrix
   * @param {number} indexColumnStart
   * @param {number} indexColumnEnd
   * @param {number} indexRowStart
   * @param {number} indexRowEnd
   * @returns
   *  A multidimensional array
   */
  split(matrix, indexColumnStart, indexColumnEnd, indexRowStart, indexRowEnd) {
    const splitted = matrix.matrix.slice(indexColumnStart, indexColumnEnd);
    let result = [];
    splitted.forEach(array => {
      result.push(array.slice(indexRowStart, indexRowEnd));
    });

    return result;
  }

  /**
   * merge a matrix
   * @param {Matrix} matrix matrix to merge
   * @param {Matrix} matrixResult merged matrix
   * @param {number} start
   * @param {number} end
   */
  merge(matrix, matrixResult, start, end) {
    for (let i1 = 0, i2 = start; i1 < matrix.matrix.length; i1++, i2++)
      for (let j1 = 0, j2 = end; j1 < matrix.matrix.length; j1++, j2++) {
        matrixResult.matrix[i2][j2] = matrix.matrix[i1][j1];
      }
  }

  /**
   * Divide each matrix to submatrices using strassen formulas
   * @param {Matrix} a Matrix A
   * @param {Matrix} b Matrix B
   */
  divideByBlock(a, b) {
    // get matrix length
    const n = a.matrix.length;

    // create matrix c with zeros
    const result = new Matrix(n, n, false);

    // if matrix is below 2 then use standard multiplication
    if (n <= 2) {
      return this.multiply(a, b);

      // recursive
    } else {
      // top left matrix a
      let a11 = new Matrix(n / 2, n / 2, false);
      a11.matrix = this.split(a, 0, n / 2, 0, n / 2);
      // top right matrix a
      let a12 = new Matrix(n / 2, n / 2, false);
      a12.matrix = this.split(a, 0, n / 2, n / 2, n);
      // bottom left matrix a
      let a21 = new Matrix(n / 2, n / 2, false);
      a21.matrix = this.split(a, n / 2, n, 0, n / 2);
      // bottom right matrix a
      let a22 = new Matrix(n / 2, n / 2, false);
      a22.matrix = this.split(a, n / 2, n, n / 2, n);

      // top left matrix b
      let b11 = new Matrix(n / 2, n / 2, false);
      b11.matrix = this.split(b, 0, n / 2, 0, n / 2);
      // top right matrix b
      let b12 = new Matrix(n / 2, n / 2, false);
      b12.matrix = this.split(b, 0, n / 2, n / 2, n);
      // bottom left matrix b
      let b21 = new Matrix(n / 2, n / 2, false);
      b21.matrix = this.split(b, n / 2, n, 0, n / 2);
      // bottom right matrix b
      let b22 = new Matrix(n / 2, n / 2, false);
      b22.matrix = this.split(b, n / 2, n, n / 2, n);

      // strassen formulas with recursive call
      const q1 = this.divideByBlock(this.substract(a11, a12), b22);
      const q2 = this.divideByBlock(this.substract(a21, a22), b11);
      const q3 = this.divideByBlock(a22, this.add(b11, b21));
      const q4 = this.divideByBlock(a11, this.add(b12, b22));
      const q5 = this.divideByBlock(this.add(a11, a22), this.substract(b22, b11));
      const q6 = this.divideByBlock(this.add(a11, a21), this.add(b11, b12));
      const q7 = this.divideByBlock(this.add(a12, a22), this.add(b21, b22));

      // matrix c construction with strassen formulas
      const c11 = this.substract(this.substract(q1, q3), this.substract(q5, q7));
      const c12 = this.substract(q4, q1);
      const c21 = this.add(q2, q3);
      const c22 = this.add(this.substract(this.matrixByCoef(q2, -1), q4), this.add(q5, q6));

      // matrix reconstruction
      this.merge(c11, result, 0, 0);
      this.merge(c12, result, 0, n / 2);
      this.merge(c21, result, n / 2, 0);
      this.merge(c22, result, n / 2, n / 2);
    }

    return result;
  }

  /**
   * Strassen multiplication
   * @param {Matrix} a Matrix a
   * @param {Matrix} b Matrix b
   */
  strassen(a, b) {
    if (a.columns !== a.rows || b.columns !== b.rows) throw new Error('The matrix is not n*n');
    if (a.columns !== b.columns) throw new Error('Matrix must have the same size');

    // get size & create matrix c
    const size = a.columns;
    let c = new Matrix(size, size);

    // if matrix is not power of two then fill it with zeros with the nearest power of two
    // else result calculation
    if (!this.isPowerOfTwo(size)) {
      this.fillPowerOfTwo(a);
      this.fillPowerOfTwo(b);
      // matrix result calculation using rescursive call
      c = this.divideByBlock(a, b);
      // reshape matrix to it's orignal size (removing zeros)
      this.reshape(c, size);
    } else {
      c = this.divideByBlock(a, b);
    }
    return c;
  }
}
