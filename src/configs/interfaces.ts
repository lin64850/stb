declare namespace Config {
    /**
     * 鉴权
     * 情景一：内部后台
     * 情景二：三方后台
     * 环境：都是通过后台HTTP交互且通信接口固定，返回参数固定
     */
    interface IAuthentication {
        /**
         * 鉴权
         * @param videoId 视频ID
         * @param episode 分集序号
         * @param token token
         * @param business 业务号
         * @param backParams 鉴权回调参数，参数会传给回调函数；如果是 APK backParams 可以为空
         * @returns 成功或失败会返回 code 和 parentCode 用于统一引擎播放；自定义播放器取 playUrl；鉴权失败取 jumpUrl 订购地址执行订购；如果是 POST 表单提交需要填充参数 presentParams；productPackage 产品包列表，需要选择产品包列表时取该数据
         */
        (videoId: string, episode: number, token: string, business: string, backParams: object): Promise<AuthenticationResult>;
    }

    /**
     * 鉴权结果
     */
    interface AuthenticationResult {
        code: string;
        parentCode: string;
        playUrl: string;
        authStatus: boolean;
        trySee: boolean;
        seeSecond: number;
        jumpUrl: string;
        presentParams: any;
        continueSecond: number;
        productPackage: any[];
    }

    /**
     * 订购
     * 情景一：GET 跳转；回调为指定 EPG 地址；回调参数与后台约定固定不会更改
     * 情景二：POST 跳转；回调为指定 EPG 地址；回调参数与后台约定固定不会更改
     * 情景三：APK 调起；回调为全局函数
     * 情景四：产品包选择页跳转，再发起订购
     * 环境：通过表单跳转或APK发起；表单回调参数固定
     */
    interface IOrder {
        /**
         * 订购
         * @param jumpUrl 订购地址；值非空执行订购操作
         * @param packList 产品包列表；值非空且 jumpUrl 为空跳转产品包列表
         * @param callBack 跳转之前回调；设计到跳转订购与跳转产品包页面，在执行跳转之前回调，Promise 未 resolve 将不会执行跳转
         */
        (params: AuthenticationResult, callBack: (method: "jump" | "product") => Promise<any>): Promise<any>;
    }

    /**
     * 订购回调
     * 情景一：EPG 回调；参数与后台约定固定；可以接受鉴权时自定义参数
     * 情景二：APK 回调；参数未知；处理方式未知；自定义参数获取形式未知
     */
    interface IOrderCallBack {
        (backParams: object): void;
    }

    /**
     * 播放
     * 情景一：GET 跳转自定义播放器；回调为指定 EPG 地址；回调参数固定不会更改
     * 情景二：GET 跳转第三方播放器；回调为指定 EPG 地址；回调参数未知
     * 情景三：APK 调起第三方播放器；回调为全局函数；回调参数未知
     * 环境：通过表单跳转或APK发起
     */
    interface IPlay {
        /**
         * 播放
         * @param callBack 跳转之前回调；设计到跳转播放与调起APK，在执行之前回调，Promise 未 resolve 将不会执行跳转或调起操作
         */
        (params: IPlayParams, callBack: (method: "jump" | "apk") => Promise<any>): Promise<any>;
    }

    /**
     * 播放器接收参数
     */
    interface IPlayParams {
        code: string;
        parentCode: string;
        videoId: string;
        episode: number;
        playUrl: string;
        /**
         * 第三个播放器可能需要是否开启试看配置
         */
        trySee: boolean;
        /**
         * 第三个播放器可能需要试看事件配置
         */
        seeSecond: number;
        /**
         * 续播
         */
        continueSecond: number;
        /**
         * 自定义参数；表示来源地方比如（首页小窗切全屏、推荐位、详情、专题等）自定义播放器会将 from 参数带给播放器
         */
        from: string;
    }

    /**
     * 播放回调
     * 情景一：GET 自定义播放器；回调为指定 EPG 地址；回调参数固定不会更改
     * 情景二：GET 第三方播放器；回调为指定 EPG 地址；回调参数未知
     * 情景三：APK 调起第三方播放器；回调为全局函数；回调参数未知
     */
    interface IPlayCallBack {
        (href: string): void;
    }

    /**
     * 来源地址
     * 情景一：EPG 站内跳转；带 return 参数
     * 情景二：EPG 第三方首次；带未知参数
     * 情景三：EPG 第三方 launcher 首次；带未知参数
     * 情景四：Launcher 首次加载；不带参数
     * 情景五：Launcher 首次加载；带未知参数
     * 情景六：EPG 封套；带 Cookie 存储值
     * 环境：通过EPG跳转或Launcher发起；站内带 return 第三方带约定地址，Luancher 不带
     * @description 处理来源提供返回地址；"-1" 表示来自 launcher，其余情况封套或第三方 APK 返回 EPG 地址
     */
    interface ISourceAddress {
        /**
         * 来源地址处理
         * @param href 处理地址
         */
        (href): string;
    }

    /**
     * 订购回调参数
     * @description 参数由两部分组成；1.自定义参数在鉴权时的 backParams 参数（包括 from 来自于哪个页面）；2.第三方附加参数（包括订购结果）第三方参数不可自定义，定以后也会被覆盖
     */
    interface IBackParams {
        /**
         * 自定义
         */
        from: IFromType;
        video_id:string;
        episode:string;
        /**
         * 第三方
         * 1 = 成功其他失败
         */
        success?:"1";
    }
    /**
     * 订购发起来源类型
     */
    type IFromType = "home" | "details" | "play";
}