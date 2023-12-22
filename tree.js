// tree.js

/**
 * Algorithm for balanced binary search tree:
 * 1. Length of array start = 0, end = length - 1
 * 2. mid = (start + end) / 2
 * 3. Create tree node with mid at root (maybe call it A)
 * 4. Recursively do the following:
 *    - Calculate mid of left subarray and make it root of left subtree of A
 *    - Calculate mid of right subarray and make it root of right subtree of A
*/
import { node } from "./node.js";

export function createTree(array) {
  // Sort the array and remove duplicates
  const sortedArray = [...new Set(array.sort((a, b) => a - b))];

  // Initialize the root and build the tree
  const root = buildTree(sortedArray, 0, sortedArray.length - 1);

  // Insert a new node as a leaf (no children)
  const insert = (value, currentNode = root) => {
    if (currentNode === null) return node(value);

    // Value already exists in the tree
    if (currentNode.data === value) return currentNode;

    if (value < currentNode.data) {
      currentNode.left = insert(value, currentNode.left);
    } else {
      currentNode.right = insert(value, currentNode.right);
    }

    return currentNode;
  };

  const deleteNode = (value, currentNode = root) => {
    if (currentNode === null) return null; // Value not found in the tree

    if (value < currentNode.data) {
      currentNode.left = deleteNode(value, currentNode.left);
    } else if (value > currentNode.data) {
      currentNode.right = deleteNode(value, currentNode.right);
    } else {
      // Node with one child or no child
      if (currentNode.left === null) {
        return currentNode.right;
      } else if (currentNode.right === null) {
        return currentNode.left;
      }

      // Node with two children, get the inorder successor
      currentNode.data = minValue(currentNode.right);

      // Delete the inorder successor
      currentNode.right = deleteNode(currentNode.data, currentNode.right);
    }

    return currentNode;
  };

  const minValue = (node) => {
    let minValue = node.data;
    while (node.left !== null) {
      minValue = node.left.data;
      node = node.left;
    }
    return minValue;
  };

  const find = (value, currentNode = root) => {
    if (currentNode === null) return null; // Value not found

    if (value === currentNode.data) {
      return currentNode; // Value found
    } else if (value < currentNode.data) {
      return find(value, currentNode.left);
    } else {
      return find(value, currentNode.right);
    }
  };

  // Breadth-first traversal
  const levelOrder = (callback = null) => {
    let currentNode = root;
    let result = [];

    // Initialize queue and enqueue the root node
    let queue = [];
    queue.push(currentNode);

    while (queue.length > 0) {
      currentNode = queue.shift();

      // Apply the callback if provided, otherwise add it to result
      if (callback) {
        callback(currentNode);
      } else {
        result.push(currentNode.data);
      }

      // Enqueue left and right children
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }

    return result;
  };

  // Depth-first traversal: root -> left subtree -> right subtree
  const preOrder = (currentNode = root, callback = null) => {
    if (currentNode === null) return [];

    let result = [];

    if (callback) {
      callback(currentNode);
    } else {
      result.push(currentNode.data);
    }

    result = result.concat(preOrder(currentNode.left, callback));
    result = result.concat(preOrder(currentNode.right, callback));

    return result;
  };

  // Depth-first traversal: left subtree -> root -> right subtree
  // The result will be in sorted order
  const inOrder = (currentNode = root, callback = null) => {
    if (currentNode === null) return [];

    let result = [];

    result = result.concat(inOrder(currentNode.left, callback));

    if (callback) {
      callback(currentNode);
    } else {
      result.push(currentNode.data);
    }

    result = result.concat(inOrder(currentNode.right, callback));

    return result;
  };

  // Depth-first traversal: left subtree -> right subtree -> root
  const postOrder = (currentNode = root, callback = null) => {
    if (currentNode === null) return [];

    let result = [];

    result = result.concat(postOrder(currentNode.left, callback));
    result = result.concat(postOrder(currentNode.right, callback));

    if (callback) {
      callback(currentNode);
    } else {
      result.push(currentNode.data);
    }

    return result;
  };

  const height = (currentNode) => {
    if (currentNode === null) return -1;

    let leftHeight = height(currentNode.left);
    let rightHeight = height(currentNode.right);

    return 1 + Math.max(leftHeight, rightHeight);
  };

  const depth = (currentNode, root) => {
    if (root === null || currentNode === null) return -1;
    if (root === currentNode) return 0;

    if (currentNode.data < root.data) {
      // Node might be in left subtree
      let leftDepth = depth(currentNode, root.left);
      if (leftDepth !== -1) return 1 + leftDepth;
    } else {
      // Node might be in right subtree
      let rightDepth = depth(currentNode, root.right);
      if (rightDepth !== -1) return 1 + rightDepth;
    }

    // Node not found in either subtree
    return -1;
  };

  const isBalanced = (root) => {
    const checkBalance = (node) => {
      if (node === null) return { height: -1, balanced: true };

      let left = checkBalance(node.left);
      if (!left.balanced) return { balanced: false };

      let right = checkBalance(node.right);
      if (!right.balanced) return { balanced: false };

      let heightDifference = Math.abs(left.height - right.height);
      let isBalanced = heightDifference <= 1;

      return { height: Math.max(left.height, right.height) + 1, balanced: isBalanced }
    };

    return checkBalance(root).balanced;
  };

  const rebalance = (root) => {
    let sortedArray = inOrder(root);
    let rootNode = createTree(sortedArray);

    return rootNode;
  }

  return {
    root,
    insert,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}


export function buildTree(array, start, end) {
  if (start > end) {
    return null;
  }

  const mid = Math.floor((start + end) / 2);
  const root = node(array[mid]);
  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end)

  return root;
}
