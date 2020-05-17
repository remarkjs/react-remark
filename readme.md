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
