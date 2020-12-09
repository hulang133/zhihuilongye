import React from "react";
import * as api from "../api/index.js";
import { NavBar, List, Popover, Icon, Switch, Slider } from "antd-mobile";

const Item = List.Item;
export default class Page1 extends React.Component {
  state = {
    popoverVisible: false,
    client_id: 0,
    client_key: 0,
    auto_modify: false,
    data_obj: {},
    min_humi: 0,
    max_humi: 100,
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
      this.setState({ client_key: data_obj.client_key });
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
          renderHeader={() => `设备${this.state.client_id}`}
          style={{
            width: this.state.data_obj ? 200 : 300,
            boxShadow: "0 0 20px #ddd",
            margin: 20,
            textAlign: "center"
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
              <Item
                extra={this.state.max_humi}
                style={{ display: this.state.auto_modify ? "" : "none" }}
              >
                <p>最高值</p>
                <Slider
                  value={this.state.max_humi}
                  onChange={this.maxHumiChange}
                  onAfterChange={this.switchChangeAfter}
                />
              </Item>
            </>
          ) : (
              <Item>没有数据,可能设备已掉线</Item>
            )}
        </List>

        <div
        style={{
          width:165,
          height:82,
          borderRadius:"5px",
          //border:"white solid 4px",
          

        }}
        >
          <div style={{
           
             background:"#fff",
             borderRadius:"10",
             textAlign:"center",
             fontSize: "20px",
             verticalAlign:"top",
             height:30,
             padding:"5px",
             position:"relative",
             paddingLeft:"20px",
             color: "#605c5c",
             borderRadius:"5px",
          
          }}  >
            <img 
              style={{
                  
                  position:"absolute",
                  left:"15px",  
                  top:"-2px",
                           
                
                }}
            
            src={require("../images/guangzhao.png").default} alt=""/>
            
              光照强度
            
            
          </div>
          <div  
                style={{
                 border:"3px #fff solid",
                 textAlign:"center",
                 color: "#605c5c",
                 fontSize: "20px",
                 borderRadius:"5px",
                   
                }}
               
            >
               {this.state.data_obj.lumen} <span style={{

                 display:"inline-block",
                 width:10,
                 textAlign:"center"
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
