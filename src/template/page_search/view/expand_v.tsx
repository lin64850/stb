import { React, PageEvent, Focus } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log } from "../com_import";
import { focus } from "stb/decorator";
import { Key } from "@/config";

interface IExpandProps {
    identCode: MType.Expand;
    event: PageEvent;
    con: PageControl;
}

interface IExpandState {
    left?: number;
    top?: number;
    values?: string[];
    display?: boolean;
}

@focus
export class ExpandModule extends React.Component<IExpandProps, IExpandState>{
    readonly conKeyboard = this.props.con.conKeyBoard;
    currentIndex: number;

    constructor(props: IExpandProps) {
        super(props);
        this.state = {
            left: 200,
            top: 200,
            values: ["", "", "", "", ""],
            display: false,
        }
    }

    render() {
        return (
            <div>
                <div class={`key ${this.state.display ? "" : "hide"}`} style={this.state}>
                    <div class="key-center" tag="focus">
                        <span>{this.state.values[0]}</span>
                    </div>
                    {
                        this.state.values[1] ?
                            (
                                <div class="key-up" tag="focus">
                                    <span>{this.state.values[1]}</span>
                                </div>
                            )
                            : false
                    }
                    {
                        this.state.values[2] ?
                            (
                                <div class="key-right" tag="focus">
                                    <span>{this.state.values[2]}</span>
                                </div>
                            )
                            : false
                    }
                    {
                        this.state.values[3] ?
                            (
                                <div class="key-down" tag="focus">
                                    <span>{this.state.values[3]}</span>
                                </div>
                            )
                            : false
                    }
                    {
                        this.state.values[4] ?
                            (
                                <div class="key-left" tag="focus">
                                    <span>{this.state.values[4]}</span>
                                </div>
                            )
                            : false
                    }
                </div>
            </div>
        )
    }

    subscribeToEvents() {
        this.onfocus((e) => {
            if (e.data) {
                const { left, top, values, currentIndex } = e.data;
                this.currentIndex = currentIndex;
                this.setIndex(0);
                this.setState({
                    left: left - 29,
                    top: top - 26,
                    values: values,
                    display: true
                });
            }
        })
        this.onblur(() => {
            this.setState({
                display: false
            })
        })
    }

    componentDidMount() {
        return false;
    }

    autoFocus(keyCode) {
        const r = Focus.center(this.tags, this.search, keyCode);
        if (r) {
            this.setFocus(r.search);
        } else {
            const r = Focus.scope(this.tags, this.search, keyCode);
            if (r) {
                this.setFocus(r.search);
            } else {
                if (Key.Up === keyCode) {
                    if (this.currentIndex == 3) {
                        this.props.con.conKeyBoard.isShowKeypad(false)
                        this.target(MType.Keyboard, { search: 0 })
                    } else if (this.currentIndex > 3) {
                        this.props.con.conKeyBoard.isShowKeypad(false)
                        this.target(MType.Keyboard, { search: this.currentIndex - 3 })
                    }
                } else if (Key.Down === keyCode) {
                    this.props.con.conKeyBoard.isShowKeypad(false)
                    this.target(MType.Keyboard, { search: this.currentIndex + 3 })
                } else if (Key.Right === keyCode) {
                    if (this.currentIndex == 2 || this.currentIndex == 5 || this.currentIndex == 8) {
                        this.props.con.conKeyBoard.isShowKeypad(false)
                        if (this.props.con.conTab.getPageType() === 0) {
                            this.target(MType.Default)
                        } else if (this.props.con.conTab.getPageType() === 2) {
                            this.target(MType.List)
                        } else if (this.props.con.conTab.getPageType() === 1) {
                            this.target(MType.Empty)
                        } else {
                            this.target(MType.Keyboard)
                        }
                    } else {
                        this.props.con.conKeyBoard.isShowKeypad(false)
                        this.target(MType.Keyboard, { search: this.currentIndex + 1 })
                    }
                } else if (Key.Left) {
                    if (this.currentIndex !== 3 && this.currentIndex !== 6) {
                        this.props.con.conKeyBoard.isShowKeypad(false)
                        this.target(MType.Keyboard, { search: this.currentIndex - 1 })
                    }
                }
            }
        }
        return false;
    }

    onEnter() {
        this.props.con.conKeyBoard.isShowKeypad(false);
        this.target(MType.Keyboard, { entrance: this.state.values[this.search] });
    }

    onBackspace() {
        this.props.con.conKeyBoard.isShowKeypad(false);
        this.target(MType.Keyboard);
    }
}