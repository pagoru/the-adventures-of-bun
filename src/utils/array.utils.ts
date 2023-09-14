export const arrayUtils = () => {
  const getNew = (length: number) =>
    Array.from({ length }).map((_, index) => index);

  const isEqual = <ArrayItem extends any>(
    array1: ArrayItem[],
    array2: ArrayItem[],
  ): boolean => array1.toString() === array2.toString();
  
  function transpose(array: number[][]): number[][] {
    const numRows = array.length;
    const numCols = array[0].length;
    
    // Create an empty 2D array with switched dimensions
    const result = new Array(numCols).fill(null).map(() => new Array(numRows));
    
    // Loop through the original array and fill in the transposed values
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        result[j][i] = array[i][j];
      }
    }
    
    return result;
  }

  return {
    getNew,
    isEqual,
    transpose
  };
};
