import React, { useContext, useRef, useState } from "react";
import { Tabs } from "antd";
import { useApp } from "../hooks/useApp";
import { DefaultContext } from "../contex/appContext";

export const CustomTabs = ({ table }) => {
  const app = useApp();
  const onChange = (key) => {
    app.setActiveKeyTab(key);
    app.setCampignName('')
    app.setAdSetName('')
  };
  return (
      <div>
        <Tabs
          className="w-screen"
          onChange={onChange}
          activeKey={app.activeKeyTab}
          type="card"
          items={table}
          tabBarGutter={10}
        ></Tabs>
      </div>
  );
};
