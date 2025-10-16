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
    _root = _insertRec(value, _root);
    return _root;
  }

  function _insertRec(data, curr) {
    if (curr === null) return node(data);
    if (data === curr.data) return curr;
    const side = data < curr.data ? "left" : "right";
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
      const side = data < curr.data ? "left" : "right";
      curr[side] = _deleteItemRec(data, curr[side]);
    }
    return curr;
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

  return { getRoot, prettyPrint, insert, deleteItem };
}

const numbers = [50, 30, 70, 20, 40, 60, 80];
const t = tree(numbers);
t.deleteItem(50);
t.prettyPrint(t.getRoot());
