export function queue() {
  const _items = {};
  let _front = 0;
  let _back = 0;

  function front() {
    return _items[_front];
  }

  function enqueue(x) {
    _items[_back++] = x;
  }

  function dequeue() {
    if (_front === _back) return null;
    const value = _items[_front];
    delete _items[_front++];
    return value;
  }

  function isEmpty() {
    return _front === _back;
  }

  return { front, enqueue, dequeue, isEmpty };
}
