import { React, PageEvent, PageType } from "stb/component";
import { MainEntity } from "src/entitys/main";
import { MType, IRequest, IMemo, log, tips } from ".";
import { Key } from "@/config";
import { tabs } from "stb/decorator";

interface IPageProps {
    identCode: MType.Page;
    event: PageEvent;
    con: PageControl;
}
interface IPageState {
    display?: number;
}
interface IPageControl {
    requ: IRequest;
    memo: IMemo;
    nttMain: MainEntity;
}

@tabs('show', "slide", 700, 500, 3)
export class PageModule extends React.Component<IPageProps, IPageState>{

    constructor(props: IPageProps) {
        super(props);
        this.state = {
            display: 0
        }
    }
    protected render() {
        return (
            <div class="content">
                <div tag="tab-group" >
                    <div tag="tab" control="0">Hello EPG!1</div>

                    <div tag="tab" control="1">Hello EPG!2</div>

                    <div tag="tab" control="2">Hello EPG!3</div>
                </div>

            </div>
        )
    }
    protected subscribeToEvents() {
        this.onkeydown((e) => {
            if (Key.Left === e.keyCode) {
                this.setState({
                    display: this.state.display - 1
                })
            }
            else if (Key.Right === e.keyCode) {
                this.setState({
                    display: this.state.display + 1
                })
            }
            console.log(this.state.display)

        })
    }
    protected componentDidMount() {
        this.target(MType.Page);
    }
}
export class PageControl {
    private readonly props: IPageControl;
    constructor(params: IPageControl) {
        this.props = params;
    }
}