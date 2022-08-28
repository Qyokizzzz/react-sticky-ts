# react-sticky-ts

TypeScript version of react-sticky refactored with functional components and hooks.

If your React version is required, react-sticky-ts is compatible with react-sticky and it can be imported directly without code changes.

## Overview

In React.StrictMode, there will be a warning log in the browser console because of a outdated lifecycle is used in react-sticky.

For React users today, we usually build applications with functional components and hooks, and we usually use TypeScript and strict mode in our projects.

So react-sticky-ts is the better choice.

## Installation

```Shell
npm install react-sticky-ts
```

## Examples

### Basic example

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

### Using react-sticky-ts in antd

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

If the usage of react-sticky-ts makes you confusing, you can refer to the original documentation.

react-sticky: <https://github.com/captivationsoftware/react-sticky>.
