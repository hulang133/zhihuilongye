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
export default class Page2 extends React.Component {
  state = {
    client_id: 0,
    start: "20200101",
    end: dt2str(new Date()),
    dpShow: false,
    data: [],
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
    this.setState({ data });
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
          background: "#fff",
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
              <LineChart width={300} height={300} data={this.state.data}>
                <XAxis dataKey="created_at" orientation="bottom" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Legend />
                <Tooltip />
                <Line dataKey="air_humi" yAxisId="right" name="空气温度" />
                <Line dataKey="air_temp" yAxisId="left" />
              </LineChart>
            </List.Item>
            <List.Item>
              <LineChart width={300} height={300} data={this.state.data}>
                <XAxis dataKey="created_at" orientation="bottom" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Legend />
                <Tooltip />
                <Line dataKey="soil_temp" yAxisId="right" />
                <Line dataKey="soil_humi" yAxisId="left" />
              </LineChart>
            </List.Item>
            <List.Item>
              <LineChart width={300} height={300} data={this.state.data}>
                <XAxis dataKey="created_at" />
                <YAxis />
                <Legend />
                <Tooltip />
                <Line dataKey="lumen" />
              </LineChart>
            </List.Item>
            <List.Item>
              <Button type="primary" onClick={this.doexport}>
                export
              </Button>{" "}
            </List.Item>
          </List>
        </div>
      </div>
    );
  }
}
