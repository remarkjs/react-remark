import { useEffect } from 'react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import 'katex/dist/katex.min.css';

import { useRemark } from '../src';

export default {
  title: 'Remark Hook',
  component: useRemark,
};

export const CommonMark = ({ content }) => {
  const [reactContent, setMarkdownSource] = useRemark();

  useEffect(() => {
    setMarkdownSource(content);
  }, [content]);

  return reactContent || <></>;
};
CommonMark.args = {
  content: `# header

1. ordered
2. list

* unordered
* list`,
};

export const GithubFlavoredMarkdown = ({ content }) => {
  const [reactContent, setMarkdownSource] = useRemark({
    remarkPlugins: [remarkGfm],
  });

  useEffect(() => {
    setMarkdownSource(content);
  }, [content]);

  return reactContent || <></>;
};
GithubFlavoredMarkdown.args = {
  content: `# header

| column 1 | column 2 |
| -------- | -------- |
| first    | row      |
`,
};

export const MarkdownWithMath = ({ content }) => {
  const [reactContent, setMarkdownSource] = useRemark({
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  });

  useEffect(() => {
    setMarkdownSource(content);
  }, [content]);

  return reactContent || <></>;
};
MarkdownWithMath.args = {
  content: `Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$`,
};

export const MixedHTMLSanitized = ({ content }) => {
  const [reactContent, setMarkdownSource] = useRemark({
    remarkToRehypeOptions: { allowDangerousHtml: true },
    rehypePlugins: [rehypeRaw, rehypeSanitize],
  });

  useEffect(() => {
    setMarkdownSource(content);
  }, [content]);

  return reactContent || <></>;
};
MixedHTMLSanitized.args = {
  content: `# header

<strong>mixed</strong>
<em>with</em>
<kbd>html</kbd>`,
};
