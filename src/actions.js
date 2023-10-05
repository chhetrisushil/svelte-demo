export function selectOnFocus(node) {
  if (node && typeof node.select === "function") {
    // make sure node is defined and has a select() method.
    const onFocus = event => node.select(); // event handler.
    node.addEventListener("focus", onFocus); // when node gets focus call onFocus().

    return {
      destroy: () => node.removeEventListener("focus", onFocus) // this will be executed when the node is revmoved from the DOM.
    };
  }
}

export function focusOnInit(node) {
  return node && typeof node.focus === "function" && node.focus();
}
