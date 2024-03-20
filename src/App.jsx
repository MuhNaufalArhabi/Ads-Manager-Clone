import { useState } from "react";
import { App as AppContainer, AutoComplete, Col, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CustomTabs } from "./component/Tabs";
import { CustomRangePicker } from "./component/RangesPicker";
import CustomTable from "./component/Table";
import RawData from "./data/csvjson.json";

const columnCampign = [
  {
    title: "Campign Name",
    width: 500,
    dataIndex: "campaign_name",
    fixed: "left",
  },
  {
    title: "Results",
    dataIndex: "results",
    render: (text) => {
      return <p>{text ? text : "-"}</p>;
    },
    align: "center",
    sorter: (a, b) => a.results - b.results,
  },
  {
    title: "Reach",
    dataIndex: "reach",
    render: (text) => {
      return <p>{text ? text : "-"}</p>;
    },
    align: "center",
    sorter: (a,b) => a.reach - b.reach
  },
  {
    title: "Cost Per Results",
    dataIndex: "cost_per_results",
    render: (text) => {
      return <p>${Number(text.toString().slice(0, 5))}</p>;
    },
    align: "center",
    sorter: (a,b) => a.cost_per_results - b.cost_per_results
  },
  {
    title: "Amoun Spent",
    dataIndex: "amount_spent_(usd)",
    render: (text) => {
      return <p>${text ?? "-"}</p>;
    },
    align: "center",
    sorter: (a,b) => a["amount_spent_(usd)"] - b["amount_spent_(usd)"]

  },
  {
    title: "Ends",
    dataIndex: "ends",
    render: (text) => {
      return <p>{text ? text : "-"}</p>;
    },
    align: "center",
    sorter: (a,b) => a.ends - b.ends
  },
  {
    title: "Impressions",
    dataIndex: "impressions",
    render: (text) => {
      return <p>{text ? text : "-"}</p>;
    },
    align: "center",
    sorter: (a,b) => a.impressions - b.impressions
  },
  {
    title: "CPM",
    dataIndex: "cpm_(cost_per_1,000_impressions)_(usd)",
    render: (text) => {
      return <p>${Number(text.toString().slice(0, 5))}</p>;
    },
    align: "center",
    sorter: (a,b) => a["cpm_(cost_per_1,000_impressions)_(usd)"] - b["cpm_(cost_per_1,000_impressions)_(usd)"]

  },
  {
    title: "Link Click",
    dataIndex: "link_clicks",
    render: (text) => {
      return <p>{text ? text : "-"}</p>;
    },
    align: "center",
    sorter: (a,b) => a.link_clicks - b.link_clicks

  },
  {
    title: "CPC",
    dataIndex: "cpc_(cost_per_link_click)_(usd)",
    render: (text) => {
      return <p>${Number(text.toString().slice(0, 5))}</p>;
    },
    align: "center",
    sorter: (a,b) => a["cpc_(cost_per_link_click)_(usd)"] - b["cpc_(cost_per_link_click)_(usd)"]

  },
  {
    title: "CTR",
    dataIndex: "ctr_(link_click-through_rate)",
    render: (text) => {
      return <p>${Number(text.toString().slice(0, 5))}</p>;
    },
    align: "center",
    sorter: (a,b) => a["ctr_(link_click-through_rate)"] - b["ctr_(link_click-through_rate)"]

  },
  {
    title: "3 Second Video Plays",
    dataIndex: "3-second_video_plays",
    render: (text) => {
      return <p>{text ? text : "-"}</p>;
    },
    align: "center",
    sorter: (a,b) => a["3-second_video_plays"] - b["3-second_video_plays"]

  },
  {
    title: "Thruplays",
    dataIndex: "thruplays",
    render: (text) => {
      return <p>{text ? text : "-"}</p>;
    },
    align: "center",
    sorter: (a,b) => a["thruplays"] - b["thruplays"]
    
  },
  {
    title: "Post Engagement",
    dataIndex: "post_engagements",
    render: (text) => {
      return <p>{text ? text : "-"}</p>;
    },
    align: "center",
    sorter: (a,b) => a["post_engagements"] - b["post_engagements"]

  },
  {
    title: "Cost Per 2 Seconds",
    dataIndex: "cost_per_2-second_continuous_video_play_(usd)",
    render: (text) => {
      return <p>${Number(text.toString().slice(0, 5))}</p>;
    },
    align: "center",
    sorter: (a,b) => a["cost_per_2-second_continuous_video_play_(usd)"] - b["cost_per_2-second_continuous_video_play_(usd)"]

  },
  {
    title: "Cost Per 3 Seconds",
    dataIndex: "cost_per_3-second_video_play_(usd)",
    render: (text) => {
      return <p>${Number(text.toString().slice(0, 5))}</p>;
    },
    align: "center",
    sorter: (a,b) => a["cost_per_3-second_video_play_(usd)"] - b["cost_per_3-second_video_play_(usd)"]

  },
];

function App() {
  const [count, setCount] = useState(0);
  const table = [
    {
      key: 1,
      children: <CustomTable columnTable={columnCampign} dataTable={RawData} />,
      label: "Campign",
    },
    {
      key: 2,
      children: <CustomTable />,
      label: "Ads set",
    },
    {
      key: 3,
      children: <CustomTable />,
      label: "Ads",
    },
  ];

  return (
    <AppContainer>
      <div className="w-screen h-screen p-[10px] bg-[#f3f4f4] overflow-x-hidden">
        <Row gutter={24}>
          <Col span={18}>
            <AutoComplete placeholder="Search and filter" suffixIcon={<SearchOutlined />} className="w-full" />
          </Col>
          <Col span={6}>
            <CustomRangePicker />
          </Col>
          <Row gutter={24} className="py-[20px]">
            <CustomTabs table={table} />
          </Row>
        </Row>
      </div>
    </AppContainer>
  );
}

export default App;
