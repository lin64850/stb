
import "./form.less";
import { React } from "../../framework/component/react";
import { SetTimeout } from "../../framework/basic/setTimeout";
import { ReactDOM } from "../../framework/component/react-dom";

/**
 * 提示框组件
 */

interface IFormProps {
    super: FormComponent;
}
interface IFormState {
    group?: { key: string, value: string }[];
    action?: string;
    method?: "get" | "post";
}

class FormModule extends React.Component<IFormProps, IFormState>{

    constructor(props: IFormProps) {
        super(props);

        this.state = {
            group: [],
            action: "",
            method: "get"
        }

        this.props.super.setProps = (props) => {
            let group: { key, value }[] = [];

            for (const key in props) {
                if (props.hasOwnProperty(key)) {
                    const ele = props[key];

                    group.push({ key: key, value: ele });
                }
            }

            this.setState({
                group: group
            })
        }
        this.props.super.submit = (method, action) => {
            this.setState({
                method,
                action
            });
            new SetTimeout(300).enable(() => {
                this.refs.find("[type=submit]").get(0).click();
            });
        }
    }
    render() {
        return (
            <form class="form-component" action={this.state.action} method={this.state.method}>
                {
                    this.state.group.map((v) => {
                        return (
                            <input type="text" name={v.key} value={v.value} />
                        )
                    })
                }
                <input type="submit" value="提交" />
            </form>
        );
    }
}
export class FormComponent {

    constructor(id?: string) {

        // 容器
        let c = document.getElementById('form');
        let boy;

        if (!c) {
            c = document.createElement('div');
            c.id = 'form';

            boy = document.getElementsByTagName('body').item(0);

            boy.insertBefore(c, boy.firstChild);

        }
        ReactDOM.render(<FormModule super={this} />, c);
    }
    setProps: (props: object) => void;
    submit: (method: "get" | "post", action: string) => void;
}