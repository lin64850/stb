import { React, PageEvent, PageType } from "stb/component";
import { TipsComponent, LogComponent } from "stb/plugin";
import { MainEntity } from "src/entitys/main";
import { MType, IRequest, IMemo } from ".";
import { Key } from "@/config";

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
    private readonly tips = new TipsComponent();
    private readonly log = new LogComponent();

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
