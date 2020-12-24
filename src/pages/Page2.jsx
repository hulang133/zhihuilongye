import React from "react";
import * as api from "../api/index";
import {
  // NavBar,
  // Popover,
  // Icon,
  Picker,
  List,
  Calendar,
  Button,
} from "antd-mobile";
import {
  LineChart,
  XAxis,
  YAxis,
  // CartesianGrid,
  Line,
  Legend,
  Tooltip,
  // ZAxis,
} from "recharts";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function dt2str(dt) {
  return "" + dt.getFullYear() + (dt.getMonth() + 1) + dt.getDate();
}

function dt2str_without_year(dt) {
  return "" + (dt.getMonth() + 1) + dt.getDate();
}



const myDate=new Date()
myDate.setDate(myDate.getDate()-2)

export default class Page2 extends React.Component {
  state = {
    client_id: 0,
    //start: "20200101",
    start: dt2str(myDate),
    end: dt2str(new Date()),
    dpShow: false,
    data: [],
    data1: [],
  };
  pickerChane = async (value) => {
    await this.setState({ client_id: value[0] });
    this.load();
  };
  btnClick = () => {
    this.setState({ dpShow: true });
  };
  dpConfirm = async (start, end) => {
    // console.log(start);
    // console.log(end);
    start = dt2str(start);
    end = dt2str(end);
    await this.setState({ dpShow: false, start, end });
    this.load();
  };

  async componentDidMount() {
    this.load();
  }
  async load() {
    const data = await api.history(
      this.state.client_id,
      this.state.start,
      this.state.end
    );
    const data1=[];
    for(const fix of data)
    {
      
      //fix.created_at_row=fix.created_at_row.substring(4);    
      const time=new Date(fix.created_at_row.replace(" GMT",""));  
      fix.time=time.getFullYear()+"年"
      +(time.getMonth()+1)+"月"
      +time.getDate()+"日"
      +time.getHours()+":"
      +time.getMinutes()+":"
      +time.getSeconds();
      data1.push(fix);

      

    }

    this.setState({ data,data1 });

  }
  doexport = () => {
    api.doexport(this.state.client_id, this.state.start, this.state.end);
  };
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff75",
        }}

      >
        <div>
          <List renderHeader={"历史数据"}>
            <List.Item>
              <Picker
                data={[
                  { label: "device0", value: 0 },
                  { label: "device1", value: 1 },
                ]}
                cols={1}
                onChange={this.pickerChane}
              >
                <List.Item arrow="horizontal">
                  device{this.state.client_id}
                </List.Item>
              </Picker>
            </List.Item>
            <List.Item>
              <Button onClick={this.btnClick}>
                {this.state.start}-{this.state.end}
              </Button>
              <Calendar
                visible={this.state.dpShow}
                onConfirm={this.dpConfirm}
              />
            </List.Item>
            <List.Item>
              <LineChart width={400} height={300} data={this.state.data1} >
              <XAxis  interval={35} dataKey="time" orientation="bottom" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Legend />
                <Tooltip />
                <Line dataKey="air_humi" stroke="#ff7360" yAxisId="right" name="空气湿度" />
                <Line dataKey="air_temp" stroke="#00f360" yAxisId="left" name="空气温度" />
              </LineChart>
            </List.Item>
            <List.Item>
              <LineChart width={400} height={300} data={this.state.data1}>
                <XAxis interval={35} dataKey="time" orientation="bottom" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                
                <Legend />
                <Tooltip />     
                <Line dataKey="soil_temp"  stroke="#8884d8" yAxisId="right" name="土壤温度" />
                <Line dataKey="soil_humi"  stroke="#82ca9d" yAxisId="left" name="土壤湿度" />
              </LineChart>
            </List.Item>
            <List.Item>
              <LineChart width={400} height={300} data={this.state.data1}>
                <XAxis interval={35} dataKey="time" />
                <YAxis />
                <Legend />
                <Tooltip />
                <Line dataKey="lumen"  stroke="#000afd"  name="光照" />
              </LineChart>
            </List.Item>
            <List.Item>
              <Button type="primary" onClick={this.doexport}>
                数据导出
              </Button>
            </List.Item>
          </List>
        </div>
      </div>
    );
  }
}
