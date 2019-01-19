export class Cookie {
    private key: any;
    constructor(key: string) {
        this.key = key;
    }
    setCookie(value: string, params?: any) {
        this.cookie(this.key, value, params);
    }
    getCookie() {
        return this.cookie(this.key);
    }
    clearCookie() {
        this.cookie(this.key, null);
    }
    private cookie = (key: string, value?: string, params?: any) => {
        if (typeof value !== 'undefined') {
            var expires = '';
            params = params || {};
            if (value === null) {
                value = '';
                params.expires = -1;
            }
            if (undefined === params.expires) {
                params.expires = 1;
            }
            if (params.expires) {
                var date: Date = new Date();
                date.setTime(date.getTime() + (params.expires * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
            var path = params.path ? '; path=' + params.path : '; path=/';
            var domain = params.domain ? '; domain=' + params.domain : '';
            var secure = params.secure ? '; secure' : '';
            document.cookie = [key, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            // jquery 获取方式，移动盒子存在兼容问题
            // var cookies;
            // if (document.cookie && document.cookie !== '') {
            //     cookies = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'));
            //     if (cookies) {
            //         return decodeURIComponent(cookies[2]);
            //     } else {
            //         return null;
            //     }
            // }
            // 菜鸟教程网推荐方式
            return getCookie(key);
        }
    }
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return decodeURIComponent(c.substring(name.length, c.length));
    }
    return "";
}
