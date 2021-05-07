import { traverse, Node } from '.';

export const compiler: {
  [type: string]: (yields: Node, options?: any) => string;
} = {
  text: (yields): string => yields.value,
  paragraph: (yields): string => {
    return yields.children.map(item => traverse(item)).join('');
  },
  heading: (yields): string => {
    return `${'*'.repeat(yields.depth)} ${yields.children
      .map(item => traverse(item))
      .join('')}`;
  },
  strong: (yields): string => {
    return `''${yields.children.map(item => traverse(item)).join('')}''`;
  },
  emphasis: (yields): string => {
    return `'''${yields.children.map(item => traverse(item)).join('')}'''`;
  },
  delete: (yields): string => {
    return `%%${yields.children.map(item => traverse(item)).join('')}%%`;
  },
  blockquote: (yields): string => {
    return `> ${yields.children.map(item => traverse(item)).join('')}`;
  },
  code: (yields): string => {
    return `{code}\n${yields.value}\n{/code}`;
  },
  inlineCode: (yields): string => {
    return `{code}${yields.value}{/code}`;
  },
  break: (): string => {
    return '&br;';
  },
  link: (yields): string => {
    const url = yields.url;
    const title = yields.children.map(item => traverse(item)).join('');
    return `[[${title}:${url}]]`;
  },
  table: (yields): string => {
    const header = `${traverse(yields.children[0])}h\n`;
    const body = yields.children
      .slice(1)
      .map(item => traverse(item))
      .join('\n');
    return header + body;
  },
  tableRow: (yields): string => {
    const items = yields.children.map(item => traverse(item)).join(' | ');
    return '| ' + items + ' |';
  },
  tableCell: (yields): string => {
    return yields.children.map(item => traverse(item)).join('');
  },
  list: (yields, options): string => {
    let nest = 0;
    if ('nest' in options) {
      nest = options.nest;
    }
    return yields.children
      .map(item => traverse(item, { nest: nest + 1, ordered: yields.ordered }))
      .join('');
  },
  listItem: (yields, options): string => {
    const index = options.ordered ? '+' : '-';
    return yields.children
      .map(item => {
        if (item.type !== 'list' && yields.checked === null) {
          return `${index.repeat(options.nest)} ${item.children
            .map(i => traverse(i))
            .join('')}\n`;
        }
        if (item.type !== 'list' && yields.checked) {
          return `${index.repeat(options.nest)} [x] ${item.children
            .map(i => traverse(i))
            .join('')}\n`;
        }
        if (item.type !== 'list' && !yields.checked) {
          return `${index.repeat(options.nest)} [ ] ${item.children
            .map(i => traverse(i))
            .join('')}\n`;
        }
        return traverse(item, options);
      })
      .join('');
  },
};
