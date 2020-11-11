import React from "react";
import { TabBar } from "antd-mobile";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";

export default class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "env",
      hidden: false,
      fullScreen: false,
    };
  }

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          <TabBar.Item
            title="环境"
            key="env"
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat",
                }}
              />
            }
            selected={this.state.selectedTab === "env"}
            onPress={() => {
              this.setState({
                selectedTab: "env",
              });
            }}
          >
            <Page1 />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat",
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat",
                }}
              />
            }
            title="数据"
            key="data"
            selected={this.state.selectedTab === "data"}
            onPress={() => {
              this.setState({
                selectedTab: "data",
              });
            }}
            data-seed="logId1"
          >
            <Page2 />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat",
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat",
                }}
              />
            }
            title="视频"
            key="video"
            selected={this.state.selectedTab === "video"}
            onPress={() => {
              this.setState({
                selectedTab: "video",
              });
            }}
          >
            <Page3 />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
