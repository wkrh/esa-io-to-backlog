import { compiler, Node } from '.';

export const traverse = (node: Node, options = {}) => {
  if (compiler[node.type] === undefined) {
    return '';
  }
  if (options !== undefined) {
    return compiler[node.type](node, options);
  }
  return compiler[node.type](node);
};
