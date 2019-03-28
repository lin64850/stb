import { React, PageEvent, PageType } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log } from "../com_import";
import { focus } from "stb/decorator";
import { bg, search_btn_foc, search_ico_cle, search_ico_bac } from "../img_import";
import { Key } from "@/config";
import { Position } from "stb/basic";

interface IKeyboardProps {
    identCode: MType.Keyboard;
    event: PageEvent;
    con: PageControl;
}

interface IKeyboardState {
    keyword?: string;
    hideShowKeypad?: boolean;
}

@focus
export class KeyboardModule extends React.Component<IKeyboardProps, IKeyboardState>{
    readonly con = this.props.con.conKeyBoard;
    currentIndex = 1;

    constructor(props: IKeyboardProps) {
        super(props);
        this.state = {
            keyword: this.con.keywordTips,
            hideShowKeypad: false,
        }
        this.con.initKeyboard = this.initView;
        this.con.getKeyword = this.getKeyword;
        this.con.isShowKeypad = this.isShowKeypad;
    }

    render() {
        return (
            <div class="menu">
                <img src={bg} alt="" class="background" />
                <span class="entrance">{this.state.keyword}</span>
                <div class="item-group">
                    <div class="item" tag="focus">
                        <img class="foc" src={search_btn_foc} />
                        <span class="num">1</span>
                        <span class="let"></span>
                    </div>
                    <div class="item" tag="focus">
                        <div class="box" style={{ display: this.state.hideShowKeypad && this.currentIndex == 1 ? "none" : "block" }}>
                            <img class="foc" src={search_btn_foc} />
                            <span class="num">2</span>
                            <span class="let">ABCD</span>
                        </div>
                    </div>
                    <div class="item" tag="focus">
                        <div class="box" style={{ display: this.state.hideShowKeypad && this.currentIndex == 2 ? "none" : "block" }}>
                            <img class="foc" src={search_btn_foc} />
                            <span class="num">3</span>
                            <span class="let">EFG</span>
                        </div>
                    </div>
                    <div class="item" tag="focus">
                        <div class="box" style={{ display: this.state.hideShowKeypad && this.currentIndex == 3 ? "none" : "block" }}>
                            <img class="foc" src={search_btn_foc} />
                            <span class="num">4</span>
                            <span class="let">HIJ</span>
                        </div>
                    </div>
                    <div class="item" tag="focus">
                        <div class="box" style={{ display: this.state.hideShowKeypad && this.currentIndex == 4 ? "none" : "block" }}>
                            <img class="foc" src={search_btn_foc} />
                            <span class="num">5</span>
                            <span class="let">KLM</span>
                        </div>
                    </div>
                    <div class="item" tag="focus">
                        <div class="box" style={{ display: this.state.hideShowKeypad && this.currentIndex == 5 ? "none" : "block" }}>
                            <img class="foc" src={search_btn_foc} />
                            <span class="num">6</span>
                            <span class="let">NOP</span>
                        </div>
                    </div>
                    <div class="item" tag="focus">
                        <div class="box" style={{ display: this.state.hideShowKeypad && this.currentIndex == 6 ? "none" : "block" }}>
                            <img class="foc" src={search_btn_foc} />
                            <span class="num">7</span>
                            <span class="let">QRS</span>
                        </div>
                    </div>
                    <div class="item" tag="focus">
                        <div class="box" style={{ display: this.state.hideShowKeypad && this.currentIndex == 7 ? "none" : "block" }}>
                            <img class="foc" src={search_btn_foc} />
                            <span class="num">8</span>
                            <span class="let">TUV</span>
                        </div>
                    </div>
                    <div class="item" tag="focus">
                        <div class="box" style={{ display: this.state.hideShowKeypad && this.currentIndex == 8 ? "none" : "block" }}>
                            <img class="foc" src={search_btn_foc} />
                            <span class="num">9</span>
                            <span class="let">WXYZ</span>
                        </div>
                    </div>
                    <div class="item" tag="focus" data-keydown={React.props({ btn_type: "clear" })}>
                        <img class="foc" src={search_btn_foc} />
                        <img class="num" src={search_ico_cle} />
                        <span class="let"></span>
                    </div>
                    <div class="item" tag="focus">
                        <img class="foc" src={search_btn_foc} />
                        <span class="num">0</span>
                        <span class="let"></span>
                    </div>
                    <div class="item" tag="focus" data-keydown={React.props({ btn_type: "backspace" })}>
                        <img class="foc" src={search_btn_foc} />
                        <img class="num" src={search_ico_bac} />
                    </div>
                </div>
            </div>
        )
    }

    initView = (keyword) => {
        return new Promise((reslove) => {
            this.setState({
                keyword: keyword
            })
            reslove();
        })
    }

    getKeyword = () => {
        return this.state.keyword;
    }

    subscribeToEvents() {
        this.onfocus((e) => {
            if (e.data) {
                if (e.data.entrance) {
                    const { entrance } = e.data;
                    if (undefined != entrance) {
                        this.setKeyworlds(this.con.entrance(this.state.keyword, entrance));
                    }
                } else if (e.data.search || e.data.search === 0) {
                    this.setFocus(e.data.search)
                }
            }
        })
    }

    setKeyworlds(val) {
        if (this.con.keywordTips !== val) {
            this.props.con.initSearch({ pageIndex: 1, keyword: val, search: 0 }).then((data) => {
                if (data.length == 0) {
                    this.props.con.initEmpty(0);
                }
            });
        } else {
            this.props.con.initPage(0);
        }
        this.setState({
            keyword: val
        });
    }

    onEnter(data) {
        if (data) {
            const { btn_type } = data;
            if ("backspace" === btn_type) {
                this.setKeyworlds(this.con.backspace(this.state.keyword))
            } else if ("clear" === btn_type) {
                this.setKeyworlds(this.con.keywordTips);
            }
        } else {
            this.currentIndex = this.search;
            this.isShowKeypad(true);
            const tag = this.tags.eq(this.search);
            const num = tag.find("[class=num]").html();
            if (tag.find("[class=let]").html()) {
                const val = [num, ...tag.find("[class=let]").html().split("")];
                this.target(MType.Expand, { ...Position(tag.get(0)), values: val, currentIndex: this.search });
            } else if (num) {
                this.setKeyworlds(this.con.entrance(this.state.keyword, num))
            }
        }
    }

    onBackspace() {
        this.trigger(PageType.Previous);
    }

    onChange(status, keycode) {
        if (!status) {
            if (keycode === Key.Right) {
                if (this.props.con.conTab.getPageType() === 0) {
                    this.target(MType.Default)
                } else if (this.props.con.conTab.getPageType() === 2) {
                    this.target(MType.List)
                } else if (this.props.con.conTab.getPageType() === 1) {
                    this.target(MType.Empty)
                }
            }
        }
    }

    isShowKeypad = (status) => {
        this.setState({
            hideShowKeypad: status
        })
    }
}