// index.js

import { createTree } from "./tree.js";
import { prettyPrint, createRandomArray } from "./utils.js";

// Create binary search tree from random numbers < 100
let array = createRandomArray(26, 0, 99);
let binarySearchTree = createTree(array);
prettyPrint(binarySearchTree.root);

// Confirm the tree is balanced
console.log(`The tree is balanced: ${binarySearchTree.isBalanced(binarySearchTree.root)}`);

// Print out all elements in level, pre, post, and in order
let levelOrder = binarySearchTree.levelOrder();
console.log(`Level order: ${levelOrder}`);

let preOrder = binarySearchTree.preOrder();
console.log(`Pre order: ${preOrder}`);

let postOrder = binarySearchTree.postOrder();
console.log(`Post order: ${postOrder}`);

let inOrder = binarySearchTree.inOrder();
console.log(`In order: ${inOrder}`);

// Add several numbers > 100 to the tree
binarySearchTree.insert(101);
binarySearchTree.insert(666);
binarySearchTree.insert(354);
binarySearchTree.insert(123);
binarySearchTree.insert(985);
binarySearchTree.insert(200);
binarySearchTree.insert(404);
prettyPrint(binarySearchTree.root);

// Confirm the tree is not balanced:
console.log(`The tree is balanced: ${binarySearchTree.isBalanced(binarySearchTree.root)}`);

// Balance the tree
let rebalancedTree = binarySearchTree.rebalance(binarySearchTree.root);
prettyPrint(rebalancedTree.root);

// Confirm the tree is balanced
console.log(`The tree is balanced: ${rebalancedTree.isBalanced(rebalancedTree.root)}`);

// Print out all elements in level, pre, post, and in order
let levelOrderAfterRebalance = rebalancedTree.levelOrder();
console.log(`Level order: ${levelOrderAfterRebalance}`);

let preOrderAfterRebalance = rebalancedTree.preOrder();
console.log(`Pre order: ${preOrderAfterRebalance}`);

let postOrderAfterRebalance = rebalancedTree.postOrder();
console.log(`Post order: ${postOrderAfterRebalance}`);

let inOrderAfterRebalance = rebalancedTree.inOrder();
console.log(`In order: ${inOrderAfterRebalance}`);
