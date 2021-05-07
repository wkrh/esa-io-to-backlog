import { Node, traverse } from '.';

export const treeToBacklog = (tree: Node) =>
  tree.children.map(e => traverse(e)).join('\n');
