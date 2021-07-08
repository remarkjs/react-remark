# react-remark

[![CI](https://github.com/remarkjs/react-remark/workflows/CI/badge.svg?branch=main)](https://github.com/remarkjs/react-remark/actions?query=workflow%3ACI)
[![Downloads](https://img.shields.io/npm/dm/react-remark.svg)](https://www.npmjs.com/package/react-remark)
[![Size](https://img.shields.io/bundlephobia/minzip/react-remark.svg)](https://bundlephobia.com/result?p=react-remark)

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

#### Render static content

```tsx
import React, { useEffect } from 'react';
import { useRemark } from 'react-remark';

const ExampleComponent = () => {
  const [reactContent, setMarkdownSource] = useRemark();

  useEffect(() => {
    setMarkdownSource('# markdown header');
  }, []);

  return reactContent;
};

export default ExampleComponent;
```

#### Using input and events to update

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

### Server side rendering

```tsx
import React from 'react';
import { useRemarkSync } from 'react-remark';

const ExampleComponent = () => {
  const reactContent = useRemarkSync('# markdown header');

  return reactContent;
};

export default ExampleComponent;
```

:notebook: Note that some remark plugins are async, these plugins will error if used with `useRemarkSync`.

[More examples of usage as hook in storybook.](https://remarkjs.github.io/react-remark/?path=/story/remark-hook)

### As a component

#### Render static content

```tsx
import React, { useState } from 'react';
import { Remark } from 'react-remark';

const ExampleComponent = () => (
  <Remark>{`
# header

1. ordered
2. list
`}</Remark>
);

export default ExampleComponent;
```

#### Using input and events to update

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

[More examples of usage as component in storybook.](https://remarkjs.github.io/react-remark/?path=/story/remark-component)

## Examples

A set of runnable examples are provided through storybook at <https://remarkjs.github.io/react-remark>.
The source for the story files can be found in [_/stories_](./stories).

## Architecture

```
                                                             react-remark
+---------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                             |
|            +----------+        +----------------+        +---------------+       +----------------+       +--------------+                  |
|            |          |        |                |        |               |       |                |       |              |                  |
| -markdown->+  remark  +-mdast->+ remark plugins +-mdast->+ remark-rehype +-hast->+ rehype plugins +-hast->+ rehype-react +-react elements-> |
|            |          |        |                |        |               |       |                |       |              |                  |
|            +----------+        +----------------+        +---------------+       +----------------+       +--------------+                  |
|                                                                                                                                             |
+---------------------------------------------------------------------------------------------------------------------------------------------+
```

relevant links: [markdown](https://commonmark.org), [remark](https://github.com/remarkjs/remark), [mdast](https://github.com/syntax-tree/mdast), [remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md), [remark-rehype](https://github.com/remarkjs/remark-rehype), [hast](https://github.com/syntax-tree/hast), [rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md), [rehype-react](https://github.com/rehypejs/rehype-react)

## Options

- `remarkParseOptions` (Object) - configure how Markdown is parsed, same as [`remark-parse` options](https://github.com/remarkjs/remark/tree/main/packages/remark-parse#options)
- `remarkPlugins` (Array) - [remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) or [custom plugins](https://unifiedjs.com/learn/guide/create-a-plugin) to transform markdown content before it is translated to HTML (hast)
- `remarkToRehypeOptions` (Object) - configure how Markdown (mdast) is translated into HTML (hast), same as [`remark-rehype` options](https://github.com/remarkjs/remark-rehype#api)
- `rehypePlugins` (Array) - [rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md) or [custom plugins](https://unifiedjs.com/learn/guide/create-a-plugin) to transform HTML (hast) before it is translated to React elements.
- `rehypeReactOptions` (Object) - configure how HTML (hast) is translated into React elements, same as [`rehype-react` options](https://github.com/rehypejs/rehype-react#options)

### Pass options to hook

```tsx
import React, { Fragment } from 'react';
import { useRemark } from 'react-remark';
import remarkGemoji from 'remark-gemoji';
import rehypeSlug from 'rehype-slug';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';

// ...

const [reactContent, setMarkdownSource] = useRemark({
  remarkPlugins: [remarkGemoji],
  remarkToRehypeOptions: { allowDangerousHtml: true },
  rehypePlugins: [rehypeSlug, rehypeAutoLinkHeadings],
  rehypeReactOptions: {
    components: {
      p: (props) => <p className="custom-paragraph" {...props} />,
    },
  },
});
```

### Pass options to component

```tsx
import React, { Fragment } from 'react';
import { Remark } from 'react-remark';
import remarkGemoji from 'remark-gemoji';
import rehypeSlug from 'rehype-slug';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';

// ...

<Remark
  remarkPlugins={[remarkGemoji]}
  remarkToRehypeOptions={{ allowDangerousHtml: true }}
  rehypePlugins={[rehypeSlug, rehypeAutoLinkHeadings]}
  rehypeReactOptions={{
    components: {
      p: (props) => <p className="custom-paragraph" {...props} />,
    },
  }}
>
  {markdownSource}
</Remark>;
```
