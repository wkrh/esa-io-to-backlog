import unified from 'unified';
import markdown from 'remark-parse';
import breaks from 'remark-breaks';

export const mdToTree = (md: string): { children: any[] } =>
  unified().use(markdown, {}).use(breaks).parse(md) as any;
