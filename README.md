<p align="center">
<a href="" target="_blank">

![image](./resources/images/logo.png)

</a>
</p>
<p align="center">📺STB TV端全栈解决方案</p>

**STB 组件的所有功能：**

- 熟悉的 React API 和模式: [ES6 Class] 和 [Functional Components]
- 你所需要的一切: JSX, <abbr title="Virtual DOM">VDOM</abbr>, TypeScript, <abbr title="Hot Module Replacement">Less</abbr>, <abbr title="Server-Side Rendering">Redux & Mobx</abbr>..
- TV 端系列工具：stb-conllection、stb-cookie、stb-decorator、stb-event、stb-key、stb-react、stb-redux、stb-shadow、stb-tools
- Transparent asynchronous rendering with a pluggable scheduler

> 如果觉得有帮助，还请留下您的 star 

### 💁 [STB 网站上 ➞](https://shitaozhang.github.io/)的更多信息

---

## 在线预览

- [初始状态演示（控制键盘上下左右可移动焦点）](https://shitaozhang.github.io/stb.demo.io/)
- [焦点、虚拟 DOM、组件交互（键盘上、下、左、右控制焦点移动）](https://shitaozhang.github.io/stb.demo.io/)

---

## 环境兼容性检测

- [**stb-detection**](https://github.com/shitaozhang/stb-detection)

## 可运行例子

- [**STB-TodoMVC**](https://github.com/shitaozhang/stb-todomvc) _([GitHub Project](https://github.com/shitaozhang/stb-todomvc))_
- [启萌乐园](https://github.com/shitaozhang/stb-project/tree/master/sicuan-qimeng)

---

## 代理

配置淘宝镜像，确保安装顺利

```ts npm
npm config set registry https://registry.npm.taobao.org/
```

```ts yarn
yarn config set registry https://registry.npm.taobao.org/
```

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

<!-- - 启动监听

```tips
平台版本启动需先启动监听服务，普通启动可以忽略这个步骤
`windows`环境启用监听：`npm run mon:win`
`mac `：环境启用监听：`npm run mon:mac`
```

> `npm run mon:mac` 如果无法运行，需先设置权限：`chmod 777 monitor`

- 启动编译 -->

```js
$ npm run dev
```

5. 预览访问

```js
$ http://localhost:9000
```

## 平台配置

- 一套代码在多省份运行解决方案（编辑中...）

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

| 平台     | 状态 |
| -------- | ---- |
| 四川移动 | 支持 |
| 安徽电信 | 支持 |

[查看更多平台](https://shitaozhang.github.io/guide/support.html#%E5%85%BC%E5%AE%B9)

## 更新日志

- ✅ 调整 Join Play 自定义处理回调规则
- ✅ 新增 FuncOvertime 时间溢出；用于处理未知时间回调，如回调为主动触发超出指定事件会修复性触发，例:

```typescript
// exeFunc 500 毫秒内未作出响应，callback 主动触发，500 毫秒内响应直接触发 callback
new FuncOvertime(500).enable(exeFunc, callback);
```

- ✅ 更新 `typescript` 版本至 `^3.5.3` 解决安装错误问题
- ✅ 新增 多省份平台公用一份源码解决方案（方案说明编辑中...）
- ✅ 修复 windows 系统在 less 文件引用图片路径导致兼容性问题
- ✅ 更新 `docs/project_plan.xlsx` 进度计划文档新增背景/Logo 动态栏
- ✅ 新增 中国电信、中国四川移动平台播放器，可在`webpack.config.js`下`resolve.alias`配置启用
- ✅ 更新 polyfill.js 兼容性
- ✅ 新增 mobx（数据流管理工具）不兼容的替代方案(文档编辑中...)
- ✅ 优化 内置装饰器功能
- ✅ 新增 xmlToData（XML 数据转换 JSON 对象）方法`路径:/src/configs/config.tool.ts`
- ✅ 新增 新增专区对接预留功能 redirect（某个页面加载时做重定向操作）`路径:/src/configs/config.join.ts`
- ✅ 调整 根目录下文件夹 `api、entitys、framewrok` 移动至 `src` 目录下，平台配置功能已经可用
- ✅ 修复 平台模式配置文件导致虚拟目录被编译错误
- ✅ 调整 `stb-shadow` 库中 Focus.scope 算法，使之更贴合现实业务场景。受影响的功能有 @focus 装饰器，修复在极端情况下情况导致的异常。体现在焦点进行上下移动时

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
- 装饰器 pageY、pageX、stepY、stepX等依赖于对应 store model 进行交互的组件同时存在于两个或两个以上的视图组建，导致数据异常（表现为 List 组件类定义后，渲染了 List1、List2、List3...且每个视图组件对应独立数据管理类，但是与装饰器交互时都指向了 List1 对应的数据模型），推荐方案如下：
通常定义组件类方式：
```
@stepX(function () { return this.store; })
class List extends Component{
      store: ListModel = this.props.store;
...
```
装饰器原理，在编译时传入 List 类为其扩展属性和方法行为，但仅执行一次
在渲染上面 List1、List2、List3... 时由于最先渲染 List1 ，因此 this.store 已经指向为 List 类，后面的 List2、List3... 都是 List 的实例，共享了第一次List的store数据模型
解决方案如下：
```
// @stepX(function () { console.log(`${this.identCode} 执行了获取 sotre 操作`, this.store); return this.store; })
export function AutoList(store: ListModel) {
    // 由于装饰器是编译时，这里将它转换为运行时，以保证每个实例数据执行正确
    return stepX(store)(class List extends Component{
        store: ListModel = this.props.store;
...
```
至此可解决 List 组件搭配分页数据装饰器情况下，也能正确指向动态分配的 sotre 数据模型


## 致敬

- [Jason Miller - Preact 作者](https://github.com/developit)

## 支持

如果有帮助到您，想请作者喝杯咖啡~

![image](./resources/images/weixin.jpg)![image](./resources/images/zhifubao.jpg)

## 圈子

- 作者 QQ：442331311 联系请备注'STB'
- QQ 群号：432045070 云集IPTV行业各方技术大佬，希望对您有所帮助

![image](./resources/images/qrcode.png)
