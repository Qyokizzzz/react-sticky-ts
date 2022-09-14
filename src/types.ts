import { CSSProperties } from 'react';

export interface StickyProps {
  topOffset?: number;
  bottomOffset?: number;
  relative?: boolean;
  disableCompensation?: boolean;
  disableHardwareAcceleration?: boolean;
  children(params?: StickyState): JSX.Element;
}

export interface StickyState {
  isSticky?: boolean;
  wasSticky?: boolean;
  distanceFromTop?: number;
  distanceFromBottom?: number;
  calculatedHeight?: number;
  style?: CSSProperties;
}

export type SubHandler = (
  distanceFromTop: number,
  distanceFromBottom: number,
  eventSource: HTMLElement
) => void;
