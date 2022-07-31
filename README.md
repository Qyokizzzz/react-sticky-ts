# react-sticky-ts

The TypeScript version of react-sticky, using functional component and hooks refactor.

If your React version is required, react-sticky-ts is compatible with react-sticky and it can be imported directly without code changes.

react-sticky: <https://github.com/captivationsoftware/react-sticky>.

## Purpose

In React.StrictMode, the browser console will sends a warning message because of the outdated life cycle is used in react-sticky.

For today's React users, we usually use functional component and hooks to build applications, and using TypeScript and strict mode in our project.

## Installation

```Shell
npm install react-sticky-ts
```

## Sticky Component's interfaces

```TypeScript
// Sticky's props
interface StickyProps {
  topOffset?: number;
  bottomOffset?: number;
  relative?: boolean;
  disableCompensation?: boolean;
  disableHardwareAcceleration?: boolean;
  children: Function;
}

// Sticky's state, it's used for sticky's props.children.
interface StickyState {
  isSticky: boolean;
  wasSticky: boolean;
  distanceFromTop: number;
  distanceFromBottom: number;
  calculatedHeight: number;
  style: CSSProperties;
}
```

## examples

Basic example:

```jsx
import React, { CSSProperties } from 'react';
import { StickyContainer, Sticky } from 'react-sticky-ts';

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

```jsx
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
      <DefaultTabBar {...props} style={{ ...stickyTabBarStyle, ...style }} key="1" />
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
