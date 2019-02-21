import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { PageModel } from "../model/page_m";
import { tips, log } from "../com_import";

interface IPageProps {
    identCode: MType.Page;
    event: PageEvent;
    con: PageControl;
    mod: PageModel;
}
interface IPageState {
}

export class PageModule extends React.Component<IPageProps, IPageState>{
    private readonly contr = this.props.con;
    private readonly store = this.props.mod;

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
    protected componentDidMount() {
        this.contr.initPage();
    }
}