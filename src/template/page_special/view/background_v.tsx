import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log } from "../com_import";
import { getImageAddress } from "@/config/config.tool";
import { focus } from "stb/decorator";

interface IBackgroundProps {
    identCode: number;
    event: PageEvent;
    ntt: any;
    con: PageControl;
}
interface IBackgroundState {
}

@focus
export class BackgroundModule extends React.Component<IBackgroundProps, IBackgroundState>{
    private readonly con = this.props.con;

    constructor(props: IBackgroundProps) {
        super(props);
        this.state = {
        }
        // this.con.initBackground = this.initView;
    }
    protected render() {
        return (
            <img style={{position:"absolute",left:this.props.ntt.x,top:this.props.ntt.y}} src={getImageAddress(this.props.ntt.ext.basic_img)} />
        )
    }
    private initView = () => {
        // TODO
    }

    
}