import logo from './logo.svg';
import './App.css';
import React from "react"
import * as api from "./api/index.js"
import "bootstrap/dist/css/bootstrap.css"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
  Label, LabelList } from 'recharts';

export default class extends React.Component {
  state = {
    client_id:0,
    client_key:0,
    data:{},
  }

  async componentDidMount() {
    this.load()
    setInterval(this.load, 3000)
  }
  load = async()=> {
    const data = await api.data(this.state.client_id)


    this.setState({data,client_key:data.client_key})
  }
  click = status=>()=>{
    this.setState({client_key:status})
    api.switches({
      client_id:this.state.client_id,
      status,
      min_humi:0,
      max_humi:0,
    })

  }
  render(){
    const it = this.state.data
    return (
      <div className="App">
        <div className="container">
          <ul className="info">
            <li className="">air_temp:{it.air_temp}</li>
            <li className="">air_humi:{it.air_humi}</li>
            <li className="">lumen:{it.lumen}</li>
            <li className="">soil_temp:{it.soil_temp}</li>
            <li className="">soil_humi:{it.soil_humi}</li>
           <li> {
             this.state.client_key==0? (
               <button className="btn btn-sm btn-primary" onClick={this.click(1)}>浇水</button>
             ):(
               <button className="btn btn-sm btn-primary" onClick={this.click(0)}>停止浇水</button>
             )
           }
             </li>
          </ul>
        </div>
        <div>
          <LineChart data={[{a:100,b:20},{a:"fds",b:99}]} width="200" height="200">

            <Line key="b" dataKey="b">
            </Line>
          </LineChart>
        </div>
      </div>
    );
  }
}

