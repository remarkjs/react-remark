import { createElement } from 'react';
import type { ComponentPropsWithoutNode } from 'rehype-react';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { useRemark } from '../src';

describe('useRemark', () => {
  it('should render content', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRemark());
    act(() => {
      result.current[1]('# header');
    });
    await waitForNextUpdate();
    expect(result.current[0]).toMatchSnapshot();
  });

  it('should support gfm through remark plugins', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRemark({ remarkPlugins: [remarkGfm] })
    );
    act(() => {
      result.current[1]('https://example.com');
    });
    await waitForNextUpdate();
    expect(result.current[0]).toMatchSnapshot();
  });

  it('should support html through rehype plugins', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRemark({
        remarkToRehypeOptions: { allowDangerousHtml: true },
        rehypePlugins: [rehypeRaw, rehypeSanitize],
      })
    );
    act(() => {
      result.current[1]('<span>example</span>');
    });
    await waitForNextUpdate();
    expect(result.current[0]).toMatchSnapshot();
  });

  it('should support math through remark and rehype plugins', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRemark({
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      })
    );
    act(() => {
      result.current[1](
        'Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.'
      );
    });
    await waitForNextUpdate();
    expect(result.current[0]).toMatchSnapshot();
  });

  it('should support custom element renderer', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRemark({
        rehypeReactOptions: {
          components: {
            h1: (props: ComponentPropsWithoutNode) =>
              createElement('h2', props),
          },
        },
      })
    );
    act(() => {
      result.current[1]('# heading');
    });
    await waitForNextUpdate();
    expect(result.current[0]).toMatchSnapshot();
  });
});
