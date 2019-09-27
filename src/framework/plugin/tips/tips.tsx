
import "./tips.less?raw";
import { Component, h, render } from "stb-react";
import { SetTimeout } from "stb-tools";

interface ITipsProps {
    super: Tips;
}
interface ITipsState {
    display?: boolean;
    message?: string;
}

class TipsModule extends Component<ITipsProps, ITipsState>{
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
export class Tips {

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

        render(<TipsModule super={this} />, c);
    }
    show: (msg: string, duration?: number) => Promise<any>;
}