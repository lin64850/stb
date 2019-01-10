
import "./dialog.less";
import { React } from "../../framework/component/react";
import { SetTimeout } from "../../framework/basic/setTimeout";
import { ReactDOM } from "../../framework/component/react-dom";
import { PageEvent } from "../../framework/component/pageEvent";
import { focus } from "../../framework/decorator/noraml";

/**
 * 对话框组件
 */
interface IDialogProps {
    identCode: number;
    event: PageEvent;
    super: DialogComponent;
}
interface IDialogState {
    display?: boolean;
    message?: string;
}

const txt_confirm = require("../../package/images/common/txt_confirm.png");
const txt_cancel = require("../../package/images/common/txt_cancel.png");

@focus
class DialogModule extends React.Component<IDialogProps, IDialogState>{

    private resolve;
    private reject;

    constructor(props: IDialogProps) {
        super(props);

        this.state = {
            display: false,
            message: ""
        }

        this.props.super.target = (msg: string) => {
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;

                this.state.message = msg;
                this.target(this.identCode);
            });
        }
    }
    render() {
        return (
            <div class="dialog-component" style={`display:${this.state.display ? "block" : "none"}`}>
                <h3>
                    {this.state.message}
                </h3>
                <div tag="focus">
                    <img src={txt_confirm} />
                </div>
                <div tag="focus">
                    <img src={txt_cancel} />
                </div>
            </div>
        );
    }
    subscribeToEvents() {
        this.onfocus(() => {
            this.setState({
                display: true
            });
        });
        this.onblur(() => {
            this.setState({
                display: false
            })
        });
    }
    onEnter() {
        if (!this.index) {
            this.resolve();
        } else {
            this.reject();
        }
    }
    onBackspace() {
        this.reject();
    }
}
export class DialogComponent {

    constructor(identCode: number, event: PageEvent) {

        // 容器
        let c = document.getElementById('dialog');
        let boy;

        if (!c) {
            c = document.createElement('div');
            c.id = 'dialog';

            boy = document.getElementsByTagName('body').item(0);

            boy.insertBefore(c, boy.firstChild);

        }

        ReactDOM.render(<DialogModule identCode={identCode} event={event} super={this} />, c);
    }
    target: (msg: string) => Promise<any>;
}