import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  memo,
  cloneElement,
  CSSProperties,
} from 'react';
import es from './EventServer';
import { SubHandler, StickyProps, StickyState } from './types';

const initialState: StickyState = {
  isSticky: false,
  wasSticky: false,
  distanceFromTop: 0,
  distanceFromBottom: 0,
  calculatedHeight: 0,
  style: {},
};

function Sticky(props: StickyProps) {
  const { children, disableCompensation } = props;
  const [state, setState] = useState(initialState);
  const ref = useRef<HTMLDivElement>(null);
  const childRef = useRef<Element>(null);
  const stickyVarBox = useRef({ es, props, state });

  const handleContainerEvent: SubHandler = useCallback(
    (distanceFromTop, distanceFromBottom, eventSource) => {
      const { root } = stickyVarBox.current.es;
      if (!ref.current || !childRef.current || !root || !root.offsetParent) return;

      const {
        topOffset = 0,
        bottomOffset = 0,
        disableHardwareAcceleration,
        relative,
      } = stickyVarBox.current.props;
      let preventingStickyStateChanges = false;

      const placeholderClientRect: DOMRect = ref.current.getBoundingClientRect();
      const contentClientRect: DOMRect = childRef.current.getBoundingClientRect();
      const calculatedHeight: number = contentClientRect.height;
      let btmd: number = 0;

      if (relative) {
        preventingStickyStateChanges = eventSource !== root;
        // eslint-disable-next-line no-param-reassign
        distanceFromTop = -(eventSource.scrollTop + eventSource.offsetTop) + ref.current.offsetTop;
        btmd = root.offsetTop - root.offsetParent.scrollTop;
      }

      const bottomDifference = distanceFromBottom - bottomOffset - calculatedHeight;

      const wasSticky = !!stickyVarBox.current.state.isSticky;
      const isSticky = preventingStickyStateChanges
        ? wasSticky
        : distanceFromTop <= -topOffset && distanceFromBottom > -bottomOffset;

      if (root) {
        // eslint-disable-next-line no-param-reassign
        distanceFromBottom =
          (relative ? root.scrollHeight - root.scrollTop : distanceFromBottom) - calculatedHeight;
      }

      const style: CSSProperties = !isSticky
        ? {}
        : {
            position: 'fixed',
            top: bottomDifference > 0 ? btmd : bottomDifference,
            left: placeholderClientRect?.left,
            width: placeholderClientRect?.width,
          };

      if (!disableHardwareAcceleration) {
        style.transform = 'translateZ(0)';
      }

      setState({
        isSticky,
        wasSticky,
        distanceFromTop,
        distanceFromBottom,
        calculatedHeight,
        style,
      });
    },
    []
  );

  const { isSticky, wasSticky, distanceFromTop, distanceFromBottom, calculatedHeight, style } =
    state;

  useEffect(() => {
    const esRef = stickyVarBox.current.es;
    esRef.subscribe(handleContainerEvent);
    return () => {
      esRef.unsubscribe(handleContainerEvent);
    };
  }, [handleContainerEvent]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.paddingBottom = disableCompensation
        ? '0px'
        : `${isSticky ? calculatedHeight : 0}px`;
    }
  }, [isSticky, disableCompensation, calculatedHeight]);

  const element = cloneElement(
    children({
      isSticky,
      wasSticky,
      distanceFromTop,
      distanceFromBottom,
      calculatedHeight,
      style,
    }),
    {
      ref: childRef,
    }
  );
  return (
    <div>
      <div ref={ref} />
      {element}
    </div>
  );
}

export default memo(Sticky);
