# react-sticky-ts

The TypeScript version of react-sticky, using function components and hooks refactor.

If the react version is required, react-sticky-ts is compatible with react-sticky and it can be imported directly without code changes.

react-sticky: <https://github.com/captivationsoftware/react-sticky>.

## Installation

```Shell
npm install react-sticky-ts
```

## Overview

In react strict mode, the browser console will send a warning message because of the outdated life cycle is used in react-sticky.

Today, we usually use functional components with react hooks to build applications, and we prefer to use strict mode and TypeScript. So I used the popular technology to refactor the react-sticky.

## examples

Basic example with interfaces:

```tsx
import React, { CSSProperties } from 'react';
import { StickyContainer, Sticky } from 'react-sticky-ts';

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

function App() {
  return (
    <StickyContainer>
      <Sticky topOffset={80}>
        {(props: StickyState) => (
          <header style={props.style}>
            {/* ... */}
          </header>
        )}
      </Sticky>
    </StickyContainer>
  );
}
```

Using react-sticky-ts in antd:

```tsx
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { HomeOutlined, TeamOutlined, StarOutlined } from '@ant-design/icons';
import { StickyContainer, Sticky } from 'react-sticky-ts';

const { TabPane } = Tabs;
const OperationsSlot = {
  left: <LeftExtraAction />,
  right: <RightExtraAction />,
};

const tabIcon = {
  margin: 'auto',
  fontSize: '20px',
};

const stickyTabBarStyle = {
  zIndex: 1,
  background: '#fff',
};

const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }: TabsProps) => (
      <DefaultTabBar {...props} style={{ ...stickyTabBarStyle, ...style }} />
    )}
  </Sticky>
);

function App() {
  return (
    <StickyContainer>
      <Tabs tabBarExtraContent={OperationsSlot} renderTabBar={renderTabBar} size="large" centered>
        <TabPane tab={<HomeOutlined style={tabIcon} />} key="1">
          Content of tab 1
        </TabPane>
        <TabPane tab={<TeamOutlined style={tabIcon} />} key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab={<StarOutlined style={tabIcon} />} key="3">
          Content of tab 3
        </TabPane>
      </Tabs>
    </StickyContainer>
  );
}

export default App;
```
