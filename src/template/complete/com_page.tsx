import { MType, IRequest, IMemo } from ".";
import { React } from "../../framework/component/react";
import { PageEvent, PageType } from "../../framework/component/pageEvent";
import { TipsComponent } from "../../component/tips/tips";
import { LogComponent } from "../../component/log/log";
import { Key } from "../../framework/basic/key";
import { MainEntity } from "../../entitys/main";

interface IPageProps {
    identCode: MType.Page;
    event: PageEvent;
    requ: IRequest;
    memo: IMemo;
    nttMain:MainEntity;
}
interface IPageState {
}

export class PageModule extends React.Component<IPageProps, IPageState>{
    private readonly tips = new TipsComponent('tips');
    private readonly log = new LogComponent('log');

    constructor(props: IPageProps) {
        super(props);
        this.state = {
        }
    }
    protected render() {
        return (
            <div class="content">
                <span>Hello EPG!</span>
            </div>
        )
    }
    protected subscribeToEvents() {
        this.onkeydown((e) => {
            if (Key.Enter === e.keyCode) {
                this.onEnter();
            }
            else if (Key.Backspace === e.keyCode) {
                this.onBackspace();
            }
        })
    }
    protected componentDidMount() {
        this.target(MType.Page);
    }
    protected onEnter() {
        this.trigger(PageType.Blank, { url: "./index.html", params: {} });
    }
    protected onBackspace() {
        this.trigger(PageType.Previous);
    }
    show(msg) {
        this.tips.show(msg);
    }
    pushLog(msg) {
        this.log.push(msg);
    }
}
