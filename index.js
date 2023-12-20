// Algorithm
// 1. Length of array start = 0, end = length - 1
// 2. mid = (start + end) / 2
// 3. Create tree node with mid at root (maybe call it A)
// 4. Recursively do the following:
//    - Calculate mid of left subarray and make it root of left subtree of A
//    - Calculate mid of right subarray and make it root of right subtree of A


function node(data = null, left = null, right = null) {
  return { data, left, right }
}

function tree(array) {
  // Sort the array and remove duplicates
  const sortedArray = [...new Set(array.sort((a, b) => a - b))];

  function buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    const mid = Math.floor((start + end) / 2);
    const root = node(array[mid]);
    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end)    

    return root;
  }

  const root = buildTree(sortedArray, 0, sortedArray.length - 1);

  return { root };
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
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

const array = [3, 6, 8, 23, 48, 76, 89]
let myTree = tree(array);
let prettyTree = prettyPrint(myTree.root);

console.log(myTree);
console.log(prettyPrint);