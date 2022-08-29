# react-sticky-ts

react-sticky-ts是react-sticky的ts版本。

如果react版本支持hooks，react-sticky-ts是可用的。

react-sticky-ts可以直接将项目中引入的react-sticky替换，不需要改其他代码，它们是完全兼容的。

## 概述

react-sticky-ts的目的是：在开启React.StrictMode时，解决浏览器控制台中的警告信息。

原因是react-sticky中使用了过时的生命周期，而react-sticky-ts是用函数组件和hooks编写的。

此外，react-sticky是纯js库，没有类型声明，这对于ts项目而言并不是最友好。

## 安装

```Shell
npm install react-sticky-ts
```

## 示例

### 基本示例

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

### 在antd中使用react-sticky-ts

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

react-sticky-ts与react-sticky完全兼容，使用方式也完全一致，区别仅是实现细节，如果react-sticky-ts的用法描述得不够清晰，请参考原文档。

react-sticky: <https://github.com/captivationsoftware/react-sticky>.
