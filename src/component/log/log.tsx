
import "./log.less";
import { React } from "../../framework/component/react";
import { SetTimeout } from "../../framework/basic/setTimeout";
import { ReactDOM } from "../../framework/component/react-dom";
import { Config } from "../../config";

/**
 * 提示框组件
 */

interface ILogProps {
    super: LogComponent;
}
interface ILogState {
    display?: boolean;
    message?: string[];
}

class LogModule extends React.Component<ILogProps, ILogState>{

    constructor(props: ILogProps) {
        super(props);
        this.state = {
            display: false,
            message: []
        }

        this.props.super.push = (msg) => {
            return new Promise((resolve, reject) => {

                this.state.message.push(msg);
                this.setState({
                    display: true,
                });
            });
        }
    }
    render() {
        return (
            <div class="log-component" style={`display:${this.state.display ? "block" : "none"}`}>
                {
                    this.state.message.map((v) => {
                        return (<div>{v}</div>)
                    })
                }
            </div>
        );
    }
}

export class LogComponent {

    constructor(id?: string) {
        if (Config.debugMode) {

            // 容器
            let c = document.getElementById('log');
            let boy;

            if (!c) {
                c = document.createElement('div');
                c.id = 'log';

                boy = document.getElementsByTagName('body').item(0);

                boy.insertBefore(c, boy.firstChild);

            }

            ReactDOM.render(<LogModule super={this} />, c);
        }
    }
    push(msg: string) {

        return new Promise(() => {
            if (Config.debugMode) {
                this.pushMsg(msg);
            }
        });

    }
    private pushMsg: (msg: string) => Promise<any>;
}