import {
  useReducer,
  useRef,
  useCallback,
  useEffect,
  memo,
  cloneElement,
  CSSProperties,
} from 'react';
import es from './EventServer';
import { SubHandler, StickyProps, StickyState, ActionType, Action } from './types';

const initialState: StickyState = {
  isSticky: false,
  wasSticky: false,
  distanceFromTop: 0,
  distanceFromBottom: 0,
  calculatedHeight: 0,
  style: {},
};

function reducer(state: StickyState, action: Action) {
  switch (action.type) {
    case ActionType.ASSIGN:
      return { ...state, ...action.values };
    default:
      return state;
  }
}

function Sticky(props: StickyProps) {
  const { children, disableCompensation } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const ref = useRef<HTMLDivElement>(null);
  const childRef = useRef<Element>(null);
  const stickyVarBox = useRef({ es, props, state });

  const handleContainerEvent: SubHandler = useCallback(
    (distanceFromTop, distanceFromBottom, eventSource) => {
      const {
        topOffset = 0,
        bottomOffset = 0,
        disableHardwareAcceleration,
        relative,
      } = stickyVarBox.current.props;
      const { root } = stickyVarBox.current.es;
      let preventingStickyStateChanges = false;

      let placeholderClientRect;
      let contentClientRect;
      let calculatedHeight = 0;
      let btmd = 0;

      if (ref.current && childRef.current && root && root.offsetParent) {
        placeholderClientRect = ref.current.getBoundingClientRect();
        contentClientRect = childRef.current.getBoundingClientRect();
        calculatedHeight = contentClientRect.height;
        if (relative) {
          preventingStickyStateChanges = eventSource !== root;
          // eslint-disable-next-line no-param-reassign
          distanceFromTop =
            -(eventSource.scrollTop + eventSource.offsetTop) + ref.current.offsetTop;
          btmd = root.offsetTop - root.offsetParent.scrollTop;
        }
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

      dispatch({
        type: ActionType.ASSIGN,
        values: {
          isSticky,
          wasSticky,
          distanceFromTop,
          distanceFromBottom,
          calculatedHeight,
          style,
        },
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
