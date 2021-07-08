import { useEffect } from 'react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import 'katex/dist/katex.min.css';

import { useRemarkSync } from '../src';

export default {
  title: 'Remark Hooks/sync and ssr with useRemarkSync',
  component: useRemarkSync,
};

export const CommonMark = ({ content }) => {
  return useRemarkSync(content);
};
CommonMark.args = {
  content: `# header

1. ordered
2. list

* unordered
* list`,
};

export const GithubFlavoredMarkdown = ({ content }) => {
  return (
    useRemarkSync(content, {
      remarkPlugins: [remarkGfm],
    }) || <></>
  );
};
GithubFlavoredMarkdown.args = {
  content: `# header

| column 1 | column 2 |
| -------- | -------- |
| first    | row      |
`,
};

export const MarkdownWithMath = ({ content }) => {
  return useRemarkSync(content, {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  });
};
MarkdownWithMath.args = {
  content: `Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$`,
};

export const MixedHTMLSanitized = ({ content }) => {
  return useRemarkSync(content, {
    remarkToRehypeOptions: { allowDangerousHtml: true },
    rehypePlugins: [rehypeRaw, rehypeSanitize],
  });
};
MixedHTMLSanitized.args = {
  content: `# header

<strong>mixed</strong>
<em>with</em>
<kbd>html</kbd>`,
};
