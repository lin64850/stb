import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page";
import { tips, log } from "../com_import";

interface IPageProps {
    identCode: MType.Page;
    event: PageEvent;
    con: PageControl;
}
interface IPageState {
}

export class PageModule extends React.Component<IPageProps, IPageState>{
    private readonly con = this.props.con;

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
        this.con.initPage();
    }
}