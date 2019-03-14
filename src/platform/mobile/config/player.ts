
/**
 * 编写作者：张诗涛
 * 平台环境：四川移动
 * 更新时间：2019年03月14日
 */

import { PageEvent } from "stb/component/pageEvent";
import { SetTimeout } from "stb/basic/setTimeout";
import { SetInterval } from "stb/basic/setInterval";

var Ysten: any = {};

(function () {
	/*
	 * Ysten namespace init
	 */
    // Ysten = window.Ysten = {};
    Ysten.core = {};
    Ysten.dom = {};
    Ysten.data = {};
    Ysten.player = {};
	/*
	 * Ysten player
	 * --------------------------------------------------------------------------------------------
	 * player callback register
	 */
    Ysten.player = function () {
        var playerCore: any = {};
        //当前播放时间，总时长
        var currentTime = 0, totalTime = 0;
        //当前播放器状态，上一状态，状态检测定时器
        var currentstatus = -2, prevstatus = -1, backupstatus = -1;
        //当前缓冲进度，缓冲时间，进度检测定时器
        var bufferNumber = 0, bufferTimeout = 0, bufferTimer;
        //媒体文件地址
        var mediaUrl = "";
        //播放器对象
        var mediaObj: any = null;
        //匹配数字
        var digit = /\d/;
        var simple = false;
        var hasTimeout = true;
        var isonReady = false;
        var status = playerCore.status = {
            init: -2, //初始化
            stop: -1, //停止
            ready: 0, //准备
            play: 1, //播放
            pause: 2, //暂停
            buffer: 3, //缓冲
            bufferComplete: 33,
            over: 4, //结束
            exception: 5, //异常
            error: 6//错误
        };

        var opt: any = {
            me: null,
            id: "", //播放控件ID
            url: "", //视频地址
            timeout: 120, //超时时间
            beginTime: 0, //开始播放时间
            onReady: "", //参数处理结束回调函数
            onPlay: "", //进入播放状态的回调函数
            onBuffer: "", //进入缓冲状态时的回调函数
            onBufferComplete: "",		//缓冲状态完成时的回调函数
            onPause: "", //进入暂停状态的回调函数
            onResume: "", //进入唤醒状态的回调函数
            onStop: "", //视频播被停止后的回调函数
            onOver: "", //视频播放结束后的回调函数
            onException: "", //发生异常时的回调函数
            onError: "", //发生错误时的回调函数
            onstatusChange: ""	//状态改变时的回调函数
        };

        var coreTimer;

        var isException = false;
        var isError = false;

        /*	*/
        function daolei(objId) {
            return document.getElementById(objId) || null;
        }
        //改变播放器状态
        function changestatus(s) {
            // ;
            currentstatus = s;
            // ;
            // ;
            if (prevstatus != s) {
                currentstatus = prevstatus = s;
                if (opt.onStatusChange && typeof opt.onStatusChange == 'function') {
                    opt.me ? opt.onStatusChange.call(opt.me) : opt.onStatusChange();
                }
                switch (s) {
                    case status.ready:
                        if (opt.onReady && typeof opt.onReady == 'function') {
                            opt.me ? opt.onReady.call(opt.me) : opt.onReady();
                        }
                        break;
                    case status.stop:
                        if (opt.onStop && typeof opt.onStop == 'function') {
                            opt.me ? opt.onStop.call(opt.me) : opt.onStop();
                        }
                        break;
                    case status.play:
                        if (opt.onPlay && typeof opt.onPlay == 'function') {
                            opt.me ? opt.onPlay.call(opt.me) : opt.onPlay();
                        }
                        break;
                    case status.pause:
                        if (opt.onPause && typeof opt.onPause == 'function') {
                            opt.me ? opt.onPause.call(opt.me) : opt.onPause();
                        }
                        break;
                    case status.buffer:
                        if (opt.onBuffer && typeof opt.onBuffer == 'function') {
                            opt.me ? opt.onBuffer.call(opt.me) : opt.onBuffer();
                        }
                        // case state.bufferComplete:
                        // if(opt.onBufferComplete && typeof opt.onBufferComplete=='function'){
                        // opt.onBufferComplete();
                        // }
                        break;
                    case status.over:
                        if (opt.onOver && typeof opt.onOver == 'function') {
                            opt.me ? opt.onOver.call(opt.me) : opt.onOver();
                        }
                        break;
                    case status.exception:
                        if (opt.onException && typeof opt.onException == 'function') {
                            opt.me ? opt.onException.call(opt.me) : opt.onException();
                        }
                        break;
                    case status.error:
                        if (opt.onError && typeof opt.onError == 'function') {
                            opt.me ? opt.onError.call(opt.me) : opt.onError();
                        }
                        break;
                }
            }
            // ;
        };

        //收到底层播放器onPlayReady消息
        function onPlayReady() {
            // ;
            isonReady = true;
            changestatus(status.ready);
            // ;
        };

        //收到底层播放器onPlayForceStop消息
        function onPlayForceStop() {
            // ;
            if (isError) {
                // ;
                return;
            }
            clearTimer();
            if (isException) {
                changestatus(status.exception);
            } else {
                changestatus(status.stop);
            }
            // ;
        };

        //收到底层播放器onPlayStop消息
        function onPlayStop() {
            // ;
            clearTimer();
            changestatus(status.over);
            // ;
        };

        //收到底层播放器onPlayError消息
        function onPlayError() {
            // ;
            if (isException) {
                // ;
                return;
            }
            isError = true;
            clearTimer();
            changestatus(status.error);
            // ;
        };


        function clearTimer() {
            // ;
            if (bufferTimer)
                clearInterval(bufferTimer);
            // ;
        };

		/**
		 * start player.
		 * @param {opt}
		 * @return {booleam}
		 * @example var result=playerCore.ready(opt);
		 */
        playerCore.init = function () {
            prevstatus = currentstatus = status.init;
            backupstatus = status.init;
            currentTime = totalTime = 0;
            isonReady = false;
            isException = false;
        };
        playerCore.ready = function () {
            // ;
            var options = (arguments && arguments[0]) || {};
            var data = options.data || '{"type":"vod_replay"}';
            var name = encodeURIComponent(options.name) || '0';
            prevstatus = currentstatus = status.init;
            backupstatus = status.init;
            currentTime = totalTime = 0;
            isonReady = false;
            isException = false;
            isError = false;


            if (typeof options.id == 'string' && (options.id)) {
                mediaObj = daolei(options.id);
                if (!!!mediaObj) {
                    opt.id = options.id;
                }
            } else {//no id,so remove old and create a new embed;
                if (!!!mediaObj) {
                }
            }
            //handle timeout
            opt.me = options.me || null;
            opt.timeout = typeof (options.timeout = parseInt(options.timeout)) == 'number' ? options.timeout : 60;
            //handle beginTime
            opt.beginTime = typeof (options.beginTime = parseInt(options.beginTime)) == 'number' ? options.beginTime : 0;
            //handle event callback
            opt.onReady = typeof options.onReady == 'function' ? options.onReady : '';
            opt.onPlay = typeof options.onPlay == 'function' ? options.onPlay : '';
            opt.onBuffer = typeof options.onBuffer == 'function' ? options.onBuffer : '';
            opt.onBufferComplete = typeof options.onBufferComplete == 'function' ? options.onBufferComplete : '';
            opt.onPause = typeof options.onPause == 'function' ? options.onPause : '';
            opt.onResume = typeof options.onResume == 'function' ? options.onResume : '';
            opt.onStop = typeof options.onStop == 'function' ? options.onStop : '';
            opt.onOver = typeof options.onOver == 'function' ? options.onOver : '';
            opt.onException = typeof options.onException == 'function' ? options.onException : '';
            opt.onError = typeof options.onError == 'function' ? options.onError : '';
            opt.onStatusChange = typeof options.onStatusChange == 'function' ? options.onStatusChange : '';
            //reg event
            mediaObj.onPlayReady = onPlayReady;
            mediaObj.onPlayStop = onPlayStop;
            mediaObj.onPlayForceStop = onPlayForceStop;
            mediaObj.onPlayError = onPlayError;
            //handle options.url,set mediaUrl;
            if (options.url && typeof options.url == 'string') {
                mediaUrl = options.url;
                opt.url = options.url;
            } else {
                // ;
                return false;
            }
            // ;
            if (mediaObj.play) {
                mediaObj.play(opt.url, opt.beginTime, name, '0', data);
            }
            // ;
            return true;
        };
		/**
		 * set player to pause,return true or false.
		 * @param {none}
		 * @return {booleam}
		 * @example var result=playerCore.pause();
		 */
        playerCore.pause = function () {
            // ;
            if (typeof mediaObj.pause == 'function' && currentstatus > status.stop) {
                mediaObj.pause();
                changestatus(status.pause);
                backupstatus = status.pause;
                // ;
                return true;
            } else {
                return false;
            }
        };
		/**
		 * resume player after player is in pause status.can only be called after playerCore.pause().return true or false.
		 * @param {none}
		 * @return {booleam}
		 * @example var result=playerCore.resume();
		 */
        playerCore.resume = function () {
            // ;
            if (typeof mediaObj.resume == 'function' && currentstatus == status.pause) {
                mediaObj.resume();
                backupstatus = status.play;
                // ;
                return true;
            } else {
                return false;
            }
        };
		/**
		 * stop player.return true or false.
		 * @param {none}
		 * @return {booleam}
		 * @example var result=playerCore.stop();
		 */
        playerCore.stop = function () {
            // ;
            if (mediaObj && typeof mediaObj.stop == 'function') {
                mediaObj.onPlayError = function () {
                    // ;
                };
                mediaObj.stop();
                currentTime = 0;
                // ;
                return true;
            } else {
                return false;
            }
        };
		/**
		 * seek time.
		 * @param {number}
		 * @return {booleam}
		 * @example var result=playerCore.seekByTime(0);
		 */
        playerCore.seekByTime = function (seekTime, offset) {
            // ;
            // ;
            if (typeof mediaObj.seekByTime == 'function' && digit.test(seekTime) && (typeof mediaObj.seekByTime == 'function')) {
                // );
                seekTime = parseInt(seekTime, 10);
                if (offset < 0) {
                    seekTime = parseInt(mediaObj.getCurrentTime() - seekTime, 10);
                } else if (offset > 0) {
                    seekTime = parseInt(mediaObj.getCurrentTime() + seekTime, 10);
                }
                // ;
                var seekResult = mediaObj.seekByTime(seekTime);
                // ;
                currentTime = mediaObj.getCurrentTime();
                // ;
                return true;
            } else {
                return false;
            }
        };
		/**
		 * set player display area.
		 * @param {number,number,number,number}
		 * @return {booleam}
		 * @example var result=playerCore.setDisplayArea(0,0,1280,720);
		 */
        playerCore.setDisplayArea = function (x, y, w, h) {
            // ;
            if (currentstatus == status.init || currentstatus == status.stop || currentstatus == status.over || currentstatus == status.ready) {
                // ;
                try {
                    return true;
                } catch (err) {
                    return false;
                }
            } else {
                // ;
                if (typeof mediaObj.setDisplayArea == 'function') {
                    if (arguments.length > 0 && digit.test(x) && digit.test(y) && digit.test(w) && digit.test(h)) {
                        setElementArea(x, y, w, h);

                        return mediaObj.setDisplayArea(x, y, w, h);

                    } else {
                        setElementArea(0, 0, 0, 0);
                        return mediaObj.setDisplayArea(0, 0, 0, 0);
                    }
                } else {
                    return false;
                }
            }
            function setElementArea(_x, _y, _w, _h) {
                mediaObj.style.left = _x + 'px';
                mediaObj.style.top = _y + 'px';
                mediaObj.style.width = _w + 'px';
                mediaObj.style.height = _h + 'px';
            };
            // ;
        };


        playerCore.getStatus = function () {
            return currentstatus;
        };

        playerCore.getCurrentTime = function () {
            currentTime = mediaObj.getCurrentTime ? mediaObj.getCurrentTime() : "";
            return currentTime ? currentTime : 0;
        };

        playerCore.getTotalTime = function () {
            totalTime = mediaObj.getTotalTime ? mediaObj.getTotalTime() : '';
            return totalTime ? totalTime : 0;
        };

        playerCore.getBufferNum = function () {
            return bufferNumber;
        };

        playerCore.getOpt = function () {
            return opt;
        };
        playerCore.setSimple = function (flag) {
            simple = flag;
        };
        return playerCore;
    }();
})();
export var playerCore = Ysten.player;
// 此类做枚举使用
export var PlayerType = {
    StartPlaying: 'PlayerType.StartPlaying',                        // 开始（通常真实进度会有延迟，在调用 播放后直接触发）
    PausePlaying: 'PlayerType.PausePlaying',                        // 暂停
    Released: 'PlayerType.ReleasePlaying',                          // 结束并释放（返回参数释放成功或失败）
    ResumePlaying: 'PlayerType.ResumePlaying',                      // 恢复
    FinishPlay: 'PlayerType.FinishPlay',                            // 完毕
    ProgressChanging: 'PlayerType.ProgressChanging',                // 进度改变进行
    ProgressChanged: 'PlayerType.ProgressChanged',                  // 进度改变完成
    TotalProgressInit: 'PlayerType.TotalProgressInit',              // 总进度初始化
    VolumeInit: "PlayerType.CurrentVolumeInit",                     // 音量初始完毕
    VolumeChanged: 'PlayerType.CurrentVolumeChanged',               // 音量改变完成
    VolumeChanging: 'PlayerType.CurrentVolumeChanging',             // 音量改变进行
    MuteVolume: "PlayerType.MuteVolume",                            // 设置静音
    ResumeVolume: "PlayerType.ResumeVolume"                         // 从静音恢复
}

