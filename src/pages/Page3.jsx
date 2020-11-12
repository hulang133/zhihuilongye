import { List, Picker } from "antd-mobile";
import React from "react";
import * as api from "../api/index.js";

export default class Page3 extends React.Component {
  state = {
    client_id: 0,
    data: [],
  };
  onchange = (key) => (value) => {
    this.setState({ [key]: value });
  };

  async componentDidMount() {
    const data = await api.videoList();
    console.log(data);
    this.setState({ data });
  }
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
                { label: "video 0", value: 0 },
                { label: "video 1", value: 1 },
              ]}
              cols={1}
              onChange={(value) => this.onchange("client_id")(value[0])}
            >
              <List.Item>video {this.state.client_id}</List.Item>
            </Picker>
          </List.Item>
          {this.state.data.map((it) => (
            <List.Item key={it.channelNo}>
              <video controls width="100%">
                <source type="application/x-mpegURL" src={it.hdAddress} />
              </video>
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}
