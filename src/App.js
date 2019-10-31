import React from 'react';
import './App.css';
import Tool from "./Tool"

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class App extends React.Component {
  state = {
    setAmount: 1,
    setPrice: 0,
    People: 1,
    Calculation: 0,

    AllAmount: 0,
    AllMoney: 0,
    Cost: 0
  }

  async componentDidMount() {
    var db = await Tool.fetchData()

    db.collection("iceice").doc("data")
      .onSnapshot((doc) => {
        this.setState({
          AllAmount: doc.data().Amount,
          AllMoney: doc.data().Money,
          Cost: doc.data().Cost
        })
      });

  }

  async sell() {
    this.setState({ AllMoney: this.state.AllMoney += this.state.setPrice * this.state.setAmount, AllAmount: this.state.AllAmount += this.state.setAmount })
    this.setState({ setAmount: 1, setPrice: 0 })

    var data = {
      Amount: this.state.AllAmount,
      Cost: this.state.Cost,
      Money: this.state.AllMoney
    }
    await Tool.uploadData(data);
  }
  async remove() {
    this.setState({ AllMoney: this.state.AllMoney -= this.state.setPrice * this.state.setAmount, AllAmount: this.state.AllAmount -= this.state.setAmount })
    this.setState({ setAmount: 1, setPrice: 0 })

    var data = {
      Amount: this.state.AllAmount,
      Cost: this.state.Cost,
      Money: this.state.AllMoney
    }
    await Tool.uploadData(data);
  }

  render() {
    
const data = [
  {
    name: 'เม็ดเงิน', ต้นทุน: this.state.Cost, รายได้: this.state.AllMoney, amt: 2400,
  },
]
    return (
      <div className="App">

        <div className="Graph">
          <BarChart
            width={window.screen.width-50}
            height={200}
            data={data}
            margin={{
              top: 5, right: 30, left: 0, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ต้นทุน" fill="rgb(241, 103, 103)" />
            <Bar dataKey="รายได้" fill="#82ca9d" />
          </BarChart>

        
        </div>
        <div id="Line" />

        <div className="Content">


          <div id="PlusPlus">

            <div id="Amount">
              จำนวนที่ขายออก
             <div style={{ color: 'gray', fontSize: '2.3em' }}>{this.state.AllAmount}</div>
            </div>

            <div id="Price">



              <div id="setAmout">
                จำนวน
              <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                  <span id="AmountPlus" onClick={() => this.state.setAmount > 1 ? this.setState({ setAmount: this.state.setAmount - 1 }) : null}>-</span>
                  <span style={{ color: 'gray' }}>{this.state.setAmount} แก้ว</span>
                  <span id="AmountRemove" onClick={() => this.setState({ setAmount: this.state.setAmount + 1 })}>+</span>
                </div>
              </div>
              <div id="setPrice">
                แก้วละ
              <span style={{ color: 'green' }}>{this.state.setPrice} </span>
                <span id="Clear" onClick={() => this.setState({ setPrice: 0 })}>Clear</span>

              </div>

              <div id="PriceButton">
                <div style={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                  <div id="Button2" onClick={() => this.state.setPrice > 0 ? this.setState({ setPrice: this.state.setPrice - 25 }) : null}>-25</div>
                  <div id="Button2" onClick={() => this.state.setPrice > 0 ? this.setState({ setPrice: this.state.setPrice - 5 }) : null}>-5</div>
                </div>
                <div style={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                  <div id="Button" onClick={() => this.setState({ setPrice: this.state.setPrice + 25 })}>+25</div>
                  <div id="Button" onClick={() => this.setState({ setPrice: this.state.setPrice + 5 })}>+5</div>

                </div>


              </div>


              <div id="submit">
                <div id="sell" onClick={() => this.state.setPrice > 0 ? this.sell() : null}>ขาย</div>
                <div id="remove" onClick={() => this.state.AllMoney > 0 ? this.remove() : null}>ลบออก</div>
              </div>
            </div>

          </div>




          <div id="SubStract">

            <div id="Revenue">
              ทุน
                <input id="CostInput" type="number" onChange={(e) => this.setState({ Cost: e.target.value })} value={this.state.Cost} />
            </div>
            <div id="Revenue">
              เงินเข้า
              <span style={{ color: 'green' }}>{this.state.AllMoney}</span>
              <span style={{ fontSize: '0.8em' }}>กำไร</span>
              <span style={this.state.AllMoney - this.state.Cost > 0 ? { color: 'green', fontSize: '0.8em' } : { color: 'red', fontSize: '0.8em' }}>{this.state.AllMoney - this.state.Cost}</span>
            </div>
            <div id="Calculation" style={{ fontSize: '1.2em' }}>
              คำนวนรายได้<input id="CostInput2" type="number" onChange={(e) => {
                this.setState({ People: e.target.value }, () => {
                  this.setState({ Calculation: this.state.AllMoney / this.state.People })
                })



              }} placeholder="จำนวนคน" /><br />
              <span style={{ fontSize: '1em', color: 'green' }}>ได้คนละ&nbsp;
                {this.state.Calculation.toFixed(2)}
                &nbsp; บาท</span>

            </div>

          </div>
        </div>










      </div>
    );
  }

}

export default App;
