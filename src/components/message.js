import React from "react";
import { Button, message, PageHeader, Divider  } from "antd";

export class DemoComponet extends React.Component {
    constructor() {
        super();

    }

    handleClick() {
        message.success("许下一个愿望");
    }

    render() {
        return <div>
            <PageHeader onBack={() => null} title="苏苏的主页" subTitle="welcome to my word!" />
            <Button onClick={this.handleClick}>点击这个按钮</Button>
            < div className = "testDiv" >
                这是个有样式的框框
            </div>
        </div>
    }
}