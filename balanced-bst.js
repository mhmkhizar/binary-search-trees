import { queue } from "./queue.js";

function node(data) {
  return {
    data: data,
    left: null,
    right: null,
  };
}

function tree(arr = []) {
  const _uniqueArr = [...new Set(arr)];
  let _sortedArr = _mergeSort(_uniqueArr);
  let _root = _sortedArr.length
    ? _buildTree(_sortedArr, 0, _sortedArr.length - 1)
    : null;

  function getRoot() {
    return _root;
  }

  function insert(value) {
    if (value === undefined) return _root;
    if (_root === null) {
      _root = node(value);
      return _root;
    }
    _root = _insertRec(value, _root);
    return _root;
  }

  function _insertRec(data, curr) {
    if (curr === null) return node(data);
    if (data === curr.data) return curr;
    const side = data < curr.data ? `left` : `right`;
    curr[side] = _insertRec(data, curr[side]);
    return curr;
  }

  function deleteItem(value) {
    if (value === undefined || _root === null) return _root;
    _root = _deleteItemRec(value, _root);
    return _root;
  }

  function _deleteItemRec(data, curr) {
    if (curr === null) return curr;

    const currHasValue = data === curr.data;
    const currHasLeft = curr.left !== null;
    const currHasRight = curr.right !== null;

    if (currHasValue && !currHasLeft && !currHasRight) {
      curr = null;
    } else if (currHasValue && (!currHasLeft || !currHasRight)) {
      curr = currHasLeft ? curr.left : curr.right;
    } else if (currHasValue && currHasLeft && currHasRight) {
      let successorParent = curr;
      let successor = curr.right;
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }
      curr.data = successor.data;
      successorParent === curr
        ? (successorParent.right = successor.right)
        : (successorParent.left = successor.right);
    } else {
      const side = data < curr.data ? `left` : `right`;
      curr[side] = _deleteItemRec(data, curr[side]);
    }
    return curr;
  }

  function find(value, curr = _root) {
    if (curr === null) return curr;
    if (curr.data === value) return curr;
    const side = value < curr.data ? `left` : `right`;
    return find(value, curr[side]);
  }

  function levelOrderForEach(callback) {
    if (callback === undefined || typeof callback !== "function") {
      throw new Error(`A callback function is required.`);
    }
    if (_root === null) return;
    const q = queue();
    q.enqueue(_root);
    while (!q.isEmpty()) {
      const curr = q.front();
      callback(curr);
      if (curr.left !== null) q.enqueue(curr.left);
      if (curr.right !== null) q.enqueue(curr.right);
      q.dequeue();
    }
  }

  function inOrderForEach(callback) {
    if (callback === undefined || typeof callback !== `function`) {
      throw new Error(`A callback function is required.`);
    }
    if (_root === null) return;
    _inOrderForEach(callback, _root);
  }

  function _inOrderForEach(callback, currentNode) {
    if (currentNode === null) return;
    _inOrderForEach(callback, currentNode.left);
    callback(currentNode);
    _inOrderForEach(callback, currentNode.right);
  }

  function preOrderForEach(callback) {
    if (callback === undefined || typeof callback !== `function`) {
      throw new Error(`A callback function is required.`);
    }
    if (_root === null) return;
    _preOrderForEach(callback, _root);
  }

  function _preOrderForEach(callback, currentNode) {
    if (currentNode === null) return;
    callback(currentNode);
    _preOrderForEach(callback, currentNode.left);
    _preOrderForEach(callback, currentNode.right);
  }

  function postOrderForEach(callback) {
    if (callback === undefined || typeof callback !== `function`) {
      throw new Error(`A callback function is required.`);
    }
    if (_root === null) return;
    _postOrderForEach(callback, _root);
  }

  function _postOrderForEach(callback, currentNode) {
    if (currentNode === null) return;
    _postOrderForEach(callback, currentNode.left);
    _postOrderForEach(callback, currentNode.right);
    callback(currentNode);
  }

  function height(value) {
    if (value === undefined) return null;
    const node = find(value);
    if (node === null) return null;
    return _heightRec(node) - 1;
  }

  function _heightRec(currentNode) {
    if (currentNode === null) return 0;
    const left = _heightRec(currentNode.left);
    const right = _heightRec(currentNode.right);
    return Math.max(left, right) + 1;
  }

  function depth(value) {
    if (value === undefined || _root === null) return null;
    const node = find(value);
    if (node === null) return null;
    return _depthRec(value, _root);
  }

  function _depthRec(value, currentNode) {
    if (currentNode === null || currentNode.data === value) return 0;
    const side = value < currentNode.data ? `left` : `right`;
    return _depthRec(value, currentNode[side]) + 1;
  }

  function isBalanced(curr = _root) {
    if (curr === null) return true;
    const left = _heightRec(curr.left);
    const right = _heightRec(curr.right);
    const diffOk = Math.abs(left - right) <= 1;
    const leftOk = isBalanced(curr.left);
    const rightOk = isBalanced(curr.right);
    return diffOk && leftOk && rightOk;
  }

  function reBalance() {
    _sortedArr = [];
    inOrderForEach((curr) => _sortedArr.push(curr.data));
    _root = _buildTree(_sortedArr, 0, _sortedArr.length - 1);
    return _root;
  }

  function _buildTree(arr, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = node(arr[mid]);
    root.left = _buildTree(arr, start, mid - 1);
    root.right = _buildTree(arr, mid + 1, end);
    return root;
  }

  function _mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const half = Math.floor(arr.length / 2);
    const left = _mergeSort(arr.slice(0, half));
    const right = _mergeSort(arr.slice(half));
    const result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    result.push(...left.slice(i));
    result.push(...right.slice(j));
    return result;
  }

  function prettyPrint(node, prefix = ``, isLeft = true) {
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
  }

  return {
    getRoot,
    prettyPrint,
    insert,
    deleteItem,
    find,
    levelOrderForEach,
    inOrderForEach,
    preOrderForEach,
    postOrderForEach,
    height,
    depth,
    isBalanced,
    reBalance,
  };
}
