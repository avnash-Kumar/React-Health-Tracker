import React, { useState, useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Chart from './chart';

const datas = [[10, 30, 40, 20,50,100]];
const xlabelsData = [['M', 'T', 'W', 'T', 'F', 'S']];
var i = 0;
export default function App() {
  const [key, setKey] = useState('Y');
  const tabsName = ['D', 'M', 'W', 'Y'];
  const [data, setData] = useState([]);

  useEffect(() => {
    changeData();
  }, []);

  const changeData = () => {
    setData(datas[i++]);
    if (i === datas.length) i = 0;
  };

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k)}
        className="mb-3"
      >
        {tabsName.map((element, index) => {
          return (
            <Tab
              className="tabsUI"
              disabled={true}
              key={index}
              eventKey={element}
              title={element}
            >
              <Chart
                width={600}
                height={200}
                data={data}
                color='#FF2D55'
                goal={170}
                title='MOVE'
                unit='Kcal'
              />
              <Chart
                width={600}
                height={200}
                data={data}
                color='#7CED05'
                goal={130}
                title='EXERCISE'
                unit='min'
              />
              <Chart
                width={600}
                height={200}
                data={data}
                color='#0BCADB'
                goal={100}
                title='STAND'
                unit='hr'
              />
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
}
