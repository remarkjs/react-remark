

import { useEffect } from 'react';
import { text } from '@storybook/addon-knobs';
import { useRemark } from '../src';

export default {
  title: 'Remark Hook',
  component: useRemark
};

export const Default = () => {
  const [reactContent, setMarkdownSource] = useRemark();
  const markdownSource = text('markdown', '# header\n* list');

  useEffect(() => {
    setMarkdownSource(markdownSource);
  }, [markdownSource]);

  return reactContent;
};