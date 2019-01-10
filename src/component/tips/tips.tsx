
import "./tips.less";
import { React } from "../../framework/component/react";
import { SetTimeout } from "../../framework/basic/setTimeout";
import { ReactDOM } from "../../framework/component/react-dom";

/**
 * 提示框组件
 */

interface ITipsProps {
    super: TipsComponent;
}
interface ITipsState {
    display?: boolean;
    message?: string;
}

class TipsModule extends React.Component<ITipsProps, ITipsState>{
    private timeout = new SetTimeout(3000);

    constructor(props: ITipsProps) {
        super(props);

        this.state = {
            display: false,
            message: ""
        }

        this.props.super.show = (msg: string, duration?: number) => {
            return new Promise((resolve, reject) => {
                if (undefined !== duration) {
                    this.timeout = new SetTimeout(duration);
                }

                this.setState({
                    message: msg,
                    display: true
                });

                this.timeout.enable(() => {
                    this.setState({
                        display: false
                    });
                    resolve();
                });
            });
        }
    }
    render() {
        return (
            <div class="tips-component" style={`display:${this.state.display ? "block" : "none"}`}>
                <div>{this.state.message}</div>
            </div>
        );
    }
}
export class TipsComponent {

    constructor(id?: string) {

        // 容器
        let c = document.getElementById('tips');
        let boy;

        if (!c) {
            c = document.createElement('div');
            c.id = 'tips';

            boy = document.getElementsByTagName('body').item(0);

            boy.insertBefore(c, boy.firstChild);

        }

        ReactDOM.render(<TipsModule super={this} />, c);
    }
    show: (msg: string, duration?: number) => Promise<any>;
}