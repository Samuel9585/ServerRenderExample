import React from 'react';
import { Button, message, PageHeader, Divider  } from "antd";
import testImg from "./images/icon.svg";

import '!style-loader!css-loader!antd/dist/antd.min.css';
 
const App = () => <div>
    Hello React
    <img  src={testImg} />
    <PageHeader onBack={() => null} title="苏苏的主页" subTitle="welcome to my word!" />
    </div>
 
export default App;