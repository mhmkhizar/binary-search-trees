function node(data) {
  return {
    data: data,
    left: null,
    right: null,
  };
}

function tree(arr) {
  const _unique = [...new Set(arr)];
  const _sorted = _mergeSort(_unique);
  const _root = _buildTree(_sorted, 0, _sorted.length - 1);

  function getRoot() {
    return _root;
  }

  function insert(value, curr = _root) {
    if (curr === null) return node(value);
    if (value < curr.data) {
      curr.left = insert(value, curr.left);
    } else {
      curr.right = insert(value, curr.right);
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

  return { getRoot, prettyPrint, insert };
}

const numbers = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const t = tree(numbers);

// console.log(t.insert(2));
t.prettyPrint(t.getRoot());
