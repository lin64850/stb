export var ConfigApi = {
    serviceDomain: 'http://localhost:8080',
    imgDomain: 'http://localhost:8080',
    apiPath: {
        main: "interface/main",
    },
    imgPath: {
        public: "/asset"
    }
}

// let host = window.location.host;

// // 自动检测本地服务器
// if (-1 != host.indexOf("127.0.0.1:9000")) {
//     // Config.serviceDomain = 'http://***.**.**.***:****';
//     // Config.imgDomain = 'http://***.**.**.***:****';
// }
// // 自动检测测试服务器
// else if (-1 != host.indexOf("***.**.**.***:****")) {
//     // Config.serviceDomain = 'http://***.**.**.***:****';
//     // Config.imgDomain = 'http://***.**.**.***:****';
// }
// // 自动检测正式服务器
// else {
// }