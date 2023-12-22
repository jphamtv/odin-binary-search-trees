// utils.js

export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};


export function createRandomArray(numberOfItems, minNum, maxNum) {
  let array = new Set();

  while (array.size < numberOfItems) {
    let randomNum = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
    array.add(randomNum);      
  }

  const sortedArray = Array.from(array).sort((a, b) => a - b);

  return sortedArray;
}
