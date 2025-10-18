import { tree } from "./balanced-bst.js";

const array = [];
for (let i = 0; i < 100; i++) {
  array.push(randomInteger(0, 100));
}

const bst = tree(array);
bst.prettyPrint();
console.log(bst.isBalanced());

for (let i = 0; i < 100; i++) {
  bst.insert(randomInteger(100, 200));
}
bst.prettyPrint();
console.log(bst.isBalanced());
bst.reBalance();
bst.prettyPrint();
console.log(bst.isBalanced());

bst.preOrderForEach((curr) => console.log(curr.data));
bst.inOrderForEach((curr) => console.log(curr.data));
bst.postOrderForEach((curr) => console.log(curr.data));

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
