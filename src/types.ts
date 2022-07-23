import { CSSProperties } from 'react';

export type SubHandler = (
  distanceFromTop: number,
  distanceFromBottom: number,
  eventSource: HTMLElement
) => void;

export interface StickyProps {
  topOffset?: number;
  bottomOffset?: number;
  relative?: boolean;
  disableCompensation?: boolean;
  disableHardwareAcceleration?: boolean;
  children: Function;
}

export interface StickyState {
  isSticky: boolean;
  wasSticky: boolean;
  distanceFromTop: number;
  distanceFromBottom: number;
  calculatedHeight: number;
  style: CSSProperties;
}

export enum ActionType {
  ASSIGN = 'assign',
}

export interface Action {
  type: ActionType;
  values: Object;
}