export class Player {
    readonly mediaPlay: {};
    readonly identCode: number;

    private playUrl: string;
    private instanceId: number = -100;                   // 默认 -100 非 -100 则为播放器实例
    private totalTime: number = 0;
    private currentTime: number = 0;
    private currentVolume: number = 0;
    private pageEvent: PageEvent;
    private customTotalTime: number = 0;

    // 播放完毕
    private finish = false;

    // private settingVolumeTimer = new SetTimeout(1000);
    private settingProgressTimer = new SetTimeout(1000);
    private progressMonitor = new SetInterval(1000); // 视频播放进度以 秒 为单位进行播放，该参数禁止改变（部分盒子进度不会到达最后一或二秒便依赖该定时器进行模拟进度进行）

    private startPlayCount = 0; // 开始播放触发次数


    private diff = 0;

    // 快进退之后，指针会跳到原始位置在更新最新位置，这里做延迟 1.1 s 处理
    private hasUpCurTim = true;
    private speekTime = new SetTimeout(500);

    // 暂停/播放
    private playStatus;

    constructor(params: { identCode: number}, event: PageEvent) {
        this.identCode = params.identCode;
        this.pageEvent = event;
    }
    play(playUrl: string) {
        this.playUrl = playUrl;
        if (this.playUrl) {
            this.currentTime = 0;
            this.totalTime = 0;
            this.startPlayCount = 0;
            playerCore.ready({
                id: "player",
                url: this.playUrl
            });
            this.playStatus = true;
            this.startMonitorProgress(true);
        }
    };
    resume(isTrigger = true) {
        if (!this.finish) {
            playerCore.resume();
            this.playStatus = true;

            this.startMonitorProgress(false);
            // 解锁
            this.speekTime.enable(() => {
                this.hasUpCurTim = true;
            });

            isTrigger && this.pageEvent.trigger(this.identCode, PlayerType.ResumePlaying);
        }
    }
    playPoint(playUrl: string, point: number) {
        this.playUrl = playUrl;
        if (this.playUrl) {
            this.currentTime = point;
            this.totalTime = 0;
            this.startPlayCount = 0;
            playerCore.ready({
                id: "player",
                url: this.playUrl,
                beginTime: point
            });
            this.playStatus = true;
            this.startMonitorProgress(true);
        }
    }
    pause(triggerPlayerTypeEvent = true) {
        if (!this.finish) {

            if (playerCore && playerCore.pause) {

                playerCore.pause();
                this.playStatus = false;

                if (triggerPlayerTypeEvent) {
                    this.pageEvent.trigger(this.identCode, PlayerType.PausePlaying);
                }
            }

        }
    }
    stop() {
        if (playerCore && playerCore.stop) {
            playerCore.stop();
            this.playStatus = false;
        }
    };
    release() {
        this.stopMonitorProgress();
        // 暂停
        this.pause(false);
        // 停止流
        this.stop();

        this.pageEvent.trigger(this.identCode, PlayerType.Released, <IReleased>{ success: true, code: this.identCode, instanceId: this.instanceId });
    }
    plusVolume(value: number) {
        // 移动不用实现
    };
    minusVolume(value: number) {
        // 移动不用实现
    };
    getVolume() {
        return playerCore.getVolume();
    };
    getTime() {
        return playerCore.getCurrentTime();
    };
    setMute() {
        playerCore.setMute(true);
        this.pageEvent.trigger(this.identCode, PlayerType.MuteVolume, <IMuteVolume>{ currentVolume: this.currentVolume });
    }
    resumeVolume() {
        playerCore.setMute(false);
        this.pageEvent.trigger(this.identCode, PlayerType.ResumeVolume, <IResumeVolume>{ currentVolume: this.currentVolume });
    }
    isMute(): boolean {
        return Boolean(playerCore.isMute());
    }
    speed(value: number) {
        this.setCurrentProgress(value, true);
    }
    reverse(value: number) {
        this.setCurrentProgress(value, false);
    }
    displayFull() {
        playerCore.setDisplayArea(0, 0, 1280, 720);
    };
    displaySmall(displayArea: { left: number, top: number, width: number, height: number }) {
        const { left, top, width, height } = displayArea;
        playerCore.setDisplayArea(left, top, width, height);
    };
    /**
     * 设置视屏观看最大时间
     * @param total 总时长，可为视屏测试地址设置最大观看时长；可为直播流设置 -1 便不会触发结束事件与播放进度事件；直播改变为点播可设置 0
     */
    setTotalTime(total: number) {
        this.customTotalTime = total;
    };
    getTotal() {
        return playerCore.getTotalTime();
    };
    /**
     * 在播放之后执行才会生效
     */
    private startMonitorProgress(isTriggerStartPlayingEvent = true) {
        let stopTime = 0;      // 进度停止了多少秒（异常状态）
        let finishCount = 0;    // 播放完毕事件触发次数
        let buffer = 0;         // 缓冲时间
        let difference = 0;     // 误差

        // 部分盒子到最后 1 或 2 s直接停止
        // 盒子开始播放时 当前进度返回 0 延迟 部分时间才返回当前进度
        // 完善模拟进度，因此在最后 3 秒内按暂停键的话需要
        // 部分移动盒子播放完毕后当前进度获取到 0
        let method = () => {
            let time = parseInt(playerCore.getCurrentTime());

            if (!this.hasUpCurTim) {
                return;
            }

            // 处理直播
            if (-1 !== this.customTotalTime) {
                // 播放到最后(0-3)秒视频已经结束；兼容总时长的  0.05% 比如总时长 10分钟 最后 30 秒兼容流异常停止
                let max = 3;

                if (this.totalTime && this.currentTime) {
                    max = this.totalTime * 0.05;
                }

                let num = (this.totalTime - this.currentTime);
                if (0 < this.currentTime && 0 < this.totalTime) {
                    if (num <= max && num >= 0) {
                        // time 可能为 -1
                        // 部分移动盒子播放完毕后当前进度获取到 0
                        if ((time == this.currentTime || time < 0) || (0 !== this.startPlayCount && time === 0)) {
                            stopTime++;
                        }
                    }
                }
                // 模拟真实进度
                if (0 < stopTime) {
                    time = this.currentTime + stopTime;
                }
            }

            // 播放中 当前进度在进行中且至少是 1
            if (time > 0) {
                // 真实进度与界面进度误差不超过 5 s
                difference = 0;
                if (time < this.currentTime) {
                    difference = this.currentTime - time;
                }
                if (time > this.currentTime || difference > 5) {
                    this.currentTime = time;
                    // 视频总时间如果未获取到那么不做最大播放进度的异常处理
                    if (this.totalTime) {
                        this.currentTime = this.currentTime > this.totalTime ? this.totalTime : this.currentTime;
                    }
                    // 播放中
                    if (this.currentTime <= this.totalTime) {
                        this.pageEvent.trigger(this.identCode, PlayerType.ProgressChanging, <IProgressChanging>{ currentTime: this.currentTime, totalTime: this.totalTime });
                        this.pageEvent.trigger(this.identCode, PlayerType.ProgressChanged, <IProgressChanged>{ currentTime: this.currentTime, totalTime: this.totalTime });
                    }
                    if (0 == finishCount) {

                        // 处理直播
                        if (-1 !== this.customTotalTime) {
                            if (this.totalTime) {
                                // 如果播放器计时器已经停止工作，并且总时间还未初始化，那么触发结束播放事件
                                // 排除刚开始播放情况
                                if ((this.currentTime + 1) >= this.totalTime && 0 < this.currentTime && 0 < this.totalTime) {
                                    // 播放完毕
                                    finishCount++;

                                    // 处理直播
                                    if (-1 !== this.customTotalTime) {
                                        this.finish = true;
                                        stopTime = 0;
                                        this.stopMonitorProgress();
                                        this.stop();
                                        setTimeout(() => {
                                            /**
                                             *  延迟执行的目的是为了能正常的重播
                                             */
                                            this.pageEvent.trigger(this.identCode, PlayerType.FinishPlay, { currentTime: this.totalTime });
                                        }, 1000);
                                    }
                                }
                            } else {
                                // 视频流停止 3 s 时
                                if (3 <= stopTime) {
                                    finishCount++;
                                }
                            }
                        }
                    }
                    // 延迟一秒
                    else if (1 == finishCount) {
                        finishCount++;
                    }
                    else if (2 == finishCount) {

                        // 处理直播
                        if (-1 !== this.customTotalTime) {
                            this.finish = true;
                            stopTime = 0;
                            this.stopMonitorProgress();
                            this.stop();
                            setTimeout(() => {
                                /**
                                 *  延迟执行的目的是为了能正常的重播
                                 */
                                this.pageEvent.trigger(this.identCode, PlayerType.FinishPlay);
                            }, 1000);
                        }
                    }
                }
            }

            // 开始播放 当前进度可以等于或大于 0 且仅触发一次
            if (0 == this.startPlayCount && 0 <= this.currentTime) {
                // 续播时结束后，重叠多个快件或快退事件对新进度进行干扰，这里进行重置
                this.currentTime = 1;
                // 开始播放事件触发，条件是影片从头开始播放，并且当前进度大于等于 1 ，并且仅执行一次
                if (isTriggerStartPlayingEvent == true) {

                    this.pageEvent.trigger(this.identCode, PlayerType.StartPlaying, <IStartPlaying>{ totalTime: this.totalTime });
                    this.pageEvent.trigger(this.identCode, PlayerType.ProgressChanging, <IProgressChanging>{ currentTime: this.currentTime, totalTime: this.totalTime });
                    this.pageEvent.trigger(this.identCode, PlayerType.ProgressChanged, <IProgressChanged>{ currentTime: this.currentTime, totalTime: this.totalTime });

                    this.finish = false;
                }
                this.startPlayCount++;
            }

            if (this.totalTime <= 0) {
                // 直播模式不初始化总时长
                if (-1 !== this.customTotalTime) {
                    // 自定义总时长
                    if (this.customTotalTime > 0) {
                        this.totalTime = this.customTotalTime;
                    } else {
                        this.totalTime = parseInt(<any>playerCore.getTotalTime()) || 0;
                    }

                    if (this.totalTime > 0) {
                        // 续播及时同步最新进度
                        if (this.currentTime) {
                            this.pageEvent.trigger(this.identCode, PlayerType.StartPlaying, <IStartPlaying>{ totalTime: this.totalTime });
                            this.pageEvent.trigger(this.identCode, PlayerType.ProgressChanging, <IProgressChanging>{ currentTime: this.currentTime, totalTime: this.totalTime });
                            this.pageEvent.trigger(this.identCode, PlayerType.ProgressChanged, <IProgressChanged>{ currentTime: this.currentTime, totalTime: this.totalTime });

                            this.finish = false;
                        }
                        this.pageEvent.trigger(this.identCode, PlayerType.TotalProgressInit, <ITotalProgressInit>{ totalTime: this.totalTime, currentTime: this.currentTime });
                    }
                }
            }
        };
        // 第一次执行无延迟
        method();
        // 1s 后开始自动监听进度
        this.progressMonitor.enable(method);
    }
    private stopMonitorProgress() {
        this.progressMonitor.clear();
    }
    private setCurrentProgress(value: number, speedOrReverse: boolean) {

        if (!this.finish) {
            // 暂停
            this.pause(false);

            this.hasUpCurTim = false;

            this.stopMonitorProgress();

            if (speedOrReverse) {
                this.currentTime += value;

                this.diff += value;
            } else {
                this.currentTime -= value;

                this.diff += value;
            }

            this.currentTime = this.currentTime <= 0 ? 1 : this.currentTime;
            this.currentTime = this.currentTime > this.totalTime ? this.totalTime : this.currentTime;

            // 及时更新目标进度已便让界面实时更新
            this.pageEvent.trigger(this.identCode, PlayerType.ProgressChanging, <IProgressChanging>{ currentTime: this.currentTime, totalTime: this.totalTime });

            // 显示加载真实进度
            this.settingProgressTimer.enable(() => {

                if (speedOrReverse) {
                    playerCore.seekByTime(this.diff, 1);
                } else {
                    playerCore.seekByTime(this.diff, -1);
                }
                this.diff = 0;

                this.pageEvent.trigger(this.identCode, PlayerType.ProgressChanged, <IProgressChanged>{ currentTime: this.currentTime, totalTime: this.totalTime });

                // 恢复
                this.resume(this.playStatus === false ? true : true);

                this.startMonitorProgress(false);

                // 解锁
                this.speekTime.enable(() => {
                    this.hasUpCurTim = true;
                });
            });
        }
    }
    getRealTotalTime() {
        return parseInt(<any>playerCore.getTotalTime()) || 0;
    }
}

// 播放器
// this.media = new Player({ identCode: MType.MediaPlayer }, this.pageEvent);
// this.media.displaySmall({ left: 60, top: 158, width: 307, height: 172 });
// this.media.play("http://223.87.20.83:8089/28000001/00010000000000009999999999999837");