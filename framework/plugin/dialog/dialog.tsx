
import "./dialog.less?raw";
import { PageEvent } from "stb-event";
import { Component, h, render, ISubEvent } from "stb-react";
import { focus } from "stb-decorator";
import { Key } from "stb-key";

interface IDialogProps {
    identCode: number;
    event: PageEvent;
    super: Dialog;
}
interface IDialogState {
    display?: boolean;
    message?: string;
}

const txt_confirm = require("../../../src/assets/images/common/txt_confirm.png");
const txt_cancel = require("../../../src/assets/images/common/txt_cancel.png");

@focus
class DialogModule extends Component<IDialogProps, IDialogState>{

    private resolve;

    constructor(props: IDialogProps) {
        super(props);

        this.state = {
            display: false,
            message: ""
        }

        this.props.super.target = (msg: string): Promise<{ status: boolean, keyCode: Key }> => {
            return new Promise((resolve, reject) => {
                this.resolve = resolve;

                this.setState({
                    message: msg
                });

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
                <div tag={0}>
                    <img src={txt_confirm} />
                </div>
                <div tag={1}>
                    <img src={txt_cancel} />
                </div>
            </div>
        );
    }
    subscribeToEvents(e: ISubEvent) {
        e.onfocus(() => {
            this.setState({
                display: true
            });
        });
        e.onblur(() => {
            this.setState({
                display: false
            })
        });
    }
    onEnter() {
        if (!this.index) {
            this.resolve({ status: true, keyCode: Key.Enter });
        } else {
            this.resolve({ status: false, keyCode: Key.Enter });
        }
    }
    onBackspace() {
        this.resolve({ status: false, keyCode: Key.Backspace });
    }
}
export class Dialog {

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

        render(<DialogModule identCode={identCode} event={event} super={this} />, c);
    }
    target: (msg: string) => Promise<any>;
}