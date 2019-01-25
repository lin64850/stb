import { React, PageEvent } from "stb/component";
import { MType } from ".";

interface IPageProps {
    identCode: MType.Page;
    event: PageEvent;
}
interface IPageState {
}

export class PageModule extends React.Component<IPageProps, IPageState>{

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
}
