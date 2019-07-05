<p align="center">
<a href="" target="_blank">

![image](https://github.com/shitaozhang/stb/blob/master/resources/images/logo.png)

</a>
</p>
<p align="center">📺STB TV端全栈解决方案</p>

**STB 组件的所有功能：**

- 熟悉的 React API 和模式: [ES6 Class] 和 [Functional Components]
- 你所需要的一切: JSX, <abbr title="Virtual DOM">VDOM</abbr>, TypeScript, <abbr title="Hot Module Replacement">Less</abbr>, <abbr title="Server-Side Rendering">Redux & Mobx</abbr>..
- TV 端系列工具：stb-conllection、stb-cookie、stb-decorator、stb-event、stb-key、stb-react、stb-redux、stb-shadow、stb-tools
- Transparent asynchronous rendering with a pluggable scheduler
- 🆕💥 **与[STB CLI](https://github.com/shitaozhang/stb-cli)捆绑的即时无配置应用程序**

### 💁 [STB 网站上 ➞](https://github.com/shitaozhang/stb)的更多信息

---

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [演示](#demos)
- [Libraries & Add-ons](#libraries--add-ons)
- [Getting Started](#getting-started) - [Import what you need](#import-what-you-need) - [Rendering JSX](#rendering-jsx) - [Components](#components) - [Props & State](#props--state)
- [Linked State](#linked-state)
- [Examples](#examples)
- [Extensions](#extensions)
- [Debug Mode](#debug-mode)
- [Backers](#backers)
- [Sponsors](#sponsors)
- [License](#license)

<!-- /TOC -->

# STB

---

## 演示

#### 真实应用

- [**STB-TodoMVC**](https://github.com/shitaozhang/stb-todomvc) _([GitHub Project](https://github.com/shitaozhang/stb-todomvc))_

#### 可运行例子

- [**Flickr Browser**](http://codepen.io/developit/full/VvMZwK/) (@ Preact 官方例子)
- [**Animating Text**](http://codepen.io/developit/full/LpNOdm/) (@ Preact 官方例子)
- [**60FPS Rainbow Spiral**](http://codepen.io/developit/full/xGoagz/) (@ Preact 官方例子)
- [**Simple Clock**](http://jsfiddle.net/developit/u9m5x0L7/embedded/result,js/) (@ Preact 官方例子)
- [**3D + ThreeJS**](http://codepen.io/developit/pen/PPMNjd?editors=0010) (@ Preact 官方例子)
- [**Stock Ticker**](http://codepen.io/developit/pen/wMYoBb?editors=0010) (@ Preact 官方例子)
- [_Create your Own!_](https://jsfiddle.net/developit/rs6zrh5f/embedded/result/) (@ Preact 官方例子)

### 入门项目

- [**零配置启动 => STB-React + STB-Redux + Typescript + Less + Webpack 4 + Real-time refresh**](https://github.com/shitaozhang/stb-neat-start):star:_([GitHub Project](https://github.com/shitaozhang/stb-neat-start))_ :sunny:
- [**零配置启动 => STB-React + STB-Redux + Typescript + Less + Webpack 4 + Real-time refresh + 多平台构建**](https://github.com/shitaozhang/stb-start):star:_([GitHub Project](https://github.com/shitaozhang/stb-start))_ :sunny:
- [**Preact Mobx Starter**](https://awaw00.github.io/preact-mobx-starter/) _([GitHub Project - Peact 官方项目](https://github.com/awaw00/preact-mobx-starter))_ :sunny:
- [**Preact Redux Example**](https://github.com/developit/preact-redux-example) :star:_([GitHub Project - Peact 官方项目](https://github.com/developit/preact-redux-example))_ :sunny:

---

## 入门

<!--
> 💁 _**Note:** You [don't need ES2015 to use Preact](https://github.com/developit/preact-in-es3)... but give it a try!_ -->

<!-- 开始使用 STB 的最简单方法是安装[STB CLI](https://github.com/shitaozhang/stb-cli)。这个简单的命令行工具为您提供了最好的 Webpack 和兼容设置，甚至可以在底层工具发生变化时让您保持最新状态。最重要的是，它很容易理解！它在构建您的应用程序中，不需要任何配置，并采用最佳实践 🙌。

您也可以从 [stb-start-neat 定制版](https://github.com/shitaozhang/stb-neat-start) or a [stb-start 平台版](https://github.com/shitaozhang/stb-start)模板开始

如果上面方式失败，使用更直接方式安装 -->

1. 安装

```js
$ git clone https://github.com/shitaozhang/stb.git
```

2. 目录

```js
$ cd stb
```

3. 依赖

```js
$ npm install
```

4. 开发

```js
$ npm run dev
```

4. 预览访问

```js
$ http://localhost:9000
```

<!--
平台版

1. 安装

```js
$ git clone https://github.com/shitaozhang/stb-start.git
```

2. 目录

```js
$ cd stb-start
```

3. 依赖

```js
$ npm install
```

4. 服务
   windows

```js
$ npm run mon:win
```

mac

```js
$ npm run mon:mac
```

5. 开发

```js
$ npm run dev
```

6. 预览访问

```js
$ http://localhost:9000
``` -->

### 使用 JSX

开箱即用，Preact 提供了一个 h()函数，可以将您的 JSX 转换为虚拟 DOM 元素（这里是如何）。它还提供了 render()一个从该 Virtual DOM 创建 DOM 树的功能。

开箱即用，stb-react 提供了一个 `h()` 函数，可以将您的 JSX 转换为虚拟 DOM 元素 _([查看说明-Preact 官方例子](http://jasonformat.com/wtf-is-jsx))_.它还提供了 `render()` 一个从该 Virtual DOM 创建 DOM 树的功能。

要渲染一些 JSX，只需导入这两个函数并像这样使用它们:

```js
import { h, render } from "stb-react";

render(
  <div id="foo">
    <span>Hello, world!</span>
    <button onClick={e => alert("hi!")}>Click Me</button>
  </div>,
  document.body
);
```

### 使用组件

decorator 会调用以下生命周期方法：

| 生命周期方法                | 当它被调用时                         |
| --------------------------- | ------------------------------------ |
| `componentWillMount`        | 在组件挂载到 DOM 之前                |
| `componentDidMount`         | 在组件被挂载到 DOM 之后              |
| `componentWillUnmount`      | 在从 DOM 中删除之前                  |
| `componentWillReceiveProps` | 在新属性被接受之前                   |
| `shouldComponentUpdate`     | 在`render()`之前返回 `false`跳过渲染 |
| `componentWillUpdate`       | `render()` 之前                      |
| `componentDidUpdate`        | `render()` 之后                      |
| `componentFocusDidUpdate`   | 视图渲染或需要更新焦点时             |

## 调试模式

您可以开启事件代理监听日志查看组件以及焦点的状态 。

1. 开启调试模式

```js
PageRegister(Page, {
  /**
   * 系统事件监听
   */
  debugSystem: true,
  /**
   * 程序事件监听
   */
  debugOther: true
});
```

2. 打开浏览器调试窗口 console 选项监听日志

```js
 1558153861109 "SUBSCRIBE" "*-PageEventType.Error-0" null   // 订阅程序事件消息
 1558153861110 "SUBSCRIBE" "*-blank-0" null                 // 注册全局事件（打开新页面事件）
 1558153861110 "SUBSCRIBE" "*-previous-0" null              // 注册全局事件（打开上一个页面事件）
 1558153861113 "SUBSCRIBE" "0-focus-0" null                 // 注册 Input 焦点模块聚焦事件
 1558153861113 "SUBSCRIBE" "0-blur-0" null                  // 注册 Input 焦点模块失焦事件
 1558153861113 "SUBSCRIBE" "0-keydown-0" null               // 注册 Input 焦点模块输入事件（装饰器订阅）
 1558153861113 "SUBSCRIBE" "0-keydown-1" null               // 注册 Input 焦点模块输入事件（自定义订阅）
 1558153861114 "SUBSCRIBE" "1-focus-0" null                 // 注册 BtnToogle 焦点模块聚焦事件
 1558153861114 "SUBSCRIBE" "1-blur-0" null                  // ...
 1558153861114 "SUBSCRIBE" "1-keydown-0" null
 1558153861114 "SUBSCRIBE" "2-focus-0" null
 1558153861114 "SUBSCRIBE" "2-blur-0" null
 1558153861115 "SUBSCRIBE" "2-keydown-0" null
 1558153861115 "SUBSCRIBE" "3-focus-0" null
 1558153861116 "SUBSCRIBE" "3-blur-0" null
 1558153861116 "SUBSCRIBE" "3-keydown-0" null
```

> 上述 0 1 2 ... 模块为枚举类型对应焦点模块定义顺序，例:

```ts
export const enum MType {
  Input, // 运行时取值为 0
  BtnToogle, // 运行时取值为 1
  ListTodo, // 运行时取值为 2
  Command, // 运行时取值为 3
  Page // 运行时取值为 4
}
```

**技术支持：**

- 视图层基于[Preact](https://preactjs.com/)基础实现，再次基础进行二次开发。轻量且高效视图层渲染解决方案。
- 数据流管理[Redux Zero](https://matheusml1.gitbooks.io/redux-zero-docs/content/)是一个基于 Redux 的轻量级状态容器，只有一个商店，没有 reducer。用 TypeScript 编写，非常小。
- 数据与业务可扩展性、复用性、维护性一直是中大型项目迫切需要解决问题，此次尝试数据流管理方案的引入 [TodoMVC](http://todomvc.com/) [STB-TodoMVC](https://github.com/shitaozhang/stb-todomvc)几乎涵盖目前最新 STB 框架所有特性，功能包括 增、删、改、查的运行实例
- 设计演变[第一版 辅助方案](https://github.com/shitaozhang/framework_stb) [第二版 嵌入式方案](https://github.com/shitaozhang/stb/tree/v2.2.0) 到 [stb 第三版-智能全栈解决方案](https://github.com/shitaozhang/stb)

**重要声明：**

- 支持所有兼容 ES5 标准环境(稳定版)
- 更新许多令人兴奋的特性视图解决方案基于 preact-10.0.0-beta.1 重写，支持其所有特性基础上扩展 TV 端所需特性，虚拟 DOM 渲染性能有了质的提升
- 内置 bootstrap-epg TV UI 组件开箱即用(目前列表、菜单)
- 内置 stb-decorator 无缝对接焦点组件、翻页组件、数据滚动、走马灯等预定义功能
- 内置 mobx 和 mobx-stb 用于数据流管理
- 内置 stb-shadow 阴影算法，且优化运算性能
- 具体依赖如下:

```json
    "bootstrap-epg",
    "mobx",
    "mobx-stb",
    "stb-conllection",
    "stb-cookie",
    "stb-decorator",
    "stb-event",
    "stb-key",
    "stb-plugin",
    "stb-react",
    "stb-shadow",
    "stb-tools",
```

## 平台兼容

| 平台     | 状态                 |
| -------- | -------------------- |
| 四川移动 | 完美运行             |
| 安徽电信 | 未测试（并非不支持） |
| 陕西电信 | 未测试（并非不支持） |
| 江西电信 | 未测试（并非不支持） |
| 新疆电信 | 未测试（并非不支持） |
| 重庆移动 | 未测试（并非不支持） |
| 宁夏广电 | 未测试（并非不支持） |

## 更新日志

- ✅ 调整 Join Play 自定义处理回调规则
- ✅ 新增 FuncOvertime 时间溢出；用于处理未知时间回调，如回调为主动触发超出指定事件会修复性触发，例:

```typescript
// exeFunc 500 毫秒内未作出响应，callback 主动触发，500 毫秒内响应直接触发 callback
new FuncOvertime(500).enable(exeFunc, callback);
```

## 修复方案

- jsx 列表渲染多个同级 {} 导致 ref 失效；解决方案静态标签包裹比如 div {} div
- subscribeToEvents 方法中访问当前组件属性为空；原因是事件订阅时是在组件实例化阶段进行，可通过 this.props 访问传入参数
- 组件 subscribeToEvents 事件需在当前模块满足 identCode 不为空条件下触发；如为满足仍需触发可在 componentDidMount 事件中调用，例:

```typescript
    subscribeToEvents() {
        // todo other sub
    }
    componentDidMount() {
        // fix not module
        this.subscribeToEvents();
    }
```

- 装饰器 pageY 切换不同数据源重写渲染时，导致走马灯效果未被卸载。可先为 dataList 赋值 [] 强制卸载再装载新数据源。可解决该问题

## 致敬

- [Jason Miller - Preact 作者](https://github.com/developit)

## Sponsors

支持我们，并帮助我们继续我们的活动。

<!--
<a href="https://opencollective.com/preact/sponsor/0/website" target="_blank"><img src="https://opencollective.com/preact/sponsor/0/avatar.svg"></a> -->
