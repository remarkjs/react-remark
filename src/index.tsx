import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect,
  useCallback,
} from 'react';
import unified, { PluggableList } from 'unified';
import remarkParse, { RemarkParseOptions } from 'remark-parse';
// @ts-ignore
import remarkToRehype from 'remark-rehype';
// @ts-ignore
import rehypeReact from 'rehype-react';

export interface UseRemarkOptions {
  remarkParseOptions?: Partial<RemarkParseOptions>;
  // TODO: Pending https://github.com/remarkjs/remark-rehype/pull/13
  remarkToRehypeOptions?: {};
  // TODO: Pending
  rehypeReactOptions?: {};
  remarkPlugins?: PluggableList;
  rehypePlugins?: PluggableList;
  onError?: (err: Error) => void;
}

export const useRemark = ({
  remarkParseOptions,
  remarkToRehypeOptions,
  rehypeReactOptions = { createElement: React.createElement },
  remarkPlugins = [],
  rehypePlugins = [],
  onError = () => {},
}: UseRemarkOptions = {}): [ReactElement | null, (source: string) => void] => {
  const [reactContent, setReactContent] = useState<ReactElement | null>(null);

  const setMarkdownSource = useCallback((source: string) => {
    unified()
      .use(remarkParse, remarkParseOptions)
      .use(remarkPlugins)
      .use(remarkToRehype, remarkToRehypeOptions)
      .use(rehypePlugins)
      .use(rehypeReact, rehypeReactOptions)
      .process(source)
      // @ts-ignore pending https://github.com/vfile/vfile/pull/53
      .then(vfile => setReactContent(vfile.result))
      .catch(onError);
  }, []);

  return [reactContent, setMarkdownSource];
};

export interface RemarkProps extends UseRemarkOptions {
  children: string;
}

export const Remark: FunctionComponent<RemarkProps> = ({
  children,
  ...useRemarkOptions
}: RemarkProps) => {
  const [reactContent, setMarkdownSource] = useMarkdown(useRemarkOptions);

  useEffect(() => {
    setMarkdownSource(children);
  }, [children, setMarkdownSource]);

  return reactContent;
};
