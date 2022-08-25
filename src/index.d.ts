import { CSSProperties } from 'react';

export = ReactSticky;
export as namespace ReactSticky;

declare namespace ReactSticky {

  function StickyContainer(props: { [key: string]: any }): JSX.Element;
  function Sticky(props: StickyProps): JSX.Element;

  interface StickyProps {
    topOffset?: number;
    bottomOffset?: number;
    relative?: boolean;
    disableCompensation?: boolean;
    disableHardwareAcceleration?: boolean;
    children: Function;
  }
  interface StickyState {
    isSticky: boolean;
    wasSticky: boolean;
    distanceFromTop: number;
    distanceFromBottom: number;
    calculatedHeight: number;
    style: CSSProperties;
  }

  type SubHandler = (
    distanceFromTop: number,
    distanceFromBottom: number,
    eventSource: HTMLElement
  ) => void;
  
  enum ActionType {
    ASSIGN = 'assign',
  }
  interface Action {
    type: ActionType;
    values: Object;
  }
}
