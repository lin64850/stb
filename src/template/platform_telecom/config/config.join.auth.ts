
/**
 * 鉴权
*/
let Authentication: IAuthentication;

Authentication = (videoId: string, episode: number, token: string, business: string, backUrl: string) => {
    return new Promise((resolve, reject) => {
        let ret = {
            code: null,
            parentCode: null,
            playUrl: null,
            authStatus: false,
            trySee: false,
            seeSecond: 0,
            jumpUrl: null,
            presentParams: null,
            productPackage: null
        };
        // TODO
        resolve(ret);
    });
}

export { Authentication }