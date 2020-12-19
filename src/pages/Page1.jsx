import React from "react";
import * as api from "../api/index.js";
import { NavBar, List, Popover, Icon, Switch, Slider } from "antd-mobile";
import { logDOM } from "@testing-library/react";

const Item = List.Item;


const Logo = function ({ click }) {
  return <img src={require("../images/jiahao.png").default}
    style={{

      width: "30px",
      position: "absolute",
      left: "1%",
      top: "1%",

    }}
    onClick={click}
    alt="" />
}

const Water_on = function ({ click }) {
  return <div style={{
    background: "rgb(122 191 219)",
    textAlign: "center",
    fontSize: "20px",
    verticalAlign: "top",
    //height: "20px",
    width: "100px",
    padding: "3px",  //内边距
    position: "absolute",
    top: "450px",
    left: "285px",
    //paddingLeft: "20px",
    color: "rgb(0 0 0);",
    borderRadius: "5px",
    border: "3px white solid",
    boxShadow: "0 0 20px #ddd",
  }}
    onClick={click}
    alt="" >
    浇水
  </div>
}

const Water_off = function ({ click ,text,top="650px",left="285px"}) {
  return <div style={{
    background: "rgb(122 191 219)",
    textAlign: "center",
    fontSize: "20px",
    verticalAlign: "top",
    //height: "20px",
    width: "100px",
    padding: "3px",  //内边距
    position: "absolute",
    top,
    left,
    //paddingLeft: "20px",
    color: "rgb(0 0 0);",
    borderRadius: "5px",
    border: "3px white solid",
    boxShadow: "0 0 20px #ddd",
  }}
    onClick={click}
    alt="" >
    {text}
    
  </div>
}


export default class Page1 extends React.Component {
  state = {
    popoverVisible: false,
    client_id: 0,
    client_key: 0,
    auto_modify: false,
    data_obj: {},
    min_humi: 0,
    max_humi: 100,
    show_switcher: false,
    show_water: true,
  };

