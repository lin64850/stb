import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { IndexControl } from "../control/index_c";
import { IndexModel } from "../model/index_m";
import { tips, log } from "../com_import";

interface IIndexProps {
    identCode: MType.Index;
    event: PageEvent;
    con: IndexControl;
    mod: IndexModel;
}
interface IIndexState {
}

export class IndexModule extends React.Component<IIndexProps, IIndexState>{
    private readonly contr = this.props.con;
    private readonly store = this.props.mod;

    constructor(props: IIndexProps) {
        super(props);
        this.state = {
        }
        this.contr.initView = this.initView;
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
    private initView: () => {
    };
}