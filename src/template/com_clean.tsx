import { React } from "../../framework/component/react";
import { PageEvent, PageType } from "../../framework/component/pageEvent";
import { MType } from ".";
import { PageModule } from "./com_page";

interface IIndexProps {
    identCode: MType.Index;
    event: PageEvent;
    super: PageModule;
}
interface IIndexState {
    dataList?: any[];
}

class IndexModule extends React.Component<IIndexProps, IIndexState>{
    con = new IndexControl();

    constructor(props: IIndexProps) {
        super(props);

        this.state = {
            dataList: []
        }
        // 初始化组件
        // this.props.super.initIndex = () => {
        //     return new Promise((resolve, reject) => {

        //         this.setState({
        //             dataList: list
        //         });

        //         resolve(list);

        //     });
        // }
    }
    render() {
        return (
            <div>Hello Component</div>
        )
    }
    onChange(status, keyCode) {
        if (status) {

        } else {

        }
    }
    onBackspace() {
        this.trigger(PageType.Previous);
    }
    componentDidMount() {
        return false;
    }
}
class IndexControl {

    protected getData(): Promise<any[]> {
        return new Promise((resolve) => {
            resolve([]);
        })
    }

}
export { IndexModule }