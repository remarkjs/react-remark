import React from 'react';
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

export const PlainMarkdown = ({content}) => (
  <Remark>
    {content}
  </Remark>
);
PlainMarkdown.args = {
  content: `# header

1. ordered
2. list

* unordered
* list`
}

export const MarkdownWithMath = ({content}) => (
  <Remark remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
    {content}
  </Remark>
);
MarkdownWithMath.args = {
  content: `Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$`
}

export const MixedHTMLSanitized = ({content}) => (
  <Remark
    remarkToRehypeOptions={{ allowDangerousHtml: true }}
    rehypePlugins={[rehypeRaw, rehypeSanitize]}
  >
    {content}
  </Remark>
);
MixedHTMLSanitized.args = {
  content: `# header

<strong>mixed</strong>
<em>with</em>
<kbd>html</kbd>
`
}
