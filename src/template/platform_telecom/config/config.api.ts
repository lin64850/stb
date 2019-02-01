import { MainEntity } from "../../../entitys/main";

export var ConfigApi = {
    serviceDomain: '',
    imgDomain: '',
    apiPath: {
        main: ""
    },
    imgPath: {
        public: ""
    }
}

let host = window.location.host;

// 自动检测本地服务器
if (-1 != host.indexOf("127.0.0.1:8080")) {
    // Config.serviceDomain = 'http://***.**.**.***:****';
    // Config.imgDomain = 'http://***.**.**.***:****';
}
// 自动检测测试服务器
else if (-1 != host.indexOf("***.**.**.***:****")) {
    // Config.serviceDomain = 'http://***.**.**.***:****';
    // Config.imgDomain = 'http://***.**.**.***:****';
}
// 自动检测正式服务器
else {
}