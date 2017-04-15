import {Num, Obj} from '../utils';
import {Dimensions} from '../spatial';

export class Grid<T> {

  public data: T[][];
  public rows: number;
  public columns: number;
  public dimensions: Dimensions;

  // scale 1:1 pixel
  public scale: number;

  constructor(scale: number, width: number, height: number) {
    if(Num.isNegative(scale, width, height)) {
      throw Error('Grid must be given a positive scale, width, and column');
    }

    this.scale = scale;
    this.dimensions = new Dimensions(width, height);
    this.rows = Math.round(this.dimensions.height / this.scale);
    this.columns = Math.round(this.dimensions.width / this.scale);
    this.data = [];
    this._populateGrid<T>();
  }

  /**
   * Populates each cell of the grid with an undefined data value,
   * determining the size of the grid by the given rows and columns count
   * as defined by the scale, width, and height given to the constructor
   * @return {T[]} [description]
   */
  private _populateGrid<T>(): void {
    for(let row = 0; row < this.rows; row++) {
      this.data.push([]);
      for(let col = 0; col < this.columns; col++) {
        this.data[row].push(undefined)
      }
    }
  }

  /**
   * Populates the grid with the given row values
   * @param {T[]} ...rows [description]
   */
  public setRow(...rows: T[][]): void {
    this.forEach((row: T[], rowIndex: number) => {
      for(let i = 0; i < rows.length; i++) {
        this.data[i] = rows[i];
      }
    }, null);
  }

  /**
   * Iterates over each row and then each column, executing the row callback
   * once for each row and the column callback once for each column
   * @param {Function} rowCallback [description]
   * @param {Function} colCallback [description]
   */
  public forEach(rowCallback: Function, colCallback: Function): void {
    // iterate over rows
    if(Obj.isNotNullOrUndefined(rowCallback)) {
      for(let row = 0; row < this.rows; row++) {
        // row, row index
        rowCallback(this.data[row], row);

        if(Obj.isNotNullOrUndefined(colCallback)) {

        }
      }
    }

    // iterate over columns
    if(Obj.isNotNullOrUndefined(colCallback)) {
      for(let col = 0; col < this.columns; col++) {
        let colArr = [];
        for(let row = 0; row < this.rows; row++) {
          colArr.push(this.data[row][col]);
        }
        // cell, col index
        colCallback(colArr, col);
      }
    }
  }

  /**
   * Iterates over each cell in the array, calling a callback
   * which takes the value for that cell, and it's row and column indices
   */
  public forEachCell<T>(cellCallback: Function): void {
    for(let row = 0; row < this.rows; row++) {
      for(let col = 0; col < this.columns; col++) {
        cellCallback(this.data[row][col], row, col);
      }
    }
  }
}