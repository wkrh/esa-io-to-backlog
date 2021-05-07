import { treeToBacklog } from './tree-to-backlog';
import { copyToClipboard } from './copy-to-clipboard';
import { mdToTree } from './md-to-tree';

export const main = async () => {
  const md = await fetch(`${location.href}.md`).then(r => r.text());
  copyToClipboard(treeToBacklog(mdToTree(md)));
  console.info('copied to clipboard!');
};

main();
