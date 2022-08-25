import React, { useEffect, useCallback, useRef, memo, UIEvent } from 'react';
import raf from 'raf';
import es from './EventServer';
import { SubHandler } from './types';

const events: string[] = [
  'resize',
  'scroll',
  'touchstart',
  'touchmove',
  'touchend',
  'pageshow',
  'load',
];

function Container(props: { [key: string]: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const containerVarBox = useRef({
    framePending: false,
    rafHandle: null,
    es,
  });

  const notifySubscribers = useCallback((evt: UIEvent | Event): void => {
    if (!containerVarBox.current.framePending) {
      const { currentTarget } = evt;
      containerVarBox.current.rafHandle = raf(() => {
        containerVarBox.current.framePending = false;
        const node = ref.current;
        if (node) {
          const { top, bottom } = node.getBoundingClientRect();
          containerVarBox.current.es.subscribers.forEach((handler: SubHandler) =>
            handler(top, bottom, currentTarget === window ? document.body : node)
          );
        }
      });
      containerVarBox.current.framePending = true;
    }
  }, []);

  useEffect(() => {
    containerVarBox.current.es.setRoot(ref.current);
  }, []);

  useEffect(() => {
    events.forEach((event: string) => window.addEventListener(event, notifySubscribers));
    const { rafHandle } = containerVarBox.current;
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
