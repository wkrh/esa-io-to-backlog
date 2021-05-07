export const copyToClipboard = (s: string) => {
  const e = document.createElement('textarea');
  e.value = s;
  document.body.append(e);
  e.focus();
  e.select();
  document.execCommand('copy');
  e.remove();
};
