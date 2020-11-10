import React from "react";
import {
  NavBar,
  Popover,
  Icon,
  Picker,
  List,
  Calendar,
  Button,
} from "antd-mobile";

function dt2str(dt) {
  return "" + dt.getFullYear() + dt.getMonth() + dt.getDate();
}
export default class Page2 extends React.Component {
  state = {
    client_id: 0,
    begin: dt2str(new Date()),
    end: dt2str(new Date()),
    dpShow: false,
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
        </div>
      </div>
    );
  }
}
