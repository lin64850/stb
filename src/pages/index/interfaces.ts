declare namespace Index {
    interface IFocProps {
        identCode?: number | string;
        event: any;
        store;
    }

    // 组件
    interface IRootProps extends IFocProps {
    }
    interface IRootState {

    }
    interface IContentProps {

    }
    interface IContentState {
        display?: number;
    }
    interface INavProps extends IFocProps {

    }
    interface INavState {

    }
    interface IBodyProps extends IFocProps {

    }
    interface IBodyState {

    }
    interface IControlProps extends IFocProps {

    }
    interface IControlState {

    }

    // 其他
    interface IRequest {

    }
    interface IMemo {
        identCode: number | string;
        index: number;
    }
    interface ISource {
        url: string;
    }
}