/**
 * @name 盒子接口
 */
window.PageTitle = document.title.split('-').length > 1 ? document.title.split('-')[1].toLowerCase() : "";
try {
    window.Authentication.CTCGetConfig("UserID");
}
catch (err) {
    window.Authentication = {
        CTCGetConfig: function () {
            return undefined;
        }
    };
}
window.UserID = Authentication.CTCGetConfig("UserID") || 'zhuoying1';
window.UserGroupID = Authentication.CTCGetConfig("UserGroupNMB") || '';
window.UserToken = Authentication.CTCGetConfig("UserToken") || '';
window.EpgGroupID = Authentication.CTCGetConfig("AreaNode") || '';
window.STBID = Authentication.CTCGetConfig("STBID") || '';
window.STBType = Authentication.CTCGetConfig("STBType") || 'Browser';
window.TerminalType = Authentication.CTCGetConfig("TerminalType") || '';
window.AreaNode = Authentication.CTCGetConfig("AreaNode") || '';
window.IP = Authentication.CTCGetConfig("IP") || '';
window.MAC = Authentication.CTCGetConfig("MAC") || '';
window.CountyID = Authentication.CTCGetConfig("CountyID") || '';
window.Version = "game";
// 盒子对象
window.Utility;
if (!window.Utility) {
    Utility = {
        setValueByName: function (command) {
            return undefined;
        }
    };
}

// 返回launcher
function toLauncher() {

}
/**
 * 设备配置映射
 * type：厂商 安徽盒子
 * is4K：是否是4k盒子
 * needAnimate：加载页面是否需要动画效果
 * supportSmallWin：是否支持小窗口播放视频
 * supportXiri: 是否支持讯飞语音 （在讯飞功能没有正式上线之前，该处统一设置为false）
 */
