import { useContext, useState } from "react";
import { App as AppContainer, AutoComplete, Col, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CustomTabs } from "./component/Tabs";
import { CustomRangePicker } from "./component/RangesPicker";
import CustomTable from "./component/Table";
import RawData from "./data/csvjson.json";
import _ from "lodash";
import { Context, DefaultContext } from "./contex/appContext";
import { useApp } from "./hooks/useApp";

function App() {
  const app = useApp();
  const sumDataInsideGroup = (group) => {
    return group.reduce((acc, item) => {
      for (const key in item) {
        // if(key === 'results' && acc["campaign_name"] === "ID_Nutrilon_Client_Danone_LeadGeneration_Pregnancy_Test01"){
        //   console.log(acc['results'], acc['ad_name'])

        //   console.log(item['ad_name'])
        // }
        if (key !== "ad_name" && key !== "ad_set_name" && key !== "campaign_name") {
          // Convert values to numbers and sum them up
          if (!isNaN(item[key]) && !_.isUndefined(item[key])) {
            acc[key] = (acc[key] || 0) + parseFloat(item[key]);
          }
          if (typeof item[key] === "string") {
            acc[key] = item[key] || acc[key]
          }
        } else {
          acc[key] = item[key];
        }
      }
      return acc;
    }, {});
  };
  const dataCampign = () => {
    const data = (_.groupBy(RawData, (v) => v.campaign_name));

    // Loop through each group in your data and sum up the data inside each group
    const groupedData = _.groupBy(_.flatMap(data), "campaign_name");

    // Loop through each group in your data and sum up the data inside each group
    const result = _.map(groupedData, (group) => {
      return sumDataInsideGroup(group);
    }).filter(v => v["campaign_name"].toLowerCase().includes(app.search));
    return result;
  };

  const dataAdsSet = (campignName = '') => {
    const data = _.groupBy(RawData, (v) => v.ad_set_name);

    // Loop through each group in your data and sum up the data inside each group
    const groupedData = _.groupBy(_.flatMap(data), "ad_set_name");

    // Loop through each group in your data and sum up the data inside each group
    const result = campignName
      ? _.filter(_.map(groupedData, (group) => {
          return sumDataInsideGroup(group);
        }), (e) => e.campaign_name === campignName).filter(v => v["ad_set_name"].toLowerCase().includes(app.search))
      : _.map(groupedData, (group) => {
          return sumDataInsideGroup(group);
        }).filter(v => v["ad_set_name"].toLowerCase().includes(app.search));
    return result;
  };

  const dataAds = (adSetName) => {
    const data = _.groupBy(RawData, (v) => v.ad_name);

    // Loop through each group in your data and sum up the data inside each group
    const groupedData = _.groupBy(_.flatMap(data), "ad_name");

    // Loop through each group in your data and sum up the data inside each group
    const result = adSetName
      ? _.filter(_.map(groupedData, (group) => {
          return sumDataInsideGroup(group);
        }), (e) => e.ad_set_name === adSetName).filter(v => v["ad_name"].toLowerCase().includes(app.search))
      : _.map(groupedData, (group) => {
          return sumDataInsideGroup(group);
        }).filter(v => v["ad_name"].toLowerCase().includes(app.search));
    return result;
  };
  const columnCampign = [
    {
      title: "Campign Name",
      width: 500,
      dataIndex: "campaign_name",
      fixed: "left",
      render: (text, record) => {
        return (
          <span className="!cursor-pointer" onClick={() => {
            app.setActiveKeyTab(2)
            app.setCampignName(record.campaign_name)
            }}>
            {text}
          </span>
        );
      },
    },
    {
      title: "Results",
      dataIndex: "results",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : 0}</p>;
      },
      align: "center",
      sorter: (a, b) => a.results - b.results,
    },
    {
      title: "Results Indicator",
      dataIndex: "result_indicator",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
    },
    {
      title: "Reach",
      dataIndex: "reach",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.reach - b.reach,
    },
    {
      title: "Cost Per Results",
      dataIndex: "cost_per_results",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a.cost_per_results - b.cost_per_results,
    },
    {
      title: "Amoun Spent",
      dataIndex: "amount_spent_(usd)",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a["amount_spent_(usd)"] - b["amount_spent_(usd)"],
    },
    {
      title: "Impressions",
      dataIndex: "impressions",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.impressions - b.impressions,
    },
    {
      title: "CPM",
      dataIndex: "cpm_(cost_per_1,000_impressions)_(usd)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a["cpm_(cost_per_1,000_impressions)_(usd)"] - b["cpm_(cost_per_1,000_impressions)_(usd)"],
    },
    {
      title: "Link Click",
      dataIndex: "link_clicks",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.link_clicks - b.link_clicks,
    },
    {
      title: "CPC",
      dataIndex: "cpc_(cost_per_link_click)_(usd)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a["cpc_(cost_per_link_click)_(usd)"] - b["cpc_(cost_per_link_click)_(usd)"],
    },
    {
      title: "CTR",
      dataIndex: "ctr_(link_click-through_rate)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a["ctr_(link_click-through_rate)"] - b["ctr_(link_click-through_rate)"],
    },
    {
      title: "3 Second Video Plays",
      dataIndex: "3-second_video_plays",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a["3-second_video_plays"] - b["3-second_video_plays"],
    },
    {
      title: "Thruplays",
      dataIndex: "thruplays",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a["thruplays"] - b["thruplays"],
    },
    {
      title: "Post Engagement",
      dataIndex: "post_engagements",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a["post_engagements"] - b["post_engagements"],
    },
    {
      title: "Cost Per 2 Seconds",
      dataIndex: "cost_per_2-second_continuous_video_play_(usd)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) =>
        a["cost_per_2-second_continuous_video_play_(usd)"] - b["cost_per_2-second_continuous_video_play_(usd)"],
    },
    {
      title: "Cost Per 3 Seconds",
      dataIndex: "cost_per_3-second_video_play_(usd)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a["cost_per_3-second_video_play_(usd)"] - b["cost_per_3-second_video_play_(usd)"],
    },
    {
      title: "Reporting Starts",
      dataIndex: "reporting_starts",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.ends - b.ends,
    },
    {
      title: "Ends",
      dataIndex: "ends",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.ends - b.ends,
    },
  ];

  const columnAdsSet = [
    {
      title: "Ad Sets Name",
      width: 500,
      dataIndex: "ad_set_name",
      fixed: "left",
      render: (text, record) => {
        return (
          <span className="!cursor-pointer" onClick={() => {
            app.setActiveKeyTab(3)
            app.setAdSetName(record.ad_set_name)
            }}>
            {text}
          </span>
        );
      },
    },
    {
      title: "Results",
      dataIndex: "results",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.results - b.results,
    },
    {
      title: "Results Indicator",
      dataIndex: "result_indicator",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
    },
    {
      title: "Reach",
      dataIndex: "reach",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.reach - b.reach,
    },
    {
      title: "Cost Per Results",
      dataIndex: "cost_per_results",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a.cost_per_results - b.cost_per_results,
    },
    {
      title: "Amoun Spent",
      dataIndex: "amount_spent_(usd)",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a["amount_spent_(usd)"] - b["amount_spent_(usd)"],
    },
    {
      title: "Impressions",
      dataIndex: "impressions",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.impressions - b.impressions,
    },
    {
      title: "CPM",
      dataIndex: "cpm_(cost_per_1,000_impressions)_(usd)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a["cpm_(cost_per_1,000_impressions)_(usd)"] - b["cpm_(cost_per_1,000_impressions)_(usd)"],
    },
    {
      title: "Link Click",
      dataIndex: "link_clicks",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.link_clicks - b.link_clicks,
    },
    {
      title: "CPC",
      dataIndex: "cpc_(cost_per_link_click)_(usd)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a["cpc_(cost_per_link_click)_(usd)"] - b["cpc_(cost_per_link_click)_(usd)"],
    },
    {
      title: "CTR",
      dataIndex: "ctr_(link_click-through_rate)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a["ctr_(link_click-through_rate)"] - b["ctr_(link_click-through_rate)"],
    },
    {
      title: "3 Second Video Plays",
      dataIndex: "3-second_video_plays",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a["3-second_video_plays"] - b["3-second_video_plays"],
    },
    {
      title: "Thruplays",
      dataIndex: "thruplays",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a["thruplays"] - b["thruplays"],
    },
    {
      title: "Post Engagement",
      dataIndex: "post_engagements",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a["post_engagements"] - b["post_engagements"],
    },
    {
      title: "Cost Per 2 Seconds",
      dataIndex: "cost_per_2-second_continuous_video_play_(usd)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) =>
        a["cost_per_2-second_continuous_video_play_(usd)"] - b["cost_per_2-second_continuous_video_play_(usd)"],
    },
    {
      title: "Cost Per 3 Seconds",
      dataIndex: "cost_per_3-second_video_play_(usd)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a["cost_per_3-second_video_play_(usd)"] - b["cost_per_3-second_video_play_(usd)"],
    },
    {
      title: "Reporting Starts",
      dataIndex: "reporting_starts",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.ends - b.ends,
    },
    {
      title: "Ends",
      dataIndex: "ends",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.ends - b.ends,
    },
  ];

  const columnAds = [
    {
      title: "Ad name",
      width: 500,
      dataIndex: "ad_name",
      fixed: "left",
    },
    {
      title: "Results",
      dataIndex: "results",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.results - b.results,
    },
    {
      title: "Results Indicator",
      dataIndex: "result_indicator",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
    },
    {
      title: "Reach",
      dataIndex: "reach",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.reach - b.reach,
    },
    {
      title: "Cost Per Results",
      dataIndex: "cost_per_results",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a.cost_per_results - b.cost_per_results,
    },
    {
      title: "Amoun Spent",
      dataIndex: "amount_spent_(usd)",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a["amount_spent_(usd)"] - b["amount_spent_(usd)"],
    },
    {
      title: "Impressions",
      dataIndex: "impressions",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.impressions - b.impressions,
    },
    {
      title: "CPM",
      dataIndex: "cpm_(cost_per_1,000_impressions)_(usd)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a["cpm_(cost_per_1,000_impressions)_(usd)"] - b["cpm_(cost_per_1,000_impressions)_(usd)"],
    },
    {
      title: "Link Click",
      dataIndex: "link_clicks",
      render: (text) => {
        return <p>{text ? new Intl.NumberFormat("id-ID").format(text) : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.link_clicks - b.link_clicks,
    },
    {
      title: "CPC",
      dataIndex: "cpc_(cost_per_link_click)_(usd)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a["cpc_(cost_per_link_click)_(usd)"] - b["cpc_(cost_per_link_click)_(usd)"],
    },
    {
      title: "CTR",
      dataIndex: "ctr_(link_click-through_rate)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a["ctr_(link_click-through_rate)"] - b["ctr_(link_click-through_rate)"],
    },
    {
      title: "3 Second Video Plays",
      dataIndex: "3-second_video_plays",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a["3-second_video_plays"] - b["3-second_video_plays"],
    },
    {
      title: "Thruplays",
      dataIndex: "thruplays",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a["thruplays"] - b["thruplays"],
    },
    {
      title: "Post Engagement",
      dataIndex: "post_engagements",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a["post_engagements"] - b["post_engagements"],
    },
    {
      title: "Cost Per 2 Seconds",
      dataIndex: "cost_per_2-second_continuous_video_play_(usd)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) =>
        a["cost_per_2-second_continuous_video_play_(usd)"] - b["cost_per_2-second_continuous_video_play_(usd)"],
    },
    {
      title: "Cost Per 3 Seconds",
      dataIndex: "cost_per_3-second_video_play_(usd)",
      render: (text) => {
        return <p>${Number(text.toString().slice(0, 5))}</p>;
      },
      align: "center",
      sorter: (a, b) => a["cost_per_3-second_video_play_(usd)"] - b["cost_per_3-second_video_play_(usd)"],
    },
    {
      title: "Reporting Starts",
      dataIndex: "reporting_starts",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.ends - b.ends,
    },
    {
      title: "Ends",
      dataIndex: "ends",
      render: (text) => {
        return <p>{text ? text : "-"}</p>;
      },
      align: "center",
      sorter: (a, b) => a.ends - b.ends,
    },
  ];
  const table = [
    {
      key: 1,
      children: <CustomTable key={1} columnTable={columnCampign} dataTable={dataCampign()} />,
      label: "Campign",
    },
    {
      key: 2,
      children: <CustomTable key={2} columnTable={columnAdsSet} dataTable={dataAdsSet(app.campignName)} />,
      label: "Ads set",
    },
    {
      key: 3,
      children: <CustomTable key={3} columnTable={columnAds} dataTable={dataAds(app.adSetName)} />,
      label: "Ads",
    },
  ];

  return (
    <AppContainer>
      <div className="w-screen h-screen p-[10px] bg-[#f3f4f4] overflow-x-hidden">
        <Row gutter={24}>
          <Col span={18}>
            <AutoComplete placeholder="Search and filter" suffixIcon={<SearchOutlined />} className="w-full" value={app.search} onChange={(e) => app.setSearch(e)}/>
          </Col>
          <Col span={6}>
            <CustomRangePicker onChange={(e) => console.log(dayjs(e[0]).format("YYYY-MM-DD"), dayjs(e[1]).format("YYYY-MM-DD"))}/>
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
