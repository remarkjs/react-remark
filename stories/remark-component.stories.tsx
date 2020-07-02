import React from 'react';
import { text } from '@storybook/addon-knobs';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import 'katex/dist/katex.min.css';

import { Remark } from '../src';

export default {
  title: 'Remark Component',
  component: Remark,
};

export const PlainMarkdown = () => (
  <Remark>
    {text(
      'content',
      `# header

1. ordered
2. list

* unordered
* list`
    )}
  </Remark>
);

export const MarkdownWithMath = () => (
  <Remark remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
    {text(
      'content',
      `Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$`
    )}
  </Remark>
);

export const MixedHTMLSanitized = () => (
  <Remark
    remarkToRehypeOptions={{ allowDangerousHtml: true }}
    rehypePlugins={[rehypeRaw, rehypeSanitize]}
  >
    {text(
      'content',
      `# header

<strong>mixed</strong>
<em>with</em>
<kbd>html</kbd>
`
    )}
  </Remark>
);

MixedHTMLSanitized.story = {
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};
