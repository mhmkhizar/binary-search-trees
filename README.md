# Binary Search Trees

This project implements a balanced binary search tree as part of The Odin Project curriculum. It provides a complete implementation of a self-balancing BST with various traversal methods and utility functions.

## Features

- **Self-Balancing Tree**: Automatically maintains balance for optimal performance
- **Complete BST Operations**: Insert, delete, find, and traversal methods
- **Multiple Traversal Methods**:
  - In-order traversal
  - Pre-order traversal
  - Post-order traversal
  - Level-order traversal
- **Tree Analysis Tools**:
  - Height and depth calculation
  - Balance checking
  - Rebalancing capability
- **Visualization**: Built-in pretty print function for tree structure display

## Implementation Details

The main components include:

### Core Modules

- `tree(arr)`: Main BST factory function that creates a balanced tree from an array
- `node(data)`: Node factory function creating nodes with data, left, and right properties
- `queue()`: Custom queue implementation for level-order operations

### Key Methods

- `insert(value)`: Inserts a value into the tree
- `deleteItem(value)`: Removes a value from the tree
- `find(value)`: Searches for a value in the tree
- `isBalanced()`: Checks if the tree is balanced
- `reBalance()`: Rebalances the tree
- `height(value)`: Returns the height of a node
- `depth(value)`: Returns the depth of a node

### Traversal Methods

- inOrderForEach(callback): In-order traversal (left, root, right)
- preOrderForEach(callback): Pre-order traversal (root, left, right)
- postOrderForEach(callback): Post-order traversal (left, right, root)
- levelOrderForEach(callback): Level-order traversal (breadth-first)

## Usage

```javascript
// Create a tree from an array
const bst = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// Insert values
bst.insert(10);

// Check if balanced
console.log(bst.isBalanced());

// Print tree structure
bst.prettyPrint();

// Perform traversals
bst.inOrderForEach((node) => console.log(node.data));
bst.preOrderForEach((node) => console.log(node.data));
bst.postOrderForEach((node) => console.log(node.data));
```

## Project Structure

- `balanced-bst.js`: Main binary search tree implementation
- `queue.js`: Queue data structure for level-order operations
- `main.js`: Demonstration and testing script

## Technical Highlights

- Implements merge sort for initial array sorting
- Uses recursive algorithms for tree operations
- Maintains balance through rebuild mechanism
- Provides comprehensive tree analysis capabilities
- Features clean, functional programming approach

## Demo Functionality

The `main.js` file demonstrates:

1. Creating a balanced BST from random data
2. Testing balance after insertions
3. Rebalancing the tree
4. Performing all four traversal types
5. Visualizing tree structure with prettyPrint

This implementation ensures O(log n) time complexity for search, insert, and delete operations by maintaining tree balance.
