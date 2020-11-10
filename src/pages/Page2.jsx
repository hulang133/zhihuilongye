import React from "react";
import * as api from "../api/index";
import {
  NavBar,
  Popover,
  Icon,
  Picker,
  List,
  Calendar,
  Button,
} from "antd-mobile";
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";

function dt2str(dt) {
  return "" + dt.getFullYear() + (dt.getMonth() + 1) + dt.getDate();
}
export default class Page2 extends React.Component {
  state = {
    client_id: 0,
    begin: dt2str(new Date()),
    end: dt2str(new Date()),
    dpShow: false,
    data: [
      { uv: 100, pv: 20 },
      { uv: 33, pv: 20 },
      { uv: 100, pv: 20 },
      { uv: 100, pv: 20 },
      { uv: 100, pv: 20 },
    ],
  };
  pickerChane = (value) => {
    console.log(value);
  };
  btnClick = () => {
    this.setState({ dpShow: true });
  };
  dpConfirm = (begin, end) => {
    // console.log(begin);
    // console.log(end);
    begin = dt2str(begin);
    end = dt2str(end);
    this.setState({ dpShow: false, begin, end });
  };

  async componentDidMount() {
    const data = await api.history(
      this.state.client_id,
      this.state.begin,
      this.state.end
    );
    console.log(data);
  }
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
          <Picker
            data={[
              { label: "device0", value: 0 },
              { label: "device1", value: 1 },
            ]}
            cols={1}
            onChange={this.pickerChane}
          >
            <List.Item arrow="horizontal">device0</List.Item>
          </Picker>
          <Button onClick={this.btnClick}>
            {this.state.begin}-{this.state.end}
          </Button>
          <Calendar visible={this.state.dpShow} onConfirm={this.dpConfirm} />
          <LineChart width={500} height={300} data={this.state.data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    );
  }
}
