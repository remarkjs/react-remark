import { useEffect } from 'react';
import { text } from '@storybook/addon-knobs';
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

export const PlainMarkdown = () => {
  const [reactContent, setMarkdownSource] = useRemark();
  const markdownSource = text(
    'markdown',
    `# header

1. ordered
2. list

* unordered
* list`
  );

  useEffect(() => {
    setMarkdownSource(markdownSource);
  }, [markdownSource]);

  return reactContent;
};

export const MarkdownWithMath = () => {
  const [reactContent, setMarkdownSource] = useRemark({
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  });
  const markdownSource = text(
    'markdown',
    `Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.

  $$
  L = \\frac{1}{2} \\rho v^2 S C_L
  $$`
  );

  useEffect(() => {
    setMarkdownSource(markdownSource);
  }, [markdownSource]);

  return reactContent;
};

export const MixedHTMLSanitized = () => {
  const [reactContent, setMarkdownSource] = useRemark({
    remarkToRehypeOptions: { allowDangerousHTML: true },
    rehypePlugins: [rehypeRaw, rehypeSanitize],
  });
  const markdownSource = text(
    'markdown',
    `# header

<strong>mixed</strong>
<em>with</em>
<kbd>html</kbd>`
  );

  useEffect(() => {
    setMarkdownSource(markdownSource);
  }, [markdownSource]);

  return reactContent;
};

MixedHTMLSanitized.story = {
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};
