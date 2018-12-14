import { MType } from ".";
import { React } from "../../framework/component/react";
import { PageEvent } from "../../framework/component/pageEvent";

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
    render() {
        return (
            <div class="content">
                <span>Hello EPG!</span>
            </div>
        )
    }
}
