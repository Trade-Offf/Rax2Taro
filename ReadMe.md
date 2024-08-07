<p align="center">
    <img src=https://github.com/Trade-Offf/PictureBed/blob/main/imgs/logo-2.png?raw=true width=328/>
</p>
<p align="center"><strong>本编译器用于将 Rax 文件转换成 Taro 文件</strong></p>

## 特征

- 🚧 编译器深入挖掘 Rax 和 Taro 之间的兼容性，确保平滑的代码转换体验。

- 🔨 Rax2Taro 采用模块化结构设计，通过精细处理 AST 实现代码的高效转化。

- ⏳ 自动化测试确保基础组件转换的准确性，加速 1.0 版本的迭代并保障编译器质量。

## 使用方法

将你待转换的单个 Rax.js 文件放在 InPut 文件夹下，命令行执行 `npm start` , 即可在 OutPut 文件夹中查看到转换后的 Taro.js 文件

API 详情：[点击查看语雀文档]('https://www.yuque.com/cascading/bwnowo/uwp3s510g0im9ue9')

![组件属性方法差异比对](https://github.com/user-attachments/assets/9cddc37c-e86e-45c2-87dd-a7a51520e00a)


## 项目结构

```
/Rax2Taro
|-- /node_modules                 # 项目依赖库安装文件夹
|-- /src                          # 源代码目录，包含转换工具的核心逻辑
|   |-- /Transformers             # 转换器，负责不同类型代码的转换逻辑
|   |   |-- /FunctionTransformer  # 负责函数组件等的转换逻辑
|   |   |   └-- index.js
|   |   |-- /ImportsTransformer   # 负责导入语句的转换逻辑
|   |   |   └-- index.js
|   |   |-- /JSXElementsTransformer # 负责 JSX 元素的转换逻辑
|   |   |   |-- Text.js
|   |   |   |-- View.js
|   |   |   └-- index.js
|   |   └-- index.js              # 转换器主入口，执行协调转换过程
|   |-- generator.js              # 生成器，用于从修改后的 AST 生成新的源代码
|   └-- parser.js                 # 解析器，用于解析源代码生成 AST
|   └-- index.js                  # 主入口文件，协调整个转换过程
|-- /Input                        # 存放待转化的 Rax.js 文件的文件夹
|-- /Output                       # 存放转化后的 Taro.js 文件的文件夹
|-- package.json                  # 定义项目依赖和脚本
|-- .babelrc                      # Babel 配置文件（如果需要自定义 Babel 配置）
|-- README.md                     # 项目说明文档
|-- LICENSE                       # 项目许可证文件（如果有的话）
```

## 自动化测试

用 Jest 搭建一个端到端测试环境，该环境将链接 Rax 和 Taro 项目，自动执行组件代码的转换。

这个过程将减少手动复制粘贴的需求，并帮助确保代码的一致性和正确性。

具体步骤如下，在 `e2e.test.js` 中：

1. **设定 Rax 项目路径**：（例）本项目从 Rax 应用的源文件夹 `rax-test-demo/src/index.js` 读取待转换组件代码。
2. **设定 Taro 项目路径**：将转换后的 Taro 组件代码写入 Taro 应用的目标文件夹 `TaroTestDemo/src/app.js`。
3. **转换代码**：命令行执行：`npm run test:e2e` 转换器将源代码解析为 AST，并进行转换。
4. **监测转换结果**：在 Taro 测试环境中检查转换后的代码，确保没有报错且符合预期。

### 准备 Rax 测试环境

```sh
npm install -g rax-cli # 安装 Rax 脚手架（如果尚未安装）
cd Desktop # 进入桌面
rax init RaxTestDemo # 初始化 Rax 项目
# 进入文件夹
cd rax-test-demo
# 安装依赖
npm install
# 运行
npm start
```

<img src="https://raw.githubusercontent.com/Trade-Offf/PictureBed/main/imgs/%E6%88%AA%E5%B1%8F2023-12-07%2017.15.54.png" width="800"/>

### 准备 Taro 测试环境

```sh
npm install -g @tarojs/cli # 安装 Taro 脚手架（如果尚未安装）
cd Desktop # 进入桌面
taro init TaroTestDemo # 初始化 Taro 项目
# 进入文件夹
cd TaroTestDemo
# 安装依赖
npm install
# 运行
npm run dev:h5
```

<img src="https://raw.githubusercontent.com/Trade-Offf/PictureBed/main/imgs/%E6%88%AA%E5%B1%8F2023-12-07%2017.27.27.png" width="800"/>

确保遵循上述步骤来准备 Rax 和 Taro 的测试环境。在双方都构建完成后，您可以执行 Jest 测试来验证转换过程。

### 执行自动化测试

命令行执行：`npm run test:e2e`

此时，你就可以在本地同时运行 Rax 与 Taro 项目，一边写 Rax 一边可实时通过此条命令进行编译转换 Taro

## 进度节点

### 1.0（已完成）

如下图，将左侧 Rax 中（除 Link 的 7 个）基础组件，在 Taro 中优先寻找平替组件。

通过增加转换规则 `Transformers/JSXElementsTransformer/xxx` 抹平差异，如果找不到对应功能就标红，等后续对特例地统一处理。

<p align="left">
<img src=https://github.com/Trade-Offf/PictureBed/blob/main/imgs/Rax2Taro%20-%201.0.png?raw=true width=600 />
</p>

### 2.0（进行中）

TODO：

- [ ] 新增自定义脚手架功能
- [ ] 抹平转换过程中的 CSS 样式差异
- [ ] 新增 README_EN, 完善中英文使用文档

## 支持

- 🌟 若您对 Rax2Taro 项目感兴趣，请在 GitHub 上给我们点个星！同时，如果您认为它很有用，欢迎 👏🏻 向您的朋友推荐。
- 📘 关注我的稀土掘金主页： [狂炫冰美式](https://juejin.cn/user/1591748568038823)，您将发现更多有趣的技术文章与博客。
- 😊 希望您在使用 Rax2Taro 的过程中，能感受到探索新技术的乐趣，愿我们更高处相见。
