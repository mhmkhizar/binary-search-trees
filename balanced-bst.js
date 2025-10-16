function node(data) {
  return {
    data: data,
    left: null,
    right: null,
  };
}

function tree(arr = []) {
  const _unique = [...new Set(arr)];
  const _sorted = _mergeSort(_unique);
  let _root = _sorted.length
    ? _buildTree(_sorted, 0, _sorted.length - 1)
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
    _insertRec(value, _root);
    return _root;
  }

  function _insertRec(data, currNode) {
    if (currNode === null) return node(data);
    if (data === currNode.data) return currNode;
    const side = data < currNode.data ? "left" : "right";
    currNode[side] = _insertRec(data, currNode[side]);
    return currNode;
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

  function prettyPrint(node, prefix = "", isLeft = true) {
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

  return { getRoot, prettyPrint, insert };
}

const numbers = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const t = tree(numbers);
t.insert(5);
t.prettyPrint(t.getRoot());
