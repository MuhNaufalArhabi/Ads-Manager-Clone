import React, { useRef, useState } from 'react';
import { Tabs } from 'antd';
const defaultPanes = new Array(3).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {
    label: `Tab ${id}`,
    children: `Content of Tab Pane ${index + 1}`,
    key: id,
  };
});

export const CustomTabs = ({table}) => {
  const [activeKey, setActiveKey] = useState(1);
  const [items, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);
  const onChange = (key) => {
    setActiveKey(key);
  };
  return (
    <div>
      <Tabs
        className='w-screen'
        onChange={onChange}
        activeKey={activeKey}
        type="card"
        items={table}
        tabBarGutter={10}
      >
      </Tabs>
    </div>
  );
};