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
    readonly con = this.props.con;
    readonly mod = this.props.mod;

    constructor(props: IPageProps) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div class="content">
                <span>Hello EPG!</span>
            </div>
        )
    }
    componentDidMount() {
        this.con.initPage().then(({ identCode }) => {
            this.target(identCode);
        })
    }
}