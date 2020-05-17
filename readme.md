# react-remark

[![CI](https://github.com/ChristianMurphy/react-remark/workflows/CI/badge.svg?branch=master)](https://github.com/ChristianMurphy/react-remark/actions?query=workflow%3ACI)

**react-remark** offers a [React hook](https://reactjs.org/docs/hooks-intro.html) and [React component](https://reactjs.org/docs/glossary.html#components) based way of rendering [markdown](https://commonmark.org/) into [React](https://reactjs.org) using [remark](https://github.com/remarkjs/remark)

## Installation

_npm_

```
npm install --save react-remark
```

_yarn_

```
yarn add react-remark
```

## Usage

### As a hook

```tsx
import React from 'react';
import { useRemark } from 'react-remark';

const ExampleComponent = () => {
  const [reactContent, setMarkdownSource] = useRemark();

  return (
    <>
      <input
        type="text"
        onChange={({ currentTarget }) => setMarkdownSource(currentTarget.value)}
      />
      {reactContent}
    </>
  );
};

export default ExampleComponent;
```

[More examples of usage as hook in storybook.](https://christianmurphy.github.io/react-remark/?path=/story/remark-hook--default)

## As a component

```tsx
import React, { useState } from 'react';
import { Remark } from 'react-remark';

const ExampleComponent = () => {
  const [markdownSource, setMarkdownSource] = useState('');

  return (
    <>
      <input
        type="text"
        onChange={({ currentTarget }) => setMarkdownSource(currentTarget.value)}
      />
      <Remark>{markdownSource}</Remark>
    </>
  );
};

export default ExampleComponent;
```

[More examples of usage as component in storybook.](https://christianmurphy.github.io/react-remark/?path=/story/remark-component--default)

## Options

- `remarkParseOptions` (Object) - configure how Markdown is parsed, same as [`remark-parse` options](https://github.com/remarkjs/remark/tree/master/packages/remark-parse#options)
- `remarkPlugins` (Array) - [remark plugins](https://github.com/remarkjs/remark/blob/master/doc/plugins.md) or [custom plugins](https://unifiedjs.com/learn/guide/create-a-plugin) to transform markdown content before it is translated to HTML (hast)
- `remarkToRehypeOptions` (Object) - configure how Markdown (mdast) is translated into HTML (hast), same as [`remark-rehype` options](https://github.com/remarkjs/remark-rehype#api)
- `rehypePlugins` (Array) - [rehype plugins](https://github.com/rehypejs/rehype/blob/master/doc/plugins.md) or [custom plugins](https://unifiedjs.com/learn/guide/create-a-plugin) to transform HTML (hast) before it is translated to React elements.
- `rehypeReactOptions` (Object) - configure how HTML (hast) is translated into React elements, same as [`rehype-react` options](https://github.com/rehypejs/rehype-react#options)