window.DEV_MAP = {
    /**
     * 中兴
     */
    "B760EV3": {
        type: "ZH",
        is4K: false,
        needAnimate: false,
        supportSmallWin: true,
        supportXiri: false
    },
    "B760H": {
        type: "ZH",
        is4K: false,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: false
    },
    "B860A": {
        type: "ZH",
        is4K: true,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: true
    },
    "B860AV1.1": {
        type: "ZH",
        is4K: true,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: true
    },
    "B860AV1.1-T": {
        type: "ZH",
        is4K: true,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: true
    },
    "B860AV1.1-T2": {
        type: "ZH",
        is4K: true,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: true
    },
    "B860GV1.1": {
        type: "ZH",
        is4K: true,
        needAnimate: false,
        supportSmallWin: false,
        supportXiri: false
    },
    /**
     * 创维
     */
    "E8205": {
        type: "CW",
        is4K: false,
        needAnimate: false,
        supportSmallWin: false,
        supportXiri: false
    },
    "E910": {
        type: "CW",
        is4K: false,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: false
    },
    "E909": {
        type: "CW",
        is4K: true,
        needAnimate: true,
        supportSmallWin: false,
        supportXiri: true
    },
    "E900": {
        type: "CW",
        is4K: true,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: true
    },
    "E900-s": {
        type: "CW",
        is4K: true,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: true
    },
    "E910V10D": {
        type: "CW",
        is4K: true,
        needAnimate: true,
        supportSmallWin: false,
        supportXiri: true
    },
    "E910V10C": {
        type: "CW",
        is4K: true,
        needAnimate: true,
        supportSmallWin: false,
        supportXiri: true
    },
    "E950": {
        type: "CW",
        is4K: true,
        needAnimate: true,
        supportSmallWin: false,
        supportXiri: true
    },
    /**
     * 数码视讯
     * 的两款盒子，不支持Velocity来做页面加载的上滑效果,所以就算开启了动画也要把上滑效果屏蔽掉
     */
    "Q5": {
        type: "SMSX",
        is4K: true,
        needAnimate: false,
        supportSmallWin: true,
        supportXiri: false
    },
    "S6CT": {
        type: "SMSX",
        is4K: false,
        needAnimate: false,
        supportSmallWin: true,
        supportXiri: false
    },
    /**
     * 烽火 HG680
     */
    "HG680": {
        type: "FH",
        is4K: true,
        needAnimate: false,
        supportSmallWin: true,
        supportXiri: true
    },
    "HG680-J": {
        type: "FH",
        is4K: true,
        needAnimate: false,
        supportSmallWin: true,
        supportXiri: true
    },
    /**
     * 烽火 MR820
     */
    "MR820": {
        type: "FH",
        is4K: true,
        needAnimate: false,
        supportSmallWin: true,
        supportXiri: true
    },
    /**
     * 烽火 MR622
     */
    "MR622": {
        type: "FH",
        is4K: true,
        needAnimate: false,
        supportSmallWin: true,
        supportXiri: true
    },
    /**
     * 海信
     */
    "IP906H_36T1": {
        type: "HX",
        is4K: true,
        needAnimate: false,
        supportSmallWin: true,
        supportXiri: true
    },
    /**
     * 天翼 TY1208-Z
     */
    "TY1208-Z": {
        type: "TY",
        is4K: true,
        needAnimate: false,
        supportSmallWin: true,
        supportXiri: true
    },
    /**
     * 九州 PTV-8098
     */
    "PTV-8098": {
        type: "JZ",
        is4K: true,
        needAnimate: true,
        supportSmallWin: false,
        supportXiri: true
    },
    /**
     * 九州 PTV-8508
     */
    "PTV-8508": {
        type: "JZ",
        is4K: false,
        needAnimate: true,
        supportSmallWin: false,
        supportXiri: false
    },
    "EC6108V9C": {
        type: "HW",
        is4K: true,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: true
    },
    "EC6108V9_pub_ahwdx": {
        type: "HW",
        is4K: true,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: true
    },
    /**
     * 四创
     */
    "SCIP906H_R": {
        type: "SC",
        is4K: true,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: true
    },
    /**
     * 长虹
     */
    "IHO-3000S": {
        type: "CH",
        is4K: true,
        needAnimate: false,
        supportSmallWin: true,
        supportXiri: true
    },
    "GP920": {
        type: "CH",
        is4K: true,
        needAnimate: false,
        supportSmallWin: true,
        supportXiri: true
    },
    /**
     * 中通服
     */
    "YiX-G110": {
        type: "CH",
        is4K: true,
        needAnimate: false,
        supportSmallWin: true,
        supportXiri: true
    },
    /**
     * 器贸
     */
    "AHQM-RG01": {
        type: "QM",
        is4K: true,
        needAnimate: false,
        supportSmallWin: true,
        supportXiri: true
    },
    /**
     * 贝尔
     */
    "RG020ET-CA": {
        type: "CH",
        is4K: true,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: true
    },
    "G-120WT-P": {
        type: "CH",
        is4K: true,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: true
    },
    /**
     * 瑞斯康达
     */
    "HT660": {
        type: "CH",
        is4K: true,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: true
    },
    "HT670-GP-V": {
        type: "CH",
        is4K: true,
        needAnimate: true,
        supportSmallWin: true,
        supportXiri: true
    },
    /**
     * 浏览器
     */
    "Browser": {
        type: "PC",
        is4K: true,
        needAnimate: true,
        supportSmallWin: false,
        supportXiri: false
    }
};
function hasSupportSmallWin(stbType) {
    if (DEV_MAP[stbType] && !DEV_MAP[stbType].supportSmallWin) {
        return false;
    }
    else {
        return true;
    }
}
function hasDesignatedBox(stbType, stbName) {
    if (DEV_MAP[stbType] && stbName == DEV_MAP[stbType].type) {
        return true;
    }
    else {
        return false;
    }
}
// 安徽是否支持统一播放器
function hasUnifyPlayer() {
    return STBAppManager.isAppInstalled("com.anhui.tv");
}