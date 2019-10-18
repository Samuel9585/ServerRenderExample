import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { DemoComponet } from "./components/message.js";

import '!style-loader!css-loader!antd/dist/antd.min.css';



ReactDOM.render(<DemoComponet />, document.getElementById('app'));