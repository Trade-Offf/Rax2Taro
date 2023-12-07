# Rax to Taro Compiler

此项目是一个编译器，用于将 Rax 代码转换成 Taro 代码。

## 项目结构

```
/Rax2Taro
|-- /node_modules                 # 项目依赖库安装文件夹
|-- /src
|   |-- index.js                  # 主入口文件，协调整个转换过程
|   |-- parser.js                 # 用于解析源代码生成 AST
|   |-- generator.js              # 用于从修改后的 AST 生成新的源代码
|-- /Transformers                 # 存放转换逻辑的模块文件夹
|   |-- index.js                  # 整合各种转换规则的主要转换器
|   |-- FunctionTransformer.js    # 函数转换逻辑
|   |-- /JSXElementsTransformer   # 存放 JSX 元素的特定转换器
|       |-- index.js              # 整合 JSX 元素转换规则
|       |-- ...                   # 其他 JSX 元素转换模块
|   |-- ...                       # 其他转换逻辑模块
|-- /Input                        # 存放待转化的 Rax.js 的文件夹
|-- /Output                       # 存放转化后的 Taro.js 的文件夹
|-- package.json                  # 定义项目依赖和脚本
|-- .babelrc                      # Babel 配置文件（如果需要自定义 Babel 配置）
|-- README.md                     # 项目说明文档
|-- LICENSE                       # 项目许可证文件（如果有的话）
```

## 自动化测试

如何使用 Jest 搭建一个自动化的端到端测试环境，该环境将链接 Rax 和 Taro 项目，自动执行组件代码的转换。这个过程将减少手动复制粘贴的需求，并帮助确保代码的一致性和正确性。

在 `e2e.test.js` 中，我们将通过以下步骤进行测试：

1. **读取 Rax 组件代码**：从 Rax 应用的源文件夹 `rax-test-demo/src/index.js` 读取组件代码。
2. **转换代码**：使用 `Rax2Taro` 转换器将源代码解析为 AST，并进行转换。
3. **写入 Taro 应用**：将转换后的 Taro 组件代码写入 Taro 应用的目标文件夹 `TaroTestDemo/src/app.js`。
4. **监测转换结果**：在 Taro 测试环境中检查转换后的代码，确保没有报错且符合预期。

### 准备测试环境

#### Rax 项目设置

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

#### Taro 项目设置

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
