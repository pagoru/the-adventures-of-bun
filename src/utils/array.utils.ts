export const arrayUtils = () => {
  const getNew = (length: number) =>
    Array.from({ length }).map((_, index) => index);

  const isEqual = <ArrayItem extends any>(
    array1: ArrayItem[],
    array2: ArrayItem[],
  ): boolean => array1.toString() === array2.toString();

  return {
    getNew,
    isEqual,
  };
};
