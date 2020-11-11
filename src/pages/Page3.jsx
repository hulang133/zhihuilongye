import { List, Picker } from "antd-mobile";
import React from "react";

export default class Page3 extends React.Component {
  state = {
    client_id: 0,
  };
  onchange = (key) => (value) => {
    this.setState({ [key]: value });
  };
  render() {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "#fff",
        }}
      >
        <List>
          <List.Item>
            <Picker
              data={[
                { label: "device0", value: 0 },
                { label: "device1", value: 1 },
              ]}
              cols={1}
              onChange={(value) => this.onchange("client_id")(value[0])}
            >
              <List.Item>device{this.state.client_id}</List.Item>
            </Picker>
          </List.Item>
          <List.Item>
            <video src="" controls style={{ width: "100%" }} />
          </List.Item>
        </List>
      </div>
    );
  }
}
