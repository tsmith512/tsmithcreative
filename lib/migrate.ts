/**
 *
 * @param content (string) Text with Liquid tags in t
 * @returns (string) Input text with Liquid tags escaped
 */
export const filterLiquid = (content: string): string => {
  return content
    .replaceAll('{%', '&lbrace;&percnt;')
    .replaceAll('%}', '&percnt;&rbrace;')
    .replaceAll('{{', '&lbrace;&lbrace;')
    .replaceAll('}}', '&rbrace;&rbrace;');
};
