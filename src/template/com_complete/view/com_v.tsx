import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { PageModel } from "../model/page_m";
import { tips, log } from "../com_import";

interface IIndexProps {
    identCode: MType.Index;
    event: PageEvent;
    con: PageControl;
    mod: PageModel;
}
interface IIndexState {
}

export class IndexModule extends React.Component<IIndexProps, IIndexState>{
    private readonly con = this.props.con.;
    private readonly mod = this.props.mod.;

    constructor(props: IIndexProps) {
        super(props);
        this.state = {
        }
        this.con.initView = this.initView;
    }
    protected render() {
        return (
            <div class="content">
                <span>Hello EPG!</span>
            </div>
        )
    }
    private initView = () => {
    };
}