  async componentDidMount() {
    this.load(true);
    setInterval(this.load, 3000);
  }
  load = async (needUpdateClientKey = false) => {
    const data_obj = await api.data(this.state.client_id);
    // if (!data_obj) {
    //   return;
    // }
    this.setState({ data_obj });
    if (needUpdateClientKey && data_obj) {
      this.setState({ client_key: data_obj.client_key ,show_water:data_obj.client_key==1?true:false});
    
    }
  };
  minHumiChange = (value) => {
    this.setState({ min_humi: value });
  };
  maxHumiChange = (value) => {
    this.setState({ max_humi: value });
  };
  autoModifyChange = (value) => {
    this.setState({ auto_modify: value });
    this.switchChangeAfter();
  };
  switchChangeAfter = () => {
    api.switches({
      client_id: this.state.client_id,
      status: 3,
      min_humi: this.state.min_humi,
      max_humi: this.state.max_humi,
    });
  };
  switchChange = (value) => {
    this.setState({ client_key: value ? 1 : 0 });
    api.switches({
      client_id: this.state.client_id,
      status: value ? 1 : 0,
      min_humi: 0,
      max_humi: 100,
    });
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          //backgroundColor: "##ffffff52", //  改了backg没得反应
        }}
        className="page1"
      // onClick={()=>{
      //   this.setState({show_switcher:false})
      // }}
      >
        <NavBar
          style={{
            //width: "100%",
            //height: "100%",
            backgroundColor: "#ffffff52", //  改了backg没得反应
          }}
          mode="light"
          rightContent={
            <Popover
              mask
              visible={this.state.popoverVisible}
              overlay={[
                <Popover.Item key="0" value="0">
                  device0
                </Popover.Item>,
                <Popover.Item key="1" value="1">
                  device1
                </Popover.Item>,
              ]}
              onSelect={({ key }) => {
                this.setState({
                  popoverVisible: false,
                  client_id: key,
                });
                this.load();
              }}
            >
              <Icon type="ellipsis" />
            </Popover>
          }
        >
          设备{this.state.client_id}
        </NavBar>
        <List
          renderHeader={() =>
            <span
              style={{
                color: "rgb(0 0 0)",
                fontSize: "24px",
              }}
            >设备{this.state.client_id}</span>}

          style={{
            background: "rgb(182 206 216 / 88%)",
            position: "absolute",
            top: "465px", //535
            left: "1px", //34
            overflow: "hidden",
            borderRadius: "10px",
            width: this.state.data_obj ? 200 : 300,
            boxShadow: "0 0 20px #ddd",
            border: "3px  white solid",
            margin: 20,
            textAlign: "center",
            opacity: this.state.show_switcher ? 1 : 0,
          }}
        >
          {this.state.data_obj ? (
            <>
              {/* <Item>空气温度 {this.state.data_obj.air_temp}C</Item>
              <Item>空气湿度 {this.state.data_obj.air_humi}%</Item>
              <Item>光照强度 {this.state.data_obj.lumen}</Item>
              <Item>土壤温度 {this.state.data_obj.soil_temp}C</Item>
              <Item>土壤湿度 {this.state.data_obj.soil_humi}%</Item> */}
              <Item
                extra={
                  <Switch
                    checked={this.state.auto_modify}
                    onChange={this.autoModifyChange}
                  />
                }
              >
                自动调节
              </Item>
              <Item
                style={{ display: this.state.auto_modify ? "none" : "" }}
                extra={
                  <Switch
                    checked={this.state.client_key == 1}
                    onChange={this.switchChange}
                  />
                }
              >
                浇水
              </Item>
              <Item
                extra={this.state.min_humi}
                style={{ display: this.state.auto_modify ? "" : "none" }}
              >
                <p>最低值</p>
                <Slider
                  value={this.state.min_humi}
                  onChange={this.minHumiChange}
                  onAfterChange={this.switchChangeAfter}
                />
              </Item>
              {/* <Item
                extra={this.state.max_humi}
                style={{ display: this.state.auto_modify ? "" : "none" }}
              >
                <p>最高值</p>
                <Slider
                  value={this.state.max_humi}
                  onChange={this.maxHumiChange}
                  onAfterChange={this.switchChangeAfter}
                />
              </Item> */}
            </>
          ) : (
              <Item>没有数据,可能设备已掉线</Item>
            )}
        </List>

        <div>
          <Logo click={() => {
            this.setState({
              show_switcher: !this.state.show_switcher
            })
          }} />
        </div>

        <img src={require("../images/bujiaoshui.png").default}
          style={{
            position: "absolute",
            top: "530px", //535
            left: "262px", //34
            width: "115px",
            textAlign: "center",
            opacity: this.state.show_water ? 1 : 0,
          }}
        />

        <img src={require("../images/jiaoshui.png").default}
          style={{
            position: "absolute",
            top: "530px", //535
            left: "250px", //34
            width: "135px",
            textAlign: "center",
            opacity: this.state.show_water ? 0 : 1,
          }}
        />

        <div>
          <Water_on click={() => {
            this.setState({
              show_water: !this.state.show_water
            })
            api.switches({
              client_id: this.state.client_id,
              status: 1,
              min_humi: 0,
              max_humi: 100,
            });

          }} />
        </div>

        <div>
          <Water_off click={() => {
            this.setState({
              show_water: !this.state.show_water
            })
            api.switches({
              client_id: this.state.client_id,
              status: 0,
              min_humi: 0,
              max_humi: 100,
            });
  
          }} 
          text="不浇水"/>
        </div>

        <div
          style={{
            width: 165,
            height: 82,
            borderRadius: "5px",
            //border:"white solid 4px",
            position: "absolute",
            left: "15px",
            top: "200px",
          }}
        >

          <div style={{
            background: "#fff",
            borderRadius: "10",
            textAlign: "center",
            fontSize: "20px",
            verticalAlign: "top",
            height: 30,
            padding: "5px",
            position: "relative",
            paddingLeft: "20px",
            color: "#605c5c",
            borderRadius: "5px",
            boxShadow: "0 0 20px #ddd",
          }}  >
            <img
              style={{
                position: "absolute",
                left: "15px",
                top: "-2px",
              }}
              src={require("../images/guangzhao.png").default} alt="" />
              光照强度
          </div>

          <div style={{
            border: "3px #fff solid",
            textAlign: "center",
            color: "#605c5c",
            fontSize: "20px",
            borderRadius: "5px",
          }}
          >
            {this.state.data_obj.lumen} <span style={{
              display: "inline-block",
              width: 10,
              textAlign: "center"
            }}>
            </span> Lux
            </div>
        </div>

        <div
          style={{
            color: "#605c5c",
          }}
          className="air_temp"
        >
          空气温度 {this.state.data_obj.air_temp}C
        </div>

        <div
          style={{
            //width: "100%",
            //height: "100%",
            //backgroundColor: "##ffffff52", //  改了backg没得反应
            //textAlign: "center"
            color: "#605c5c",
          }}
          className="air_humi"
        >
          空气湿度 {this.state.data_obj.air_humi}%

        </div>

        <div
          style={{
            color: "rgb(242 235 235)",
          }}
          className="soil_temp"
        >
          土壤温度 {this.state.data_obj.soil_temp}C
        </div>

        <div
          style={{
            color: "rgb(242 235 235)",
          }}
          className="soil_humi"
        >
          土壤湿度 {this.state.data_obj.soil_humi}%
        </div>


      </div>
    );
  }
}
