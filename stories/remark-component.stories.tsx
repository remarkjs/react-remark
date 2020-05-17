import React from 'react';
import { text } from '@storybook/addon-knobs';
import { Remark } from '../src';

export default {
  title: 'Remark Component',
  component: Remark,
};

export const Default = () =>
  // prettier-ignore
  <Remark>
    {text("content", `# header

1. ordered
2. list

* unordered
* list

`)}
  </Remark>;