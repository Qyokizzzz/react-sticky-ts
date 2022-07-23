import { useEffect, useCallback, useRef, memo, UIEvent } from 'react';
import raf from 'raf';
import es from './EventServer';
import { SubHandler } from './types';

const events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];

function Container(props: { [key: string]: unknown }) {
  const ref = useRef<HTMLDivElement>(null);
  const ContainerVarBox = useRef({
    framePending: false,
    rafHandle: null,
    es,
  });

  const notifySubscribers = useCallback((evt: UIEvent | Event): void => {
    if (!ContainerVarBox.current.framePending) {
      const { currentTarget } = evt;
      ContainerVarBox.current.rafHandle = raf(() => {
        ContainerVarBox.current.framePending = false;
        const node = ref.current;
        if (node) {
          const { top, bottom } = node.getBoundingClientRect();
          ContainerVarBox.current.es.subscribers.forEach((handler: SubHandler) =>
            handler(top, bottom, currentTarget === window ? document.body : node)
          );
        }
      });
      ContainerVarBox.current.framePending = true;
    }
  }, []);

  useEffect(() => {
    ContainerVarBox.current.es.setRoot(ref.current);
  }, []);

  useEffect(() => {
    events.forEach((event: string) => window.addEventListener(event, notifySubscribers));
    const { rafHandle } = ContainerVarBox.current;
    return () => {
      if (rafHandle) {
        raf.cancel(rafHandle);
      }
      events.forEach((event: string) => window.removeEventListener(event, notifySubscribers));
    };
  }, [notifySubscribers]);

  return (
    <div
      {...props}
      ref={ref}
      onScroll={notifySubscribers}
      onTouchStart={notifySubscribers}
      onTouchMove={notifySubscribers}
      onTouchEnd={notifySubscribers}
    />
  );
}

export default memo(Container);